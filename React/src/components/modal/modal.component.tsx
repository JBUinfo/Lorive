import { createFolderRequest, renameFolderRequest } from "@assets/utils";
import { action_addFolders, action_showModal } from "@redux/actions";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { IModal } from "@redux/reducer";
import { contextModalSelector } from "@redux/selector";
import { useState } from "react";
import "./modal.styles.css";

export enum ModalType{
  Rename,
  CreateFolder
}

const createFolder = async (selectedItem:string, newName:string, dispatch:any)=> {
  //selectedItem === actualPath
  const path = "." === selectedItem ? selectedItem+"/" : selectedItem
  const res = await createFolderRequest(path.substring(2)+newName)
  if(200 === res.code){
    dispatch(action_showModal(false))
    dispatch(action_addFolders([newName]))
  } else {
    console.log(`error creating folder ${res}`);
  }
}

const renameFunct = async (selectedItem:string, newName:string, dispatch:any)=> {
  const newPath = selectedItem.substring(0,selectedItem.lastIndexOf("/")+1)+newName
  const res = await renameFolderRequest({old:selectedItem, new:newPath})
  if(200 === res.code){
    dispatch(action_showModal(false))
  } else {
    console.log(`error renaming ${res}`);
  }
}

const chooseModal = (type:ModalType, selectedItem:string, newName:string, dispatch:any):[string, ()=>void] => {
  switch(type){
    case ModalType.Rename: return ["Rename", ()=>renameFunct(selectedItem, newName, dispatch)]
    case ModalType.CreateFolder: return ["Create folder", ()=>createFolder(selectedItem, newName, dispatch)]
    default: return ["", ()=>{}]
  }
}

const closeModal = (dispatch:any)=>{
  dispatch(action_showModal(false))
}

export const Modal = (): JSX.Element => {
  const [newName, setNewName] = useState("")
  const modal: IModal = useAppSelector(contextModalSelector)
  const dispatch = useAppDispatch()

  const [title, func] = chooseModal(modal.type, modal.selectedItem, newName, dispatch)
  return (
    <>
      {modal.show && (
        <div style={{"top": "0px"}} className={"grid absolute place-items-center w-screen h-screen"}>
            <div className="rounded bg-slate-900 text-white w-96 grid grid-rows-4 grid-flow-col gap-4 p-3">
              <div className={"row-start-1 row-end-2"}>{title}</div>
              <div className={"row-start-2 row-end-4"}>
                <input
                  className={"text-black"}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  type={"text"}/>
              </div>
              <div className={"row-start-4 row-end-5 flex"}>
                <div onClick={()=>closeModal(dispatch)} className={"hover:bg-red-700 p-2 rounded cursor-pointer inline-block align-middle w-1/2"}>
                  Close
                </div>
                <div onClick={func} className={"hover:bg-emerald-700 rounded p-2 cursor-pointer inline-block align-middle w-1/2"}>
                  Confirm
                </div>
              </div>
            </div>
        </div>
      )}
    </>
  );
};

