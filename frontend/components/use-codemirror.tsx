'use client'

import type React from 'react'
import { useEffect, useState, useRef } from 'react'
import { EditorState, StateEffect, StateField } from '@codemirror/state'
import { EditorView, Decoration, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { basicSetup } from 'codemirror'
import {verilog} from '@codemirror/legacy-modes/mode/verilog'
import {StreamLanguage} from "@codemirror/language"

interface Props {
    initialDoc: Props | String,
    onChange?: (state: EditorState) => void
}

// @ts-ignore
export const addLineHighlight = StateEffect.define();
export const lineHighlightMark = Decoration.line({
  attributes: {class: 'styled-background'},
});

// https://github.com/pamelafox/dis-this
const lineHighlightField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(lines, tr) {
    lines = lines.map(tr.changes);
    // clear existing highlights
    for (let e of tr.effects) {
        lines = Decoration.none;
    }

    for (let e of tr.effects) {
      if (e.is(addLineHighlight)) {
          // @ts-ignore
        lines = lines.update({add: [lineHighlightMark.range(e.value)]});
      }
    }
    return lines;
  },
  provide: (f) => EditorView.decorations.from(f),
});


export function highlightSusLines(view: EditorView, lines: [Number]) {
    let effect_list = lines.map(num =>
        // @ts-ignore
        addLineHighlight.of(view.state.doc.line(num).from))
    view.dispatch({effects: effect_list});
    return view
}

export function showNextCode(view: EditorView, doc: string){
    view.dispatch({changes: {from:0, to: view.state.doc.length, insert: doc}})
}


let prev_lineno = 0
//https://www.codiga.io/blog/revisiting-codemirror-6-react-implementation/
const useCodeMirror = <T extends Element>( props: Props): [React.MutableRefObject<T|null>, EditorView?] => {
    const refContainer = useRef<T>(null)
    const [editorView, setEditorView] = useState<EditorView>()
    const { onChange } = props
    const cssStyles = EditorView.theme({
        "&": { maxHeight: "70vh", minWidth: "100%", fontSize: "150%", border: "1px solid #000000"},
        ".cm-scroller": {overflow: "auto"},
        ".cm-selected": { backgroundColor: "#0000FF !important"},
        ".styled-background": { backgroundColor: "#FFFF00"}
    })


    useEffect(() => {
        if (!refContainer.current) return
        const startState = EditorState.create({
            // @ts-ignore
            doc: props.initialDoc,
            extensions: [
                basicSetup,
                keymap.of(defaultKeymap),
                EditorView.lineWrapping,
                cssStyles,
                lineHighlightField,
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

        /**
         * Make sure to destroy the codemirror instance
         * when our components are unmounted.
         */
        return () => {
            view.destroy()
            setEditorView(undefined);
            }
        }, [])
        return [refContainer, editorView]
    }
export default useCodeMirror