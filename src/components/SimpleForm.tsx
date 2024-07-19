'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { createMessage } from '../../prisma/actions'

const schema = z.object({
  name: z.string().min(1),
  message: z.string().min(1),
})


type Message = z.infer<typeof schema>

const SimpleForm = () => {
  const [data, setData] = useState<Message>()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)
    const values = Object.fromEntries(data.entries())
    const result = schema.safeParse(values)
    if (!result.success) {
      console.log("result: error ->", result.error?.issues)
      return
    }

    const addMessage = async (data: Message) => {
      try {
        const newMessage = await createMessage(data)
        if (newMessage) {
          setData(newMessage)
        }

      } catch (error) {
        console.log("error ->", error)
      }
    }
    addMessage(result.data)


    // fetch('/api/messages', {
    //   method: 'POST',
    //   body: JSON.stringify(values),
    // }).then(res => res.json())
    //   .then(data => {
    //     console.log("result: data ->", data)
    //     setData(data)
    //   })
  }

  return (
    <div className='grid grid-cols-2 gap-4 w-[40rem]'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder="Name" name='name' className='text-black border-b border-gray-300 rounded-md p-2' />
        <input type="text" placeholder="Message" name='message' className='text-black border-b border-gray-300 rounded-md p-2' />
        <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Submit</button>
      </form>
      <div className='bg-blue-500 text-white p-5 rounded-md'>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  )
}

export default SimpleForm