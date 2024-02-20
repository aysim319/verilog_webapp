'use client'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Spacer} from "@nextui-org/spacer";


export default function LoginForm() {

    const [form, setForm] = useState({
        pid: '',
        name: ''
    })
    const router = useRouter()

    const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch(`/api/login`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': form.name,
                'pid': form.pid,
            })
        })
        if (!res.ok) {
            alert('login failed')
        }
        const data = await res.json()
        const token = data.token

        await router.push(`/home?tk=${token}`)
    }

    const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    // @ts-ignore
    return (
            <form className='flex w-1/2 justify-self-center flex-col gap-y-4 justify-between' onSubmit={handleSubmit}>
                <input
                    className="shadow appearance-none border rounded w-full py-5 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="pid" type="text" onChange={handleChange} placeholder="PID" value={form.pid}/>

                <input
                    className="shadow appearance-none border rounded w-full py-5 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name" type="text" onChange={handleChange} placeholder="Full Name" value={form.name}/>
                {/*<input*/}
                {/*    className="shadow appearance-none border rounded w-full py-5 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/}
                {/*    name="date" type="text" onChange={handleChange} placeholder="passcode"/>*/}

                <Spacer y={10}/>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">Submit
                </button>
            </form>
    )
}

