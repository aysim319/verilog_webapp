'use client'

import type React from 'react'
import { useEffect, useState, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { languages } from '@codemirror/language-data'
import { oneDark } from '@codemirror/theme-one-dark'
import { basicSetup } from 'codemirror'
import {verilog} from '@codemirror/legacy-modes/mode/verilog'
import {StreamLanguage} from "@codemirror/language"

interface Props {
    initialDoc: Props,
    onChange?: (state: EditorState) => void
}

//https://www.codiga.io/blog/revisiting-codemirror-6-react-implementation/

const useCodeMirror = <T extends Element>( props: Props): [React.MutableRefObject<T|null>, EditorView?] => {
    const refContainer = useRef<T>(null)
    const [editorView, setEditorView] = useState<EditorView>()
    const { onChange } = props
    useEffect(() => {
        if (!refContainer.current) return
        const startState = EditorState.create({
            doc: props.initialDoc,
            height: 500,
            extensions: [
                basicSetup,
                keymap.of(defaultKeymap),
                oneDark,
                
                EditorView.lineWrapping,
                StreamLanguage.define(verilog),
                EditorView.updateListener.of( update => {
                    if (update.changes) {
                        onChange && onChange(update.state)
                    }
                })
            ]
        })
        const view = new EditorView({
            state: startState,
            parent: refContainer.current
        })
        setEditorView(view)
        return () => {
            view.destroy()
            }
        }, [refContainer])
        return [refContainer, editorView]
    }
export default useCodeMirror