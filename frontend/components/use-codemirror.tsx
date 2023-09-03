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
  attributes: {style: 'background-color: yellow'},
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
        lines = lines.update({add: [lineHighlightMark.range(e.value)]});
      }
    }
    return lines;
  },
  provide: (f) => EditorView.decorations.from(f),
});


export function highlightSusLines(view: EditorView, lines: [Number]) {
    let effect_list = lines.map(num =>
        addLineHighlight.of(view.state.doc.line(num).from))
    view.dispatch({effects: effect_list});
    return view
}

let prev_lineno = 0
//https://www.codiga.io/blog/revisiting-codemirror-6-react-implementation/
const useCodeMirror = <T extends Element>( props: Props): [React.MutableRefObject<T|null>, EditorView?] => {
    const refContainer = useRef<T>(null)
    const [editorView, setEditorView] = useState<EditorView>()
    const { onChange } = props
    useEffect(() => {
        if (!refContainer.current) return
        const startState = EditorState.create({
            doc: props.initialDoc,
            extensions: [
                basicSetup,
                keymap.of(defaultKeymap),
                EditorView.updateListener.of(function (e) {
                    if (prev_lineno != e.state.doc.lineAt(e.state.selection.main.head).from && e.docChanged){
                        prev_lineno = e.state.doc.lineAt(e.state.selection.main.head).from
                        console.log(e.state.doc.toString())
                    }
                    if (e.focusChanged){
                        console.log("hover")
                    }
                }),
                EditorView.lineWrapping,
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
        return () => {
            view.destroy()
            }
        }, [refContainer])
        return [refContainer, editorView]
    }
export default useCodeMirror