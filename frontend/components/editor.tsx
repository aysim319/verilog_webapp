import React, { useCallback, useEffect } from 'react'
import { EditorState } from '@codemirror/state';
import useCodeMirror, {addLineHighlight, highlightSusLine, highlightSusLines, lineHighlightMark} from './use-codemirror'

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

//
//        const data = await res.json()
//        alert(data)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('handleSubmit')
        fetchData(event);
    }


    return (
        <form className='content-center align-center' onSubmit={handleSubmit}>
            <div className='h-full flex-grow-0 flex-shrink-0 justify-center py-5' ref={refContainer}/>
            <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-5' type='submit'>submit</button>
        </form>
    )
}

export default Editor