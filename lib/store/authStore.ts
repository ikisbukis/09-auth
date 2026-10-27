import { User } from "@/types/user";
import { create } from "zustand";


interface AuthStore {
    isAuth: boolean
    user: User | null
    setUser: (user : User) => void
    cleanUser: ()=>void
}

export const useAuthStore = create<AuthStore>()((set) => ({
    isAuth: false,
    user: null,
    setUser: (user : User) => set({isAuth:true, user}),
    cleanUser: ()=> set({isAuth: false, user: null})
})) 