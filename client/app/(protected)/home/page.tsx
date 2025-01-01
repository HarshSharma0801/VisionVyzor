import { auth } from "@/auth";
import FileUpload from "@/components/uploadFile";

const Settings = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <div className="h-screen w-full flex justify-center">
        <FileUpload />
      </div>
    </>
  );
};

export default Settings;
