'use client';
import Image from 'next/image';
import React from 'react'
import { signIn, signOut } from "next-auth/react"
import { User } from '@prisma/client';

type Props = {
  user: User | null
}

export const UserProfileImg = ({
  user
}: Props) => {
  if (!user) {
    return <button onClick={() => signIn()}>
      Log in
    </button>
  }
  return (
    <button onClick={() => signOut()} className='w-12 h-12 overflow-hidden rounded-full'>
      <Image className='object-contain' src={user.image!} alt='user avatar' width={56} height={56}/>
    </button>
  )
}
