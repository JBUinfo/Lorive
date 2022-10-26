import { Action } from "./actions"
import { ModalType } from "@components/modal/modal.component"

export interface IModal {
    show: boolean,
    type: ModalType,
    selectedItem: string
}

export interface IContextMenu {
    show: boolean,
    selectedItem: string,
    x: number,
    y: number
}

export interface IState {
    path: string,
    files: string[],
    folders: string[],
    contextMenu: IContextMenu,
    modal: IModal
}

export const initialState = {
    path: ".",
    files: [],
    folders: [],
    contextMenu: {
        show:false,
        selectedItem:"",
        x:0,
        y:0
    },
    modal: {
        type: ModalType.CreateFolder,
        selectedItem: "",
        show:false
    }
}

export const reducer = (state: IState = initialState, action: Action): IState => {
    console.log("reducer", state, action);
    switch (action.type){
        case "CHANGE_PATH": return {...state, ...action.payload}
        case "DELETE_FILES": return {...state, ...action.payload}
        case "DELETE_FOLDERS": return {...state, ...action.payload}
        case "ADD_FILES": return {...state, ...{files:action.payload}}
        case "ADD_FOLDERS": return {...state, ...{folders:[...state.folders, ...action.payload]}}
        case "CHANGE_FILES_AND_FOLDERS": return {...state, ...action.payload}

        case "SHOW_CONTEXTMENU": return {...state, ...{contextMenu:action.payload}}
        case "CHANGE_CONTEXTMENU": return {...state, ...{contextMenu:action.payload}}
        case "CHANGE_FOLDER_CONTEXTMENU": return {...state, ...{contextMenu:action.payload}}

        case "CHANGE_MODAL": return {...state, ...{modal:action.payload}}
        case "SHOW_MODAL": return {...state, ...{modal:action.payload}}
        
        default: return state
    }
}
