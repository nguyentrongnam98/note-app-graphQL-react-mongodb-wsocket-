import React, { useEffect, useMemo, useState } from 'react'
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { useLoaderData, useLocation, useSubmit } from 'react-router-dom'
import { debounce } from '@mui/material'
export default function Note() {
    const noteData = useLoaderData()
    const location = useLocation()
    const [editorState,setEditorState] = useState(() => EditorState.createEmpty())
    const [rawHtml,setRawHtml] = useState(noteData?.content)
    const submit = useSubmit()
    const handleChange = (e) => {
      setEditorState(e)
      setRawHtml(draftToHtml(convertToRaw(e.getCurrentContent())))
    }
    const debounceMemo = useMemo(() => {
       return debounce((rawHtml,noteData,pathname) => {
        if (rawHtml === noteData?.content) return;
        console.log(pathname,1998);
        submit({...noteData,content:rawHtml},{method:'post',action:pathname})
       },1000)
    },[])

    useEffect(() => {
      debounceMemo(rawHtml,noteData,location.pathname)
    },[rawHtml,location.pathname])

    useEffect(() => {
     setRawHtml(noteData?.content)
    },[noteData?.content])

    useEffect(() => {
        const blocksFromHtml = convertFromHTML(noteData?.content || " ")
        const state = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks,blocksFromHtml.entityMap)
        setEditorState(EditorState.createWithContent(state))
    },[noteData?.id])
  return (
    <Editor editorState={editorState} onEditorStateChange={handleChange} placeholder="Write something"></Editor>
  )
}
