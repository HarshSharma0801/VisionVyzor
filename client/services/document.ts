import axios from "axios";
import { IDocument } from "@/utils/types";

axios.defaults.baseURL = "http://localhost:4030";

export const get_user_documents = async (
  googleId: string
): Promise<IDocument[] | null> => {
  try {
    const { data } = await axios.get(`/documents`, {
      params: {
        googleId: googleId,
      },
    });
    if (data.valid) {
      return data.docs;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const get_document_by_id = async (
  id: string
): Promise<IDocument | null> => {
  try {
    const { data } = await axios.get(`/documents/${id}`);
    if (data.valid) {
      return data.document;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
