'use client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React from 'react'
import { dhani, acap, faza } from '@/assets/images'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import Link from 'next/link'

type Props = {}

const HomePage = (props: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className=' absolute flex flex-col items-center justify-center top-0 -z-10 w-full h-full '>
      <div className=' w-4/5 grid gap-2 grid-cols-6'>
        <h1 className=' text-center font-medium col-span-6'>
          Choose Your Candidate!
        </h1>
        <div className=' col-span-2'>
          <AspectRatio ratio={1}>
            <Image src={acap} alt='dhani' className=' col-span-2 rounded-full h-full w-full object-cover mx-auto'/>
          </AspectRatio>
          <h1 className=' text-center font-normal'>
            ACAP
          </h1>

        </div>
        <div className=' col-span-2'>
          <AspectRatio ratio={1}>
            <Image src={dhani} alt='dhani' className=' col-span-2 rounded-full h-full w-full object-cover mx-auto'/>
          </AspectRatio>
          <h1 className=' text-center font-normal'>
            DHANI
          </h1>

        </div>
        <div className=' col-span-2'>
          <AspectRatio ratio={1}>
            <Image src={faza} alt='dhani' className=' col-span-2 rounded-full h-full w-full object-cover mx-auto'/>
          </AspectRatio>
          <h1 className=' text-center font-normal'>
            FAZA
          </h1>
        </div>

      </div>
      <Button className=' text-xl mx-auto mt-4 bg-orange-400' variant={'secondary'}>
        <Link href={'/login'}>
          VOTE NOW
        </Link>
      </Button>
    </div>
  )
}

export default HomePage