const URL:string = `http://localhost:8080`
export interface IReceiveData {
    data:{
        path: string,
        files: string[],
        folders: string[]
    },
    code: number
}

export const getFilesResquest = async (_path: string) => {
    const formData = new FormData();
    formData.append('path', _path);
    const response = await fetch(`${URL}/get-items`, {  body: formData, method: "post" });
    const resJSON: IReceiveData = await response.json();    
    return resJSON
}

export const uploadFilesResquest = async (_path: string, file: File) => {
    const formData = new FormData()
    formData.append("upload", file);
    formData.append("path", _path);
    console.log(_path);
    
    const res = await fetch(`${URL}/save-file`, {  body: formData, method: "post" });
    const resJSON = await res.json()
    return resJSON
}

export const deleteFilesResquest = async (_path: string) => {
    const formData = new FormData();
    formData.append('path', _path);
    const response = await fetch(`${URL}/delete-item`, {  body: formData, method: "post" });
    const resJSON: IReceiveData = await response.json();    
    return resJSON
}

export const createFolderRequest = async (_path: string) => {
    const formData = new FormData();
    formData.append('path', _path);
    const response = await fetch(`${URL}/create-folder`, {  body: formData, method: "post" });
    const resJSON: IReceiveData = await response.json();    
    return resJSON
}

export const downloadFileRequest = async (_path: string) => {    
    const formData = new FormData();
    formData.append('path', _path);
    const response = await fetch(`${URL}/download`, {body: formData, method: "post" });
    const res = await response.blob();
    var url = window.URL.createObjectURL(res);
    var a = document.createElement('a');
    a.href = url;
    a.download = _path.substring(_path.lastIndexOf("/")+1);
    document.body.appendChild(a);
    a.click();    
    a.remove();
}

interface IRename{
    old:string,
    new:string
}

export const renameFolderRequest = async (_paths: IRename) => {    
    const formData = new FormData();
    formData.append('old', _paths.old);
    formData.append('new', _paths.new);
    const response = await fetch(`${URL}/rename-item`, {  body: formData, method: "post" });
    const resJSON: IReceiveData = await response.json();    
    return resJSON
}
