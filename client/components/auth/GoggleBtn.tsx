import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react";
import { defaultRedirect } from "@/routes";

export const GoogleButton = ()=>{



    const handleClick = () => {
        signIn('google', {
          callbackUrl: defaultRedirect,
        });
      };

    return <>
      <Button onClick={handleClick} size="lg" className="xl:w-[70%] text-[16px] cursor-pointer w-full flex justify-center gap-4 relative z-10 bg-neutral-400 border-none " variant="outline">
          <FcGoogle className="w-5 h-5" />
          <div>
            Login with Google
          </div>
        </Button>
    </>
}