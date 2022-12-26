import React, { useEffect, useRef } from 'react';
import { Coordinates } from 'types/Coordinates';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './ContextMenu.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IMenuItem } from 'types/IMenuItem';
import {
  addFile,
  addFolder,
  deleteFile,
  getItems,
  removeFolder,
  updateWindow,
} from 'store/reducers/thunks';
import { setIsContextMenuOpened } from 'store/reducers/contextMenuSlice';
import { getCurrentWindowPath } from 'utils/getCurrentWindowPath';

interface ContextMenuProps {
  coordinates: Coordinates;
  closeContextMenu: () => void;
  menuItems: IMenuItem[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({ coordinates, menuItems, closeContextMenu }) => {
  const contextMenu = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

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

  const selectedItem = useAppSelector((state) => state.contextMenu.selectedItem);
  const currentWindowId = useAppSelector((state) => state.contextMenu.currentWindowId);
  const openedWindows = useAppSelector((state) => state.desktop.openedWindows);

  const getHandler = (menuItem: IMenuItem) => {
    switch (menuItem.option) {
      case 'open root folder':
        return () => {
          dispatch(getItems(''));
          dispatch(setIsContextMenuOpened(false));
        };
      case 'open directory': {
        if (!selectedItem || !currentWindowId) return;
        return () => {
          dispatch(
            updateWindow({
              itemPath: selectedItem?.path,
              windowId: currentWindowId,
              operation: 'updating',
            })
          );
          closeContextMenu();
        };
      }
      case 'add file':
        if (!currentWindowId) return;
        return () => {
          dispatch(
            addFile({
              windowPath: getCurrentWindowPath(currentWindowId, openedWindows),
              windowId: currentWindowId,
            })
          );
          closeContextMenu();
        };
      case 'delete file': {
        if (!selectedItem || !currentWindowId) return;
        return () => {
          dispatch(deleteFile({ itemPath: selectedItem.path, windowId: currentWindowId }));
          closeContextMenu();
        };
      }
      case 'add folder':
        if (!currentWindowId) return;
        return () => {
          dispatch(
            addFolder({
              windowPath: getCurrentWindowPath(currentWindowId, openedWindows),
              windowId: currentWindowId,
            })
          );
          closeContextMenu();
        };
      case 'delete directory':
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
      default:
        return () => {
          closeContextMenu();
        };
    }
  };

  const menuItemsElements = menuItems?.map(({ title, option }, i) => {
    if (title === 'separator') {
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
