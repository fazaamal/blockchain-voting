'use client'

import { metamask } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Login = (props: Props) => {
  const {theme} = useTheme();

  return (
    <div className=' absolute top-0 left-0 w-full h-full -z-10'>
      <Card className='relative w-80 mx-auto top-1/2 -translate-y-1/2'>
        <CardHeader>
          <h1 className=' text-center'>
            Login
          </h1>
        </CardHeader>
        <CardContent className=' '>
          <Button variant={'secondary'} className={(theme === 'light'?' bg-orange-200': ' bg-blue-600' )+ ' w-full'}>
            LOGIN WITH METAMASK <Image className={' h ml-3 h-full w-min'} src={metamask} alt='metamask'></Image>
          </Button>
        </CardContent>
        <CardFooter className=' w-full'>
          <p className={' text-center mx-auto' }>
            Not registered yet? <Link className={' ml-1 text-blue-500 underline'} href={'/register'}> Register here </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login