import React, { useCallback, useEffect } from 'react'
import { EditorState } from '@codemirror/state'
import useCodeMirror from './use-codemirror'

interface Props {
    initialDoc:string,
    onChange: (doc:string) => void
}

const Editor: React.FC<Props> = (props) => {
    const { onChange, initialDoc } = props
    const handleChange = useCallback(
        (state: EditorState) => onChange(state.doc.toString()),
        [onChange]
    )

    const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
        initialDoc: initialDoc,
        onChange: handleChange
    })

    const fetchData = async () => {
        console.log('running fetchData')
        console.log(editorView.state.doc.toString())
//        const res = await fetch(`${process.env.BACKEND_URL}/api/submit/`, {
//            method: 'POST',
//            cache: 'no-store',
//            headers: {
//                'Content-Type': 'application/json',
//            },
//            body: JSON.stringify({
//                'code_snippet': body
//            })
//        })
//
//        const data = await res.json()
//        alert(data)
        editorView.markText({line:5})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('handleSubmit')
        console.log(event)
        fetchData(event);
    }


    return (
        <form className='content-center' onSubmit={handleSubmit}>
            <div className='h-full flex-grow-0 flex-shrink-0 justify-center' ref={refContainer}/>
            <button type='submit'>submit</button>
        </form>
    )
}

export default Editor