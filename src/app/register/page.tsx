'use client'

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import MetamaskConnectButton from '@/components/ui/metamask-button'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import z, { set } from 'zod'
import { MetaMaskProviderWrapper } from '@/components/providers/metamask-provider'
import Web3 from 'web3'
import { Button } from '@/components/ui/button'
import { axiosInstance } from '@/lib/axios'

type Props = {}

const registerSchema = z.object({
  authentication: z.object({
    message: z.string(),
    signature: z.string(),
    walletAddress: z.string()
  }),
  walletAddress: z.string(),
  fullName: z.string(),
  passportNumber: z.string()
})

type RegisterSchema = z.infer<typeof registerSchema>

const Register = (props: Props) => {
  const {theme } = useTheme();
  const form = useForm({
    
  })

  // const [isConnected, setIsConnected] = useState(false);
  // const [account, setAccount] = useState<string|null|undefined>(null);
  const [web3, setWeb3] = useState<Web3|null>(null);  

  React.useEffect(()=>{
    // console.log(window);
    
    setWeb3(new Web3(window.ethereum))

    async ()=>{
      
    }
  }, [])

  const connect = async () => {
    try {
      await window.ethereum?.enable()
      console.log(await web3?.eth.getAccounts());
      
      // setIsConnected(true);
      // setAccount(web3?.eth.accounts[0]);
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  }

  const sign = async () => {
    try {
      const accounts = await web3?.eth.getAccounts();
      console.log(accounts);
      
      const message = 'Hello World';
      if(accounts?.length === 0 || !accounts) return;
      const signature = await web3?.eth.personal.sign(message, accounts[0], '');
      if(!signature) return;

      await axiosInstance.post('/api/verify-signature', {
        message,
        signature,
        walletAddress: accounts[0]
        })
        .then(res=>{
          console.log(res);
          localStorage
        })
      // console.log(success);
      
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  }

  return (
    <div className=' absolute top-0 left-0 w-full h-full -z-10'>
      <Card className='relative w-80 mx-auto top-1/2 -translate-y-1/2'>
        <CardHeader>
          <h1 className=' text-center'>
            Register
          </h1>
        </CardHeader>
        <CardContent className=' '>
          {/* <h1>{isConnected?account:'disconnected'}</h1> */}
          <Button  onClick={connect}>Connect</Button>
          <Button onClick={sign}>Sign</Button>
          {/* <MetaMaskProviderWrapper>
                <MetamaskConnectButton setAccount={setAccount} setIsConnected={setIsConnected} buttonText={isConnected?'Disconnect Wallet':'Connect Wallet'} className={' w-full' + (theme==='light'?' bg-orange-300 ': ' bg-sky-950 ')}/>
          </MetaMaskProviderWrapper> */}
        </CardContent>
        <CardFooter className=' w-full'>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Register