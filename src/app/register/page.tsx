'use client'

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import z, { set } from 'zod'
import Web3 from 'web3'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { metamask } from '@/assets/icons'
import { useToast } from '@/components/ui/use-toast'
import { Form,FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { connect } from 'http2'
import axios from '@/lib/axios';

import { useRouter } from 'next/navigation'
import { connectAndSign } from '@/lib/web3'

type Props = {}

const registerSchema = z.object({
  walletAddress: z.string(),
  fullName: z.string(),
  passportNumber: z.string()
})

type RegisterSchema = z.infer<typeof registerSchema> 
type AuthObj = {
  message: string,
  signature: string,
  walletAddress: string
}

export type RegisterPostBodySchema = RegisterSchema & { authentication: AuthObj }

const Register = (props: Props) => {
  const {toast} = useToast();
  const {theme } = useTheme();
  const [ isAuthed, setIsAuthed ] = useState(false)
  const [ authObj, setAuthObj ] = useState<AuthObj | null>(null)
  const router = useRouter();
  const form = useForm<RegisterSchema>({
    defaultValues: {
      walletAddress: '',
      fullName: '',
      passportNumber: ''
    }
  })
  const [loading, setLoading] = useState(false);
  // const [isConnected, setIsConnected] = useState(false);
  // const [account, setAccount] = useState<string|null|undefined>(null);
  const [web3, setWeb3] = useState<Web3|null>(null);  

  React.useEffect(()=>{
    // console.log(window);
    
    setWeb3(new Web3(window.ethereum))
  }, [])

  const connectWallet = async () => {
    try {
      let auth = await connectAndSign(web3);
      
      if(!auth) throw new Error('Failed to connect');

      setAuthObj(auth)
      setIsAuthed(true);
      form.setValue('walletAddress', auth.walletAddress);

    } catch (err) {
      toast({
        title: 'Failed to connect',
        description: 'Unable to verify your wallet address',
      })
      console.warn(`No accounts found`, err);
    }
  }

  const disconnect = async () => {
    try {
      await window.ethereum?.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });

      connectWallet();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  }

  const onSubmit = async (data: RegisterSchema) => {
    setLoading(true);

    try{
      await axios.post('/register', {
        authentication: authObj,
        ...data
      })

      toast({
        title: 'Success',
        description: 'Successfully registered',
      })

      router.push('/login');
    }catch( error: any) {
      toast({
        title: 'Failed to register',
        description: error.response.data.message,
      })
    }
    
  }

  return (
      <Card className='relative w-80 mx-auto top-1/2 -translate-y-1/2'>
        <CardHeader>
          <h1 className=' text-center'>
            Register to vote
          </h1>
        </CardHeader>
        <CardContent className=' '>
          {/* <h1>{isConnected?account:'disconnected'}</h1> */}
          {
            isAuthed?
            <Button className={' w-full ' + (theme=='light'?' bg-orange-200': ' bg-slate-600 ')} variant={'secondary'} onClick={disconnect}>Change Wallet<Image className=' ml-2 h-full w-auto' src={metamask} alt="metamask"></Image> </Button>
            :<Button className={' w-full ' + (theme=='light'?' bg-orange-200': ' bg-slate-600 ')} variant={'secondary'} onClick={connectWallet}>Connect <Image className=' ml-2 h-full w-auto' src={metamask} alt="metamask"></Image> </Button>
          }
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Address</FormLabel>
                    <FormControl>
                      <p className={' h-8 flex items-center border-2 border-grey-400 w-full text-sm overflow-hidden text-gray-300 rounded-md'}>{form.getValues('walletAddress')}</p>
                      {/* <Input className=' text-sm' disabled={true} placeholder="" {...field} value={form.getValues('walletAddress')}/> */}
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                        <Input placeholder="" {...field} />         
                    </FormControl>
                  </FormItem>
                )}
              />  

              <FormField
                control={form.control}
                name="passportNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passport Number</FormLabel>
                    <FormControl>
                        <Input placeholder="" {...field} />         
                    </FormControl>
                  </FormItem>
                )}
              />  
              <Button disabled={loading} className=' w-full mt-2' type="submit">{loading?'Loading':'Submit'}</Button>
            </form>
          </Form>
          {/* <MetaMaskProviderWrapper>
                <MetamaskConnectButton setAccount={setAccount} setIsConnected={setIsConnected} buttonText={isConnected?'Disconnect Wallet':'Connect Wallet'} className={' w-full' + (theme==='light'?' bg-orange-300 ': ' bg-sky-950 ')}/>
          </MetaMaskProviderWrapper> */}
        </CardContent>
        <CardFooter className=' w-full'>
        </CardFooter>

        {/* <Button onClick={()=>{console.log(form.getValues());}}>click</Button> */}
      </Card>
  )
}

export default Register