import { ModalType } from "@components/modal/modal.component"

export interface ISubModalType{
    type: ModalType,
    selectedItem: string
}

export interface IContextMenu {
    selectedItem: string,
    x:number,
    y:number
}

export interface IFilesAndFolders{
    files: string[],
    folders: string[]
}

export type Action = {type: string, payload: any}

export const action_changeStatePath = ( path: string ): Action => ({
    type:"CHANGE_PATH", payload: {path}
})

export const action_changeFilesAndFolders = ( _filesAndFolders: IFilesAndFolders ): Action => ({
    type:"CHANGE_FILES_AND_FOLDERS", payload: _filesAndFolders
})

export const action_addFiles = ( files: string[] ): Action => ({
    type:"ADD_FILES", payload: {files}
})

export const action_deleteFiles = ( files: string[] ): Action => ({
    type:"DELETE_FILES", payload: {files}
})

export const action_addFolders = ( folders: string[] ): Action => ({
    type:"ADD_FOLDERS", payload: folders
})

export const action_deleteFolders = ( folders: string[] ): Action => ({
    type:"DELETE_FOLDERS", payload: {folders}
})

export const action_changeConextMenu = ( contextMenu: IContextMenu ): Action => ({
    type:"CHANGE_CONTEXTMENU", payload: {...contextMenu, ...{show:true}}
})

export const action_showContextMenu = ( show: boolean ): Action => ({
    type:"SHOW_CONTEXTMENU", payload: {show}
})

export const action_changeModal = ( type: ISubModalType ): Action => ({
    type:"CHANGE_MODAL", payload: {...type, show:true}
})

export const action_showModal = ( show: boolean ): Action => ({
    type:"SHOW_MODAL", payload: {show}
})
