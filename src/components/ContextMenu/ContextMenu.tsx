import React, { useEffect, useRef } from 'react';
import { Coordinates } from 'types/Coordinates';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './ContextMenu.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IMenuItem } from 'types/IMenuItem';
import { deleteFile, getItems, removeFolder, updateWindow } from 'store/reducers/thunks';
import {
  setConfirmModalOperation,
  setIsConfirmFormOpened,
  setIsFullScreenMode,
} from 'store/reducers/desktopSlice';
import WindowOperation from 'common/windowOperation';
import ContextMenuOptions from 'common/contextMenuOptions';
import ContextMenuOptionsTitle from 'common/contextMenuOptionsTitle';

interface ContextMenuProps {
  coordinates: Coordinates;
  closeContextMenu: () => void;
  menuItems: IMenuItem[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({ coordinates, menuItems, closeContextMenu }) => {
  const dispatch = useAppDispatch();
  const selectedItem = useAppSelector((state) => state.contextMenu.selectedItem);
  const currentWindowId = useAppSelector((state) => state.contextMenu.currentWindowId);

  const contextMenu = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contextMenu.current) return;

    // const taskBarHeight = 28;

    // let coordinateX = coordinates?.x;
    // let coordinateY = coordinates?.y;

    // const desktopWidth = innerWidth;
    // const desktopHeight = innerHeight - taskBarHeight;
    // const contextMenuCoordinates = contextMenu.current?.getBoundingClientRect();

    // console.log(contextMenuCoordinates);
    // if (contextMenuCoordinates.bottom > desktopHeight) {
    //   coordinateY = contextMenuCoordinates.top - contextMenuCoordinates.height;
    // }

    // if (contextMenuCoordinates.right > desktopWidth) {
    //   coordinateX = contextMenuCoordinates.left - contextMenuCoordinates.width;
    // }

    const coordinateX = coordinates?.x;
    const coordinateY = coordinates?.y;

    contextMenu.current.style.top = `${coordinateY}px`;
    contextMenu.current.style.left = `${coordinateX}px`;
  }, [coordinates]);

  const getHandler = (menuItem: IMenuItem) => {
    switch (menuItem.option) {
      case ContextMenuOptions.openRootFolder:
        return () => {
          dispatch(getItems(''));
          closeContextMenu();
        };
      case ContextMenuOptions.renamePCIcon:
        return () => {
          dispatch(setConfirmModalOperation(ContextMenuOptions.renamePCIcon));
          dispatch(setIsConfirmFormOpened(true));
          closeContextMenu();
        };
      case ContextMenuOptions.openDirectory: {
        if (!selectedItem || !currentWindowId) return;
        return () => {
          dispatch(
            updateWindow({
              itemPath: selectedItem?.path,
              windowId: currentWindowId,
              operation: WindowOperation.update,
            })
          );
          closeContextMenu();
        };
      }
      case ContextMenuOptions.addFile:
        return () => {
          dispatch(setConfirmModalOperation(ContextMenuOptions.addFile));
          dispatch(setIsConfirmFormOpened(true));
          closeContextMenu();
        };
      case ContextMenuOptions.deleteFile: {
        if (!selectedItem || !currentWindowId) return;
        return () => {
          dispatch(deleteFile({ itemPath: selectedItem.path, windowId: currentWindowId }));
          closeContextMenu();
        };
      }
      case ContextMenuOptions.addFolder:
        return () => {
          dispatch(setConfirmModalOperation(ContextMenuOptions.addFolder));
          dispatch(setIsConfirmFormOpened(true));
          closeContextMenu();
        };
      case ContextMenuOptions.deleteDirectory:
        if (!currentWindowId || !selectedItem) return;
        return () => {
          dispatch(
            removeFolder({
              folderPath: selectedItem?.path,
              windowId: currentWindowId,
            })
          );
          closeContextMenu();
        };
      case ContextMenuOptions.rename:
        return () => {
          dispatch(setConfirmModalOperation(ContextMenuOptions.rename));
          dispatch(setIsConfirmFormOpened(true));
          closeContextMenu();
        };
      case ContextMenuOptions.enterFullScreen:
        return () => {
          document.body.requestFullscreen();
          dispatch(setIsFullScreenMode(true));
          closeContextMenu();
        };
      case ContextMenuOptions.exitFullScreen:
        return () => {
          document.exitFullscreen();
          dispatch(setIsFullScreenMode(false));
          closeContextMenu();
        };
      default:
        return () => {
          closeContextMenu();
        };
    }
  };

  const menuItemsElements = menuItems?.map(({ title, option }, i) => {
    if (title === ContextMenuOptionsTitle.separator) {
      return <hr key={`${title}-${i}`} className={styles.separator} />;
    } else {
      return (
        <div
          key={`${title}-${i}`}
          className={styles.menuitem}
          onClick={getHandler({ title, option })}
        >
          {title}
        </div>
      );
    }
  });

  return (
    <OutsideClickHandler onOutsideClick={closeContextMenu}>
      <div className={styles.menu} ref={contextMenu}>
        {menuItemsElements}
      </div>
    </OutsideClickHandler>
  );
};

export default ContextMenu;
