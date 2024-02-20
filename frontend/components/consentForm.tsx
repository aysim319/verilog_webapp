'use client'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Spacer} from "@nextui-org/spacer";


export default function RegisterPage() {

    const [form, setForm] = useState({
        pid: 1,
        name: 'test',
        date: new Date().toISOString().split('T')[0]
    })
    const router = useRouter()

    const sendSubmitData = async () => {
        const res = await fetch(`/api/register`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': form.name,
                'pid': form.pid,
                'date': form.date,

            })
        })
        if (!res.ok) {
            throw new Error("fetch failed")
        }
        const data = await res.json()
        const token = data.token

        await router.push(`/home?tk=${token}`)
    }
    const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (form.pid > 0 && form.name.length != 0) {
            sendSubmitData()
        } else {
            alert("PID is invalid. Enter numerical values only")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
            <form className='flex flex-col gap-y-4 justify-between' onSubmit={handleSubmit}>
                <div className='flex flex-row gap-4'>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="pid" type="text" onChange={handleChange} placeholder="PID" value={form.pid}/>

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="name" type="text" onChange={handleChange} placeholder="Full Name" value={form.name}/>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="date" type="date" onChange={handleChange} placeholder="date" value={form.date}/>

                </div>
                <Spacer y={20}/>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">Submit
                </button>
            </form>
    )
}

