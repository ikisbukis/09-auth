'use client'

import Image from 'next/image'
import css from './EditProfile.module.css'
import { useQuery } from '@tanstack/react-query'
import { getMe, updateMe, UpdateUserRequest } from '@/lib/api/clientApi'
import { useState } from 'react'


export default function EditProfilePage() {
  const[values, setValues] = useState<UpdateUserRequest>({})
  
  const handleSubmit = async (formdata: FormData) => {
      const valuesForm = Object.fromEntries(formdata) as unknown as UpdateUserRequest
      if(valuesForm){
        setValues(valuesForm)
        await updateMe(values)
      }
  }

   const {data: user} = useQuery({
    queryKey:['getME', values],
    queryFn: () => getMe()
  })

  return (
    <>
    <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image 
      src={user?.avatar || "/"}
      alt='User avatar'
      width={120}
      height={120}
      className={css.avatar}
    />

    <form className={css.profileInfo} action={handleSubmit}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          name="username"
          defaultValue='user_username'
          type="text"
          className={css.input}
        />
      </div>

      <p>Email: {user?.email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton} >
          Save
        </button>
        <button type="button" className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>

    </>
  )
}


