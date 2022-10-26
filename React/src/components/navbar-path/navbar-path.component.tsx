import "./navbar-path.styles.css";
import { pathSelector } from '@redux/selector'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { action_changeModal, action_changeStatePath } from "@redux/actions";
import { ModalType } from "@components/modal/modal.component";


const addFolder = (path:string,dispatch:any)=>{
  dispatch(action_changeModal({type:ModalType.CreateFolder, selectedItem:path}))
}

const goBack = (path:string, dispatch:any)=>{
  if(path !== "."){
    const _path = path.slice(0, -1)
    const last = _path.lastIndexOf("/")
    dispatch(action_changeStatePath(_path.substring(0,last)))
  }
}

const NavbarPath = (): JSX.Element => {
  const path = useAppSelector(pathSelector)
  const eachPath: string[] = path.split("\\")

  const dispatch = useAppDispatch()
  return (
    <div className={"section-container bg-slate-400"}>
      <div className={"mx-auto bg-slate-500 grid grid-cols-6 gap-4"}>
        <div className={"col-start-1 col-end-2 cursor-pointer"}>
          <div onClick={()=>goBack(path, dispatch)} className={"bg-violet-500 p-3"}>
            Back
          </div>
        </div>
        <div className={"col-start-2 col-span-4"}>
          {eachPath.map((_path, key)=>
              <p key={key} className={'text-xl text-left'}> {_path} </p>
          )}
        </div>
        <div className={"col-start-6 col-span-7 cursor-pointer"}>
          <div onClick={()=>addFolder(path, dispatch)} className={"bg-emerald-500 p-3"}>
            Add folder
          </div>
        </div>

      </div>
    </div>
  );
};

export default NavbarPath;