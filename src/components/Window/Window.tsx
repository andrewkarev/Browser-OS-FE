import FolderNavigation from 'components/FolderNavigation';
import Item from 'components/Item/';
import TopBar from 'components/TopBar/';
import { contextMenuModel } from 'data/contextMenuModel';
import { useAppDispatch } from 'hooks/redux';
import { useContextMenu } from 'hooks/useContextMenu';
import React, { useEffect } from 'react';
import { setOpenedWindows, updateOpenedWindow } from 'store/reducers/desktopSlice';
import { setCurrentWindow } from 'store/reducers/windowSlice';
import { IWindow } from 'types/IWindow';
import styles from './Window.module.scss';

interface WindowProps {
  windowData: IWindow;
}

const Window: React.FC<WindowProps> = ({ windowData }) => {
  const dispatch = useAppDispatch();

  const { handleContextMenu } = useContextMenu();

  useEffect(() => {
    dispatch(setCurrentWindow(windowData));
  }, [dispatch, windowData]);

  const closeWindow = () => {
    dispatch(setOpenedWindows(windowData.id));
  };

  const changeWindowSize = () => {
    const updatedWindow = { ...windowData };
    updatedWindow.isWindowMaximized = !windowData.isWindowMaximized;

    dispatch(updateOpenedWindow(updatedWindow));
  };

  const items = windowData.items.map((item, i) => {
    return <Item item={item} windowData={windowData} key={`${item.name}-${i}`} />;
  });

  return (
    <div
      className={windowData.isWindowMaximized ? styles.windowMaximized : styles.window}
      onContextMenu={(e) => handleContextMenu(e, contextMenuModel.window, null, windowData)}
    >
      <TopBar
        title={windowData.folderTitle}
        closeWindow={closeWindow}
        changeWindowSize={changeWindowSize}
      >
        <FolderNavigation window={windowData} />
      </TopBar>
      <div className={styles.itemsContainer}>{items}</div>
    </div>
  );
};

export default Window;
