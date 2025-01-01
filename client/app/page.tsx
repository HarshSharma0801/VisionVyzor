import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginBtn } from "@/components/auth/LoginBtn";

const font = Poppins({ subsets: ["latin"], weight: "600" });


export default function Home() {

  return (
    <>
      <main className="flex flex-col justify-center  gap-3 items-center w-screen h-screen bg-sky-500">
        <div className="space-y-6 ">
          <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )
          }>
            🔓 Auth
          </h1>
          <p className="text-white text-lg text-center">Landing Page</p>
        </div>

        <div>
          <LoginBtn>
          <Button  variant="secondary" size='lg'>
            Sign In
          </Button>
          </LoginBtn>
         
        </div>
      </main>
    </>
  );
}
