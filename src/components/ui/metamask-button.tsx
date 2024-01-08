'use client'

import { metamask } from '@/assets/icons'
import { useSDK } from '@metamask/sdk-react'
import React, { useEffect } from 'react'
import { Button } from './button'
import Image from 'next/image'

type Props = {
  className?: string,
  buttonText?: string,
  setIsConnected?: React.Dispatch<React.SetStateAction<boolean>>,
  setAccount?: React.Dispatch<React.SetStateAction<string | null | undefined>>
}

const MetamaskConnectButton = (props: Props) => {
  const { sdk, connected, connecting, account } = useSDK();  
  const { className, buttonText, setAccount, setIsConnected } = props;

  setAccount?.(account);
  setIsConnected?.(connected);

  useEffect(()=>{
    console.log(account, connected);
    
    setIsConnected?.(connected);
    setAccount?.(account);
  }, [connected, account, setIsConnected, setAccount])

  const toggleConnect = async () => {
    try {
      if (connected) {
        sdk?.disconnect()
      } else {
        // await sdk?.connectAndSign({ msg: 'Hello World'})
        await sdk?.connect();
      }
      
      console.log('Button clicked', connected);
      
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const connect = async () => {
    try {
      await sdk?.connect();

      console.log(sdk?.getProvider());
      
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  }

  const disconnect = async () => {
    try {

      console.log(connected);
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  }

  return (
    <>
        <Button disabled={connecting} onClick={connect} variant={'secondary'} className={className}>
          {'Connect'} <Image className={' h ml-3 h-full w-min'} src={metamask} alt='metamask'></Image>
        </Button>
        <Button disabled={connecting} onClick={disconnect} variant={'secondary'} className={className}>
          {'Disconnect'} <Image className={' h ml-3 h-full w-min'} src={metamask} alt='metamask'></Image>
        </Button>
    </>
  )
}

export default MetamaskConnectButton