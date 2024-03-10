import React from 'react'

type Props = {}

export default function Home({}: Props) {
  return (
    <div className='flex h-screen w-screen mx-64'>

        <div className='flex flex-col my-36 h-full w-1/3'>
            <div className='w-1/2 h-1/3 border border-black mx-auto my-6'>Widget 1</div> 
            <div className='w-1/2 h-1/3 border border-black mx-auto my-6'>Widget 2</div>
        </div>
        <div className='flex flex-col my-36 h-full w-1/3'>
            <div className='w-1/2 h-1/3 border border-black mx-auto my-6'>Widget 3</div> 
            <div className='w-1/2 h-1/3 border border-black mx-auto my-6'>Widget 4</div>
        </div> 

        
    </div>
  )
}