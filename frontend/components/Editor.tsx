'use client'
import Head from 'next/head'
import React, { useState, useCallback, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import FilpFlop from '@/public/flip_flop1.png'
import useCodeMirror, {highlightSusLines, showNextCode} from "@/components/use-codemirror";
import {useRouter} from "next/navigation";
import {EditorState} from "@codemirror/state";
import {GetStaticProps} from "next";
import {Spacer} from "@nextui-org/react";
import {string} from "zod";

type codeSnippetsProps = {
    code_snippets: [ string ]
}
export default function Editor(codeSnippetsParams : codeSnippetsProps) {
    const totalProblems = codeSnippetsParams.code_snippets.length
    const [codeSnippets, setCodeSnippets] = useState(codeSnippetsParams.code_snippets)
    const [doc, setDoc] = useState<string>(codeSnippets[0])
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
           cache: 'no-cache',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               'code_snippet': codeSnippets[0]
           })
        })

        const data = await res.json()
        const lines = data.implicated_lines

        // @ts-ignore
        //need to figure out new lines maybe?
        if (editorView) {
            highlightSusLines(editorView, lines)
        }
        return lines
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const lines = await fetchData();
        if ( lines.length === 0 ){
            handleNext(event)
        }
    }

    const handleNext = (event) => {
        event.preventDefault()
        if ( codeSnippets.length > 1){
            const newCodeSnippet = codeSnippets.slice(1)
            setCodeSnippets( newCodeSnippet )
            showNextCode(editorView, newCodeSnippet[0])

            console.log(codeSnippets.length, newCodeSnippet.length)
        } else {
            alert("finished")
        }

        // router.push(``)
    }

    return (
            <React.Fragment>
            <div className={`${styles.title} pb-10`}> Problem # {totalProblems + 1 - codeSnippets.length} </div>
            <form className={'flex flex-auto flex-col max-h-full justify-between'}>
                <div className='flex flex-row items-center justify-around'>
                    <div className={`flex ${styles.code}`} ref={refContainer}/>
                    <Image className='flex flex-grow w-1/2 h-1/2  justify-center align-center' src={FilpFlop} />
                </div>
                <div className='flex flex-row gap-x-20 justify-center'>
                    <button className='w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-5' type='submit' onClick={handleSubmit}>submit</button>
                     { (codeSnippets.length > 1) &&
                        <button className='w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-5' type='submit' onClick={handleNext}>Next</button>

                     }
                </div>
            </form>
            </React.Fragment>

    )
}

