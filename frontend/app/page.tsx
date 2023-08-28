'use client'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useCallback } from 'react'
import Editor from '../components/editor'
import styles from '../styles/Home.module.css'

export default function Home() {
    const code_snippet =
`module tff (   input clk,
           input 	  rstn,
           input 	  t,
           output reg q);

always @ (posedge clk) begin

  if (rstn)
 q <= 0;
  else if (t)
 q <= ~q;
  else
 q <= q;

end
endmodule
    `
    const [doc, setDoc] = useState<string>(code_snippet)
    const handleDocChange = useCallback((newDoc: string) => {
        setDoc(newDoc)
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>editor</title>
            </Head>
            <main className={`${styles.main} flex flex-col content-center gap-2`}>
                <div className='h-full w-1/2 gap-4'>
                    <Editor initialDoc={doc} onChange={handleDocChange}/>
                </div>
            </main>
        </div>
    )
}

