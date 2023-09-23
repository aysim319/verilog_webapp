import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Editor from "@/components/Editor";
import { use } from 'react';

async function  getCodeSnippet()  {
    // for server component the rewrite async function doesn't run first
    const  res = await fetch(`${process.env.BACKEND_URL}/api/codesnippets`, {
           cache: 'no-cache'
        }
    )

    if (!res.ok) {
        throw new Error("fetch failed")
    }
    const data = await res.json()
    return data.code_snippets
}


export default function Home() {
    const codeSnippets = use(getCodeSnippet())
    console.log(codeSnippets)
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
export const dynamic = 'force-dynamic'


