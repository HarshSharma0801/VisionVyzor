import { auth } from "@/auth";
import Header from "@/components/header";
import Documents from "@/components/document";

const Settings = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <div className=" w-full flex flex-col gap-3 justify-center">
        <Header user={user} />
        <Documents user={user}/>
      </div>
    </>
  );
};

export default Settings;
