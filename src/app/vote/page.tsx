'use client'

import React, { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { getAuthToken, getWalletAddress } from '@/lib/localStorage';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { vote } from '@/lib/web3';
import Web3 from 'web3';
import { AxiosError, AxiosResponse } from 'axios';

type Props = {}


const Page = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm();
  const [ agree, setAgree ] = React.useState(false);
  const [ candidates, setCandidates ] = React.useState([]);
  const [ web3, setWeb3 ] = React.useState<Web3|null>(null)

  useEffect(()=>{
    setWeb3(new Web3(window.ethereum));

    axiosInstance.post('/verify-token', {
      authToken: getAuthToken(),
      walletAddress: getWalletAddress()
    }).then((res: AxiosResponse)=>{
      if(!res.data.isAuthed) {
        toast({
          title: 'Error',
          description: 'You are not logged in',
        })

        router.push('/login')
      }
    }).catch(()=>{
      toast({
        title: 'Error',
        description: 'You are not logged in',
      })

      router.push('/login')

    })

    axiosInstance.get('/contract/get-candidates').then((res: AxiosResponse)=>{
      setCandidates(res.data.candidates);

      console.log(res.data.candidates);
      
    }).catch((err: AxiosError)=>{

      console.warn(err);

      toast({
        title: 'Error',
        description: err.message,
      })
    })
  }, [ router, toast]);

  const handleSubmit = (data: any) => {
    console.log(data);

    vote(web3, data.candidate).then((res)=>{  
      toast({
        title: 'Success!',
        description: 'Voted successfully',
      })

      router.push('/results')
      // console.log(res);
      
    }
    ).catch((err)=>{
      toast({
        title: 'Error',
        description: err.message,
      })
    })

  }
    

  return (
    <>
      <Card className=' w-96 mx-auto my-auto relative top-1/2 -translate-y-1/2'>
        <CardHeader>
          <h1 className=' text-center'>
            Voting Form
          </h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className=' flex flex-col gap-2'>
              <label htmlFor='candidate'>Choose Candidate</label>
              <select {...form.register('candidate')} className=' border-2 border-gray-300 rounded-md p-2'>
                {
                  candidates.map((candidate: any, index)=>{
                    return (
                      <option key={index} value={candidate}>{candidate}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className=' mt-3'>
              <input onChange={((e)=>setAgree(e.target.checked))} type='checkbox' name='terms' className='mr-2'></input>
              <label className=' text-xs text-gray-700' htmlFor="terms">Do you understand this will change your future?</label>
            </div>

            <Button disabled={!agree} className=' mt-2 relative left-1/2 -translate-x-1/2' type='submit'>VOTE</Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default Page 