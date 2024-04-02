"use client";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Signup from "@/components/Signup";
import appwriteService from "@/appwrite/config";



const LogoutPage=()=>{

    const router =useRouter();
    const {setAuthStatus} = useAuth()

    useEffect(() => {
        appwriteService.logout().then(()=>{setAuthStatus(false); router.replace("/");})
    }, [])
    
return(
    <></>
)



}
export default LogoutPage