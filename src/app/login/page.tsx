'use client'

import { metamask } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import axios from '@/lib/axios'
import { setAuthToken, setWalletAddress } from '@/lib/localStorage'
import { connectAndSign } from '@/lib/web3'
import { AxiosError, AxiosResponse } from 'axios'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Web3 from 'web3'

type Props = {}

const Login = (props: Props) => {
  const {theme} = useTheme();
  const [ web3, setWeb3 ] = React.useState<Web3|null>(null)
  const { toast } = useToast();
  const router = useRouter();

  useEffect(()=>{
    setWeb3(new Web3(window.ethereum))
  }
  , [])

  const connect = async () => {
    const auth = await connectAndSign(web3);
    if(!auth) {
      toast({
        title: 'Error',
        description: 'Authentication failed',
      })
      return;
    }
    let walletAddress = auth.walletAddress;

    await axios.post('/login', {
      authentication: auth,
      walletAddress
    }).then((res: AxiosResponse)=>{
      setAuthToken(res.headers['authorization']);
      setWalletAddress(walletAddress);

      

      axios.post('/contract/has-voted', {
        walletAddress
      }).then((res: AxiosResponse)=>{
        if(res.data.hasVoted) {
          toast({
            title: 'Error',
            description: 'You have already voted',
          })

          router.push('/results');
        }else{
          toast({
            title: 'Success!',
            description: 'Logged in successfully',
          })

          router.push('/vote');

        }
      })
    }).catch((err:AxiosError)=>{
      console.log(err);

      toast({
        title: 'Error',
        description: err.message,
      })
    })

  }

  return (
      <Card className='relative w-80 mx-auto top-1/2 -translate-y-1/2'>
        <CardHeader>
          <h1 className=' text-center'>
            Login
          </h1>
        </CardHeader>
        <CardContent className=' '>
          <Button onClick={connect} variant={'secondary'} className={(theme === 'light'?' bg-orange-300': ' bg-blue-600' )+ ' w-full'}>
            LOGIN WITH METAMASK <Image className={' h ml-3 h-full w-min'} src={metamask} alt='metamask'></Image>
          </Button>
        </CardContent>
        <CardFooter className=' w-full'>
          <p className={' text-center mx-auto' }>
            Not registered yet? <Link className={' ml-1 text-blue-500 underline'} href={'/register'}> Register here </Link>
          </p>
        </CardFooter>
      </Card>
  )
}

export default Login