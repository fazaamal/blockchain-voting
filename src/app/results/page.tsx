'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { axiosInstance } from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import { VoteCountObject } from '../api/contract/vote-count/route'

type Props = {}

const Page = (props: Props) => {
  const [ voteCounts, setVoteCounts] = useState<VoteCountObject>();

  useEffect(()=>{
    axiosInstance.get('/contract/vote-count').then(res=>{
      setVoteCounts(res.data);
    })


    setInterval(()=>{
      axiosInstance.get('/contract/vote-count').then(res=>{
        setVoteCounts(res.data);
      })
    }, 5000)
  },[])

  return (
    <Card className='center-card'>
      <CardHeader>
        <h1 className=' text-center'>
          Vote Count
        </h1>
      </CardHeader>
      <CardContent className=' '>
        <div className=' w-full flex flex-row justify-end'>
          <p className=' absolute top-0 right-0 m-2 rounded-sm border-neutral-400 border-2 px-2 animate-pulse'>LIVE</p>
        </div>
        <div className=' h-80 grid grid-cols-3 gap-4 items-end'>
          {/* <div className=' col-span-3 flex flex-row items-end'>
            <p className=' text-center text-sm'>Votes</p>
          </div> */}

          {
            voteCounts?.voteCounts.map(obj => {
              let perc = Math.round((obj.count/voteCounts.maxVotes) * 100)

              if(obj.count ==0 ){
                return <p className=' text-center border-b-slate-400 border-b-4'>0</p>
              }

              return <div className={`bg-slate-400 flex justify-center items-center rounded-sm transition-all ease-in-out`} style={{height: `${perc}%`}}>
                <p>
                  {obj.count>0?obj.count:null}
                </p>
              </div>
            })
          }
        </div>
        <div className='grid grid-cols-3 gap-4'>

          {
            voteCounts?.voteCounts.map(obj => {
              return <p className=' text-center text-sm'> {obj.name}</p>
            })
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default Page