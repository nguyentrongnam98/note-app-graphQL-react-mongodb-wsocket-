import React, { useEffect, useState } from 'react'
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { useLoaderData } from 'react-router-dom'
export default function Note() {
    const note = {
        id:1,
        content:'<p>Content note</p>'
    }
    const noteData = useLoaderData()
    console.log(noteData)
    const [editorState,setEditorState] = useState(() => EditorState.createEmpty())
    const [rawHtml,setRawHtml] = useState(note.content)
    const handleChange = (e) => {
      setEditorState(e)
      setRawHtml(draftToHtml(convertToRaw(e.getCurrentContent())))
    }
    useEffect(() => {
     setRawHtml(note.content)
    },[note.content])
    useEffect(() => {
        const blocksFromHtml = convertFromHTML(noteData.content)
        const state = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks,blocksFromHtml.entityMap)
        setEditorState(EditorState.createWithContent(state))
    },[note.id])
  return (
    <Editor editorState={editorState} onEditorStateChange={handleChange} placeholder="Write something"></Editor>
  )
}
