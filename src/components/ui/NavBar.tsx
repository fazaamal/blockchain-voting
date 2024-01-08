'use client'

import React from 'react'
import { Button } from './button'
import { LuSun, LuMoon } from "react-icons/lu";
import { useTheme } from 'next-themes';
import Link from 'next/link';

type Props = {}

const NavBar = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <div className=' w-full h-14 flex items-center justify-left px-4'>
      <Link href={'/'}>
        <h1>#VoteForYourFuture</h1>
      </Link>

      <div className=' absolute right-0 flex items-center'>
        <p>Toggle Theme: </p>
        <Button onClick={toggleTheme} variant={'ghost'} className='mx-2 p-2 w-10 h-10 overflow-hidden'>
          {theme === 'light' ? <LuSun size={25}/> : <LuMoon size={25}/>}
        </Button>
      </div>
    </div>
  )
}

export default NavBar