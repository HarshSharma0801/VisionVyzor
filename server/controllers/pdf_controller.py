from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import uuid
import os
from pdf2image import convert_from_path
import asyncio
from pytesseract import image_to_string

router = APIRouter(tags=["PDF"])


async def process_page(image, page_number, file_id):
    """Asynchronous function to process a single page for OCR."""
    output_image_path = f"temp/{file_id}_page_{page_number}.jpg"
    image.save(output_image_path, "JPEG")
    text = image_to_string(image)  # Perform OCR on the image
    return {"page": page_number, "text": text}


@router.post("/upload")
async def pdf_upload(pdf: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    file_location = f"temp/{file_id}.pdf"
    os.makedirs("temp", exist_ok=True)

    try:
        # Save the uploaded PDF file
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(pdf.file, buffer)

        # Convert PDF pages to images
        images = convert_from_path(file_location, dpi=150)

        # Process each page concurrently
        tasks = [
            asyncio.create_task(process_page(image, page_number + 1, file_id))
            for page_number, image in enumerate(images)
        ]
        results = await asyncio.gather(*tasks)

        # Combine results for response
        ocr_results = {result["page"]: result["text"] for result in results}

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
