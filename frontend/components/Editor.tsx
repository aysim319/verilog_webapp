'use client'
import React, {useState, useCallback, useEffect, MouseEventHandler} from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import FilpFlop from '@/public/flip_flop1.png'
import useCodeMirror, {highlightSusLines, showNextCode} from "@/components/use-codemirror";
import {useRouter, useSearchParams} from "next/navigation";
import {EditorState} from "@codemirror/state";
import {Spacer} from "@nextui-org/spacer";
import {Progress} from "@nextui-org/progress"


type codeSnippetsProps = {
    code_snippets: string []
}

// @ts-ignore
function submitCode(searchParams, codeSnippets, editorView) {
    return fetch(`/api/submit`, {
           method: 'POST',
           cache: 'no-cache',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               'code_type': codeSnippets[0][0],
               'code_snippet': editorView?.state.doc.toString(),
               'bug_type': codeSnippets[0][2],
               'pid': `${searchParams.get('tk')}`
           })
        })
}
export default function Editor(codeSnippetsParams : codeSnippetsProps) {
    const DEBUG_FLAG = process.env.DEBUG
    const MIN_ATTEMPTS = Number(process.env.MIN_ATTEMPTS)
    const totalProblems = Number(process.env.NUM_PROBLEMS)

    const searchParams = useSearchParams()
    const router = useRouter()

    const [codeSnippets, setCodeSnippets] = useState(codeSnippetsParams.code_snippets)
    const [doc, setDoc] = useState<string>(codeSnippets[0][1])
    const [isLoading, setIsLoading] = useState({"waiting":false, "shade": 500, "button_text": "Submit"})
    const [canMoveNext, setCanMoveNext] = useState({"flag": false, "shade":300, "num_tries": 0})

    const handleDocChange =
        useCallback((newDoc: string) => {
            // @ts-ignore
        (editorState: EditorState) => setDoc({doc: doc.toString()})
    }, [])

    // @ts-ignore
    const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
        initialDoc: doc,
        // @ts-ignore
        onChange: handleDocChange
    })


    //@ts-ignore
    // Note fixing and making this is an arrow function loses query param
    // not worth it to have a fully-pledged authenication middleware
    const handleSubmit = async (event) => {
        setIsLoading({waiting:true, shade:300, button_text:"Submitting..."})
        if (editorView?.state.doc.toString().length == 0){
            alert("You cannot submit without any code")
            setIsLoading({waiting:false, shade:500, button_text:"submit"})
            return
        }
        try {

            const res = await submitCode(searchParams, codeSnippets, editorView)

            const data = await res.json()

            const lines: [number] = data.implicated_lines

            if (lines.includes(-1)) {
                alert("There was an error; fix and try again")
            }
            // @ts-ignore
            //need to figure out new lines maybe?
            if (editorView) {
                highlightSusLines(editorView, lines)
            }
            setCanMoveNext({...canMoveNext, num_tries: canMoveNext.num_tries + 1})

            if ( lines && !lines.length ){
                alert("Correct")
                setCanMoveNext({flag: false, shade: 300, num_tries: 0})
                handleNext(event)


            }
        } catch (error){
            console.log(router)

        } finally {
            setIsLoading({waiting:false, shade:500, button_text:"submit"})
        }

    }
    const NextButton = () => {
        useEffect( () => {
            if (canMoveNext.num_tries == MIN_ATTEMPTS){
                setCanMoveNext({flag: true, shade: 500, num_tries: 0})
            }

        })
        if (canMoveNext.flag) {
            return <button className={`w-1/4 bg-blue-${canMoveNext.shade} text-white font-bold py-2 px-4 border border-blue-${canMoveNext.shade} rounded mb-5`} type='submit' onClick={handleNext}>Next</button>
        }
    }


    // @ts-ignore
    // Note fixing and making this is an arrow function loses query param
    // not worth it to have a fully-pledged authenication middleware
       const handleNext = async (event) => {
        let lines: [number] = [-1]
        try {
            event.preventDefault()
            const res = await fetch(`/api/submit`, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                   'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   'code_type': codeSnippets[0][0],
                   'code_snippet': editorView?.state.doc.toString(),
                   'bug_type': codeSnippets[0][2],
                   'pid': `${searchParams.get('tk')}`
               })
            })
            const data = await res.json()

            lines = data.implicated_lines

            if (lines.includes(-1)) {
                alert("There was an error; fix and try again")
            }
            // @ts-ignore
            //need to figure out new lines maybe?
            if (editorView) {
                highlightSusLines(editorView, lines)
            }

            if ( codeSnippets.length > 1 ){
                // setCanMoveNext({flag: false, shade: 300, num_tries: 0})
                const newCodeSnippets = codeSnippets.slice(1)

                setCodeSnippets(newCodeSnippets)
                // @ts-ignore
                showNextCode(editorView, newCodeSnippets[0][1])
                // @ts-ignore
                highlightSusLines(editorView, [])
            } else {
                alert("finished")
            }
        } finally {
            const solved = !lines.length ? 1 : -1
            const res = await fetch(`/api/markproblem`, {
                method: 'PATCH',
                cache: 'no-cache',
                headers: {
                   'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   'problem_type': codeSnippets[0][0],
                   'bug_type': codeSnippets[0][2],
                   'participant_id': `${searchParams.get('tk')}`,
                   'implicated_lines': lines.toString(),
                   'solved': solved
               })
            })

            setCanMoveNext({flag: false, shade: 300, num_tries: 0})

        }

    }

    return (
        <React.Fragment>
            <div className={'space-x-10 space-y-5'}>
            { DEBUG_FLAG &&
                <div className={`${styles.title} pb-10 text-red-700 flex-col`}> <p> DEBUG MODE </p>
                    <p> {codeSnippets[0][0]} {codeSnippets[0][2]} </p>
                </div> }

            <div className={`${styles.title} pb-10`}> Problem # {totalProblems + 1 - codeSnippets.length} </div>

            <form className={'sticky flex flex-auto flex-col max-h-full justify-around'}>
                <div className='flex flex-row items-center justify-around'>
                    <div className={`flex ${styles.code} `} ref={refContainer}/>
                    <Image className='flex flex-grow w-1/2 h-1/2  justify-center align-center' src={FilpFlop} alt={'diagram'} />
                </div>
                <Spacer y={50}/>
                <div className='flex flex-row gap-x-20 justify-center'>
                    <button className={`w-1/4 bg-blue-${isLoading.shade} hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-5`} type='submit' disabled={isLoading.waiting} onClick={handleSubmit}>{isLoading.button_text}</button>
                    {NextButton()}
                </div>
            </form>

            </div>
            <Spacer y={10}/>

            <Progress className={'sticky bottom-0'}  aria-label={'Progress'} color="primary" size="lg" value={((totalProblems + 1 - codeSnippets.length) / totalProblems ) * 100 }/>
            </React.Fragment>
    )
}

