import "./home.styles.css";

import NavbarPath from "@components/navbar-path/navbar-path.component";
import DragAndDrop from "@components/drag-and-drop/drag-and-drop.component";
import ContextMenu from "@components/contextMenu/contextMenu.component";
import { Modal } from "@components/modal/modal.component";

const HomePage = (): JSX.Element => {
  return (
    <div className={"home-container"}>
      <>
        {NavbarPath()}
        {DragAndDrop()}
        {ContextMenu()}
        {Modal()}
      </>
    </div>
  );
};

export default HomePage;
