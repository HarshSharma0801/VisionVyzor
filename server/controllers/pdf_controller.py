from fastapi import APIRouter, File, UploadFile ,Form
from fastapi.responses import JSONResponse
import shutil
import os
from pdf2image import convert_from_path
import asyncio
from pytesseract import image_to_string
import json

router = APIRouter(tags=["PDF"])


async def process_page(image, page_number, file_id):
    output_image_path = f"temp/{file_id}_page_{page_number}.jpg"
    image.save(output_image_path, "JPEG")
    text = image_to_string(image)  # Perform OCR on the image
    return {"page": page_number, "text": text}


@router.post("/upload")
async def pdf_upload( google_id: str = Form(..., description="Google ID of the user"), pdf: UploadFile = File(...)):
    

    if not google_id:
         return JSONResponse(
            content={
                "valid": False,
                "msg": "no google id present!",
                "error": str(e),
            },
            status_code=500,
        )

    file_location = f"temp/{google_id}.pdf"

    if os.path.exists("ocr"):
        shutil.rmtree("ocr")

    os.makedirs("temp", exist_ok=True)

    try:
        
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(pdf.file, buffer)

        images = convert_from_path(file_location, dpi=150)

        tasks = [
            asyncio.create_task(process_page(image, page_number + 1, google_id))
            for page_number, image in enumerate(images)
        ]
        results = await asyncio.gather(*tasks)

        ocr_results = {result["page"]: result["text"] for result in results}


        json_file_path = f"ocr/{google_id}_ocr_results.json"
        os.makedirs("ocr", exist_ok=True)
        
        with open(json_file_path, "w") as json_file:
            json.dump(ocr_results, json_file)


        shutil.rmtree("temp")

        return JSONResponse(
            content={
                "valid": True,
                "msg": "File uploaded and processed successfully!",
                "ocr_results": ocr_results,
            },
            status_code=200,
        )

    except Exception as e:
        return JSONResponse(
            content={
                "valid": False,
                "msg": "Cannot upload and process the file!",
                "error": str(e),
            },
            status_code=500,
        )
   



