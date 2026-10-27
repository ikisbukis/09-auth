// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { api } from '@/app/api/api';

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