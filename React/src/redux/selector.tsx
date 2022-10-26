import type { RootState } from './store'

export const stateSelector = (state: RootState) => state

export const pathSelector = (state: RootState) => state.path
export const filesSelector = (state: RootState) => state.files
export const foldersSelector = (state: RootState) => state.folders

export const contextMenuSelector = (state: RootState) => state.contextMenu

export const contextModalSelector = (state: RootState) => state.modal