export type IUser = {
  googleId: string | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
};



export interface IDocument {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: null;
  pages: any;
}
