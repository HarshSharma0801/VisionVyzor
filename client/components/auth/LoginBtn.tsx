'use client'
import { useRouter } from "next/navigation"
interface LoginProps {

    children : React.ReactNode,
    mode?: "modal" | "redirect" ,
    asChild?: boolean
}

export const LoginBtn = ({
    children ,
    mode="redirect",
    asChild
}:LoginProps)=>{

    const Router = useRouter();



    const click = ()=>{
        Router.push('/auth/login')
        console.log("clicked")
    }

return (
    <span  onClick={click} className="cursor-pointer">
       {children}
    </span>
)
}


