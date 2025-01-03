from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from config.connection import db_connection

router = APIRouter(tags=["DOC"])

@router.get("/")
async def get_user_documents(googleId: str = Query(..., description="Google ID of the user")):
    try:
      
        user = await db_connection.prisma.user.find_unique(
            where={"googleId": googleId},
            include={"documents": True}  
        )
        if not user:
            return JSONResponse(
                content={"success": False, "message": "User not found", "documents": []},
                status_code=404
            )
        
        
        
        return {"valid":True , "docs":user.documents}
    
    except Exception as e:
        print(e)
        return JSONResponse(
            content={"success": False, "message": "An error occurred while fetching documents"},
            status_code=500
        )



@router.get("/{docId}")
async def get_document_with_pages(docId: str):
    try:
       
        document = await db_connection.prisma.document.find_unique(
            where={"id": docId},
            include={"pages": True} 
        )
        if not document:
            return JSONResponse(
                content={"success": False, "message": "Document not found", "document": None},
                status_code=404
            )
    
        
        return {"valid" : True , "document":document}
    except Exception as e:
        print(e)
        return JSONResponse(
            content={"success": False, "message": "An error occurred while fetching the document"},
            status_code=500
        )

