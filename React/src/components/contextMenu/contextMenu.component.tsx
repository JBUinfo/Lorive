import "./contextMenu.styles.css";

import { deleteFilesResquest, downloadFileRequest } from "@assets/utils";
import { IContextMenu } from '@redux/reducer'
import { action_deleteFolders, action_deleteFiles, action_showContextMenu, action_changeModal } from "@redux/actions";
import { contextMenuSelector, filesSelector, foldersSelector } from '@redux/selector'
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { ModalType } from "@components/modal/modal.component"

const clickRename = (selectedItem:string, dispatch: any) => {
  dispatch(action_changeModal({type:ModalType.Rename, selectedItem}))
}

const clickDelete = async (selectedItem:string, folders: string[], files: string[], dispatch:any) => {
  const res = await deleteFilesResquest(selectedItem)
  if(res.code === 200){
    const last = selectedItem.lastIndexOf("/")+1
    selectedItem = selectedItem.substring(last)    
    if(-1 !== folders.lastIndexOf(selectedItem)){
      const _folders = [...folders]
      _folders.splice(_folders.lastIndexOf(selectedItem), 1)
      dispatch(action_deleteFolders(_folders))
    } else {
      const _files = [...files]
      _files.splice(_files.lastIndexOf(selectedItem), 1)
      dispatch(action_deleteFiles(_files))
    }
    dispatch(action_showContextMenu(false))
  } else {
    console.log(`error deleting ${res}`);
  }
}

const clickDownload = async (selectedItem:string)=>{
  await downloadFileRequest(selectedItem)
}

const ContextMenu = (): JSX.Element => {
  const contextMenu: IContextMenu = useAppSelector(contextMenuSelector)
  const folders: string[] = useAppSelector(foldersSelector)
  const files: string[] = useAppSelector(filesSelector)
  const dispatch = useAppDispatch()
  const style = {top:contextMenu.y, left:contextMenu.x}  
  return (
    <>
      {contextMenu.show && (
            <div style={style} className="absolute rounded bg-slate-900 text-white w-40 grid grid-rows-2">
              <div
                onClick={()=>clickRename(contextMenu.selectedItem, dispatch)}
                className="hover:bg-sky-700 p-2 cursor-pointer">Rename</div>
              <div
                onClick={()=>clickDelete(contextMenu.selectedItem, folders, files, dispatch)}
                className="hover:bg-sky-700 p-2 cursor-pointer">Delete</div>
              <div
                onClick={()=>clickDownload(contextMenu.selectedItem)}
                className="hover:bg-sky-700 p-2 cursor-pointer">Download</div>
            </div>
      )}
    </>
  );
};

export default ContextMenu;
