'use client'

import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
      <h1>
        {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_DEV}
      </h1>
      <h1>
        {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_PROD}
      </h1>
    </div>
  )
}

export default Page