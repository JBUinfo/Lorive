import "./section-folder.styles.css";

import { action_changeStatePath, action_changeConextMenu } from '@redux/actions'
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { foldersSelector, pathSelector } from '@redux/selector'
import { Card, FileType, IDataCard} from "@components/card/card.component"

const folderDoubleClickHandler = (data:IDataCard, path:string, dispatch:any) => {  
  if(FileType.Folder === data.type){
    dispatch(action_changeStatePath(path+"/"+data.title+"/"))
  }
}
const folderClickHandler = (e:React.MouseEvent<HTMLElement>, folderPath:string , dispatch:any) => {
  e.preventDefault();
  dispatch(action_changeConextMenu({selectedItem:folderPath, x:e.pageX, y:e.pageY}))
  return false;
}

const handleClick = (e:React.MouseEvent<HTMLElement>, card:IDataCard, path:string, dispatch:any) => {
  if (e.detail >= 2) folderDoubleClickHandler(card, path, dispatch);
}

const SectionFolder = (): JSX.Element => {
  const path: string = useAppSelector(pathSelector)
  const folders: string[] = useAppSelector(foldersSelector)
  const filteredCards: string[] = folders.filter((folder)=>folder!==".")
  const cards: ({ title: string; type: FileType.Folder; } | undefined)[] = filteredCards.map(
    (folder)=>({title:folder, type: FileType.Folder})
  )
  const dispatch = useAppDispatch()
  return (
    <div className="p-3">
        <p className="text-xl text-left pb-5">Folders</p>
        <div className={"grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8"}>
            {cards.map((card, key)=>(
              card &&
              (<div
                key={key}
                onContextMenu={(e)=>folderClickHandler(e,`${path}/${card.title}`,dispatch)}
                onClick={(e)=>handleClick(e,card, path, dispatch)}>
                  {Card(card)}
              </div>)
            ))}
        </div>
    </div>
  );
};

export default SectionFolder;
