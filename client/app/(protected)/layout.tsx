import Navbar from "@/components/navbar";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <div className="w-full h-full">
        <Navbar user={user} />
        {children}
      </div>
    </>
  );
};

export default Layout;
