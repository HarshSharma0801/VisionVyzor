import Navbar from "@/components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full h-full">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default Layout;
