// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { api } from '@/app/api/api';
import { Note } from '@/types/note';
import { FetchNotesParams, FetchNotesParamsHttpResponse } from './clientApi';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const {data} = await api.get(`/users/me`, {
    headers: {
      Cookie: cookieStore.toString(),
    }})
  return data
}

export const fetchNoteById = async (id: string) : Promise<Note> => {
    const cookieStore = await cookies();
    const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    }})
    return response.data
}

export const fetchNotes = async ({page, search, tag}: FetchNotesParams) : Promise<FetchNotesParamsHttpResponse> => {
    const cookieStore = await cookies();
    const response = await api.get<FetchNotesParamsHttpResponse>(`/notes`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        params: {page, ...(search ? {search} : {}), ...(tag ? {tag} : {})}
    })
    return response.data
}