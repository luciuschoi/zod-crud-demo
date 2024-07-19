'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createMessage } from '../../prisma/actions'
import { useToast } from "@/components/ui/use-toast"


const schema = z.object({
  name: z.string().min(1),
  message: z.string().min(1),
})

type Message = z.infer<typeof schema>

const Rhf = () => {
  const { toast } = useToast()
  const [data, setData] = useState<Message | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      message: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: Message) => {
    console.log("onSubmit ->", data)
    const result = schema.safeParse(data)

    if (!result.success) {
      console.log("onSubmit -> error", result.error)
      return
    }

    const addMessage = async (data: Message) => {
      try {
        const result = await createMessage(data)
        console.log("result ->", result.duplicated)

        if (result.duplicated) {
          // setError('message', { message: 'Message already exists' })
          toast({ title: "Message already exists", description: "Please try again" })
          return
        }

        if (!result.duplicated) {
          setData(result.data as Message)
        }

      } catch (error) {
        console.log("error ->", error)
      }
    }


    addMessage(result.data)


    // fetch('/api/messages', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setData(data)
    //     reset()
    //   })
  }

  return (
    <div className='grid grid-cols-2 gap-4 w-[40rem]'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <input {...register('name')} placeholder="Name" className='text-black border-b border-gray-300 rounded-md p-2' />
        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

        <input {...register('message')} placeholder="Message" className='text-black border-b border-gray-300 rounded-md p-2' />
        {errors.message && <p className='text-red-500'>{errors.message.message}</p>}

        <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Submit</button>
      </form>
      <div className='bg-blue-500 text-white p-5 rounded-md'>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  )
}

export default Rhf