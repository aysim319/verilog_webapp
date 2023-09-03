'use client'
import Head from 'next/head'
import React, { useState, useCallback } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import FilpFlop from '@/public/flip_flop1.png'
import useCodeMirror, {highlightSusLines} from "@/components/use-codemirror";
import {useRouter} from "next/navigation";
import {EditorState} from "@codemirror/state";

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
    const router = useRouter()
    const handleDocChange =
        useCallback((newDoc: string) => {
        (state: EditorState) => setDoc(state.doc.toString())
    }, [])

    const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
        initialDoc: doc,
        onChange: handleDocChange
    })

    const fetchData = async () => {
        // TODO does not run backend run just the front end
        const res = await fetch(`/api/submit`, {
           method: 'POST',
           cache: 'no-store',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               'code_snippet': "test"
           })
        })

        const data = await res.json()
        const lines = data.implicated_lines


        // @ts-ignore
        if (editorView) {
            highlightSusLines(editorView, lines)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchData(event);
    }

    const handleNext = (event) => {
        event.preventDefault()
        console.log('handleNext')
        // router.push(``)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>editor</title>
            </Head>
            <main className={`${styles.main} space-y-20`}>
                <form>
                    <div className='flex flex-row flex-grow items-center justify-around'>
                        <div className={`${styles.code}`} ref={refContainer}/>
                        <Image className='flex w-1/2 h-1/2  justify-center align-center' src={FilpFlop} />
                    </div>
                    <div className='flex flex-row gap-x-20 justify-center'>
                        <button className='w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-5' type='submit' onClick={handleSubmit}>submit</button>
                        <button className='w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-5' type='submit' onClick={handleNext}>Next</button>
                    </div>
                </form>

            </main>
        </div>
    )
}

