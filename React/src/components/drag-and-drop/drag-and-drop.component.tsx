import "./drag-and-drop.styles.css";

import { getFilesResquest, uploadFilesResquest } from "@assets/utils"
import { pathSelector } from '@redux/selector'
import { action_changeFilesAndFolders, action_showContextMenu } from '@redux/actions'
import { useState, useEffect, DragEvent } from 'react'
import { useAppSelector, useAppDispatch } from '@redux/hooks'

import SectionFile from "@components/section-files/section-file.component"
import SectionFolder from "@components/section-folder/section-folder.component"

const DragAndDrop = (): JSX.Element => {
  const path = useAppSelector(pathSelector)
  const [dragging, setDragging] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  useEffect(() => {
    (async () => {
      const newData = await getFilesResquest(path)
      if(newData.code === 200){
        await dispatch(action_changeFilesAndFolders({files:newData.data.files, folders:newData.data.folders}))
      } else {
        console.log(`error getFiles ${newData}`)
      }
    })() 
  },[dispatch, path]);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDragIn = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if(!dragging){
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setDragging(true)
      }
    }
  }
  const handleDragOut = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
  }
  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    files.forEach(async(file)=>{
      const resJSON = await uploadFilesResquest(file)
      if(200 === resJSON.code){
        const newData = await getFilesResquest(path)
        if(newData.code === 200){
          await dispatch(action_changeFilesAndFolders({files:newData.data.files, folders:newData.data.folders}))
        } else {
          console.log(`error getFiles ${newData}`)
        }
      }
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(action_showContextMenu(false))
  }

  return (
    <div className={"section-container bg-slate-400"}
    onDragOver={handleDrag}
    onDragEnter={handleDragIn}
    onDragLeave={handleDragOut}
    onDrop={handleDrop}
    onClick={handleClick}
    >
      <div className={"container mx-auto grid grid-rows-2 p-8 gap-2 h-screen"}>
        {SectionFolder()}
        {SectionFile()}
      </div>
    </div>
  );
};

export default DragAndDrop;
