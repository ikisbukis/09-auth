'use client'

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore"
import { useEffect } from "react";

interface Props {
    children: React.ReactNode
}

const AuthProvider = ({children}: Props) => {
    const setUser = useAuthStore(state => state.setUser);
    const cleanUser = useAuthStore(state=> state.cleanUser);
    useEffect(()=>{
        const fetchUser = async () => {
            const isAuthenticated = await checkSession();
            if(isAuthenticated){
                const user = await getMe();
                if (user) setUser(user);
            } else {
                cleanUser();
            }
        };
        fetchUser()
    }, [setUser, cleanUser])
    return children
}

export default AuthProvider