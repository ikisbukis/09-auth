import { User } from "@/types/user";
import { create } from "zustand";


interface AuthStore {
    isAuthenticated: boolean
    user: User | null
    setUser: (user : User) => void
    cleanUser: ()=>void
}

export const useAuthStore = create<AuthStore>()((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user : User) => set({isAuthenticated:true, user}),
    cleanUser: ()=> set({isAuthenticated: false, user: null})
})) 