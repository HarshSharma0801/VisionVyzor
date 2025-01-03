from fastapi import APIRouter , Form , HTTPException
from fastapi.responses import JSONResponse 
from config.connection import db_connection
from config.nlp_pdf import nlp_text
import json


router = APIRouter(tags=["SAVE"])


@router.post('/save')
async def save_pdf(
    google_id: str = Form(..., description="Google ID of the user"),
    title: str = Form(..., description="Title of the document")
):
    try:
        # Fetch user by Google ID
        user = await db_connection.prisma.user.find_unique(where={"googleId": google_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        json_file_path = f"ocr/{google_id}_ocr_results.json"

        try:
            with open(json_file_path, 'r') as file:
                raw_data = json.load(file)
        except FileNotFoundError:
            return JSONResponse(
                content={"valid": False, "msg": "Uploaded file not found!"},
                status_code=200
            )

        # Process the JSON data using nlp_text
        processed_data = await nlp_text(raw_data)

         
        processed_pages = [
            {
                "pageNumber": list(page.keys())[0],  # Extract the page number (e.g., 1, 2, 3, etc.)
                "content": page[list(page.keys())[0]]  # Extract the content dictionary for the page
            }
            for page in processed_data if page
        ]
        # Simulated JSON data for pages
      

        # Create the document and related pages
        document = await db_connection.prisma.document.create(
            data={
                "title": title,
                "userId":user.id
            },
        )
        
        if document.id :


            for page in processed_pages :
              await db_connection.prisma.page.create(
                 data={
                 "pageNumber":int(page["pageNumber"]),
                 "docId":document.id,
                 "content": json.dumps(page["content"])
                }
              )
        
            print(type(processed_pages[0]["pageNumber"]))
            return JSONResponse(
                     content={
                "valid": True,
                "msg": "File processed and saved successfully!",
                "documentId": document.id,
                "pages":processed_pages
                
              },
                status_code=200,
                )
    except Exception as e:
        return JSONResponse(
            content={
                "valid": False,
                "error": str(e),
            },
            status_code=500,
        )
