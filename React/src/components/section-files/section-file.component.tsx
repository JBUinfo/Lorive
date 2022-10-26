import "./section-file.styles.css";

import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { filesSelector, pathSelector } from '@redux/selector'
import { Card, FileType, IDataCard } from "@components/card/card.component"
import { action_changeConextMenu } from "@redux/actions";

const filterFiles = (files: string[]) => {
  const filtered = files.map((file)=>{
    const ext = file.substring(file.indexOf(".")+1)    
    switch (ext){
      case "jpg":
          return {title:file, type: FileType.Image}
      case "png":
        return {title:file, type: FileType.Image}
      case "txt":
          return {title:file, type: FileType.Text}
      case "pdf":
        return {title:file, type: FileType.Text}
      default:
          return {title:file, type: FileType.Unknow}
    }
  })
  return filtered
}



const folderClickHandler = (e:React.MouseEvent<HTMLElement>, folderPath:string , dispatch:any) => {
  e.preventDefault();
  dispatch(action_changeConextMenu({selectedItem:folderPath, x:e.pageX, y:e.pageY}))
  return false;
}

const SectionFile = (): JSX.Element => {
  const path: string = useAppSelector(pathSelector)
  const files: string[] = useAppSelector(filesSelector)
  const cards: IDataCard[] = filterFiles(files)
  const dispatch = useAppDispatch()
  return (
    <div className="p-3">
      <p className="text-xl text-left pb-5">Files</p>
      <div className={"grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8"}>
        {cards.map((card, key)=>(
          card && (
          <div
            key={key}
            onContextMenu={(e)=>folderClickHandler(e,`${path}/${card.title}`, dispatch)}>
              {Card(card)}
            </div>)
        ))}
      </div>
    </div>
  );
};

export default SectionFile;
