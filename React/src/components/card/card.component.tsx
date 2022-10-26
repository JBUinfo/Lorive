import "./card.styles.css";

import TextSVG from "./imgs/Text.svg";
import ImageSVG from "./imgs/Image.svg";
import Unknown from "./imgs/Unknown.svg";
import FolderSVG from "./imgs/Folder.svg";

export enum FileType{
  Text,
  Image,
  Folder,
  Unknow
}
export interface IDataCard {
  title: string
  type: FileType
}
const selectSVG = (data: FileType) => {  
  switch(data){
    case FileType.Text:
      return TextSVG
    case FileType.Image:
      return ImageSVG
    case FileType.Folder:
      return FolderSVG
    default:
      return Unknown
  }
}


export const Card = (data: IDataCard): JSX.Element => {
  
  return (
    <div className="grid rounded-lg border-2 aspect-square grid-rows-3">
      <div className="row-span-2 bg-white overflow-hidden">
          <img src={selectSVG(data.type)} alt={"Is a "+data.type}/>
      </div>
      <div className="row-span-1 rounded-b-md bg-slate-500 break-all min-h-fit h-full">
          <p>{data.title}</p>
      </div>
    </div>

  );
};

