"use client";
import { useRouter } from "next/navigation";
import { IoScan } from "react-icons/io5";
import { type DefaultSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = ({ user }: { user: DefaultSession["user"] }) => {
  const navigate = useRouter();

  return (
    <>
      <div className="flex justify-between  w-full  text-[#2A3335] bg-white border-b-gray-300 border-b p-2 md:p-4 md:px-8">
        <div>
          <h1
            onClick={() => {
              navigate.push("/");
            }}
            className="text-xl font-bold md:text-3xl flex justify-center gap-2  cursor-pointer"
          >
            <div className="flex justify-center items-center ">
              <IoScan className="text-[#2A3335]" />
            </div>
            <div>VisionVyzor</div>
          </h1>
        </div>

        {user && (
          <>
            <div className="hidden md:flex justify-center">
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.image ?? ""} alt="@shadcn" />
                <AvatarFallback>{user.image}</AvatarFallback>
              </Avatar>
            </div>
          </>
        )}

        <div className="md:hidden  text-[#2A3335] flex justify-center items-center w-6 h-6">
          <RxHamburgerMenu />
        </div>
      </div>
    </>
  );
};

export default Navbar;
