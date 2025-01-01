"use client";
import { useRouter } from "next/navigation";
import { IoScan } from "react-icons/io5";

const Navbar = () => {
  const navigate = useRouter();

  return (
    <>
      <div className="flex justify-between  w-full  text-white bg-[#3C0753] p-4 px-8">
        <div>
          <h1
            onClick={() => {
              navigate.push("/");
            }}
            className="text-xl md:text-3xl flex justify-center gap-2  cursor-pointer"
          >
            <div className="flex justify-center ite">
              <IoScan className="text-white" />
            </div>
            <div>VisionVyzor</div>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Navbar;
