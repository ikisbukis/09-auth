import { User } from '@/types/user';
import type { Note, CreateNoteType} from '../../types/note';
import { nextApiServer } from './api';

export interface FetchNotesParams{
    page: number
    search?: string
    tag?: string
}

export interface FetchNotesParamsHttpResponse{
    notes: Note[]
    totalPages: number
}

export interface RegisterRequest{
    email: string
    password: string
}

export interface LoginRequest {
    email: string
    password: string
}

interface CheckSession{
    success: boolean
}

export type UpdateUserRequest = {
  username?: string
};

//auth routes
export const register = async (data : RegisterRequest) => {
    const response = await nextApiServer.post<User>(`/auth/register`, data)  
    return response.data
} 

export const login = async (data: LoginRequest) => {
    const response = await nextApiServer.post<User>(`/auth/login`, data)
    return response.data
}

export const logout = async (): Promise<void> => {
  await nextApiServer.post('/auth/logout')
};

export const checkSession = async (): Promise<boolean> => {
    const response = await nextApiServer.get<CheckSession>(`/auth/session`)
    return response.data.success
}

export const getMe = async () => {
    const response = await nextApiServer.get<User>(`/users/me`)
    return response.data
}

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextApiServer.patch<User>('/users/me', payload);
  return res.data;
};

//note routes
export const fetchNotes = async ({page, search, tag}: FetchNotesParams) : Promise<FetchNotesParamsHttpResponse> => {
    const response = await nextApiServer.get<FetchNotesParamsHttpResponse>(`/notes`, {
        params: {page, ...(search ? {search} : {}), ...(tag ? {tag} : {})}
    })
    return response.data
}

export const createNote = async ( {title, content, tag} : CreateNoteType) : Promise<Note> => {
    const response = await nextApiServer.post<Note>(`/notes`, {title, content, tag})
    return response.data
}

export const deleteNote = async (id: string) : Promise<Note> => {
    const response = await nextApiServer.delete<Note>(`/notes/${id}`)
    return response.data
}

export const fetchNoteById = async (id: string) : Promise<Note> => {
    const response = await nextApiServer.get<Note>(`/notes/${id}`)
    return response.data
}

