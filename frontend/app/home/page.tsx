import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Editor from "@/components/Editor";
import React, { use } from 'react';

async function  getCodeSnippet(searchParams: {searchParams: {[key: string]: string | undefined}})  {
    // NOTE: for server component the rewrite async function doesn't run first


    const  res = await fetch(`${process.env.BACKEND_URL}/api/codesnippets`, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
               'Content-Type': 'application/json',
                // @ts-ignore
               'Authorization': `${searchParams['tk']}`
           },
        }
    )
    if (res.status === 401){
        throw new Error("unauthorized")
    }
    if (!res.ok) {
        throw new Error("fetch failed")

    }
    const data = await res.json()
    return data.code_snippets
}

export default async function Home({searchParams}: {searchParams: {[key: string]: string | undefined}}) {

    //@ts-ignore
    const codeSnippets = await getCodeSnippet(searchParams)
    return (
        <div>
            <Head>
                <title>editor</title>
            </Head>
            <main className={`${styles.main} max-h-screen`}>
                <Editor code_snippets={codeSnippets}/>
            </main>
        </div>
    )
}
// export const dynamic = 'force-dynamic'


