import FolderNavigation from 'components/FolderNavigation';
import Item from 'components/Item/';
import TopBar from 'components/TopBar/';
import { contextMenuModel } from 'data/contextMenuModel';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useContextMenu } from 'hooks/useContextMenu';
import React, { useCallback, useEffect } from 'react';
import { setActiveWindow, setOpenedWindows, updateOpenedWindow } from 'store/reducers/desktopSlice';
import { setCurrentWindow } from 'store/reducers/windowSlice';
import { IWindow } from 'types/IWindow';
import styles from './Window.module.scss';
import Draggable from 'react-draggable';
import { useDrag } from 'hooks/useDrag';

interface WindowProps {
  windowData: IWindow;
}

const Window: React.FC<WindowProps> = ({ windowData }) => {
  const dispatch = useAppDispatch();
  const activeWindow = useAppSelector((state) => state.desktop.activeWindow);

  const { draggableTopLimit, nodeRef, handleDrag } = useDrag();

  const { handleContextMenu } = useContextMenu();

  const handleWindowClick = useCallback(() => {
    dispatch(setCurrentWindow(windowData));
    dispatch(setActiveWindow(windowData));
  }, [dispatch, windowData]);

  useEffect(() => {
    handleWindowClick();
  }, [handleWindowClick]);

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
    <Draggable
      axis={windowData.isWindowMaximized ? 'none' : 'both'}
      bounds={{ top: draggableTopLimit }}
      nodeRef={nodeRef}
      handle=".drag"
      onDrag={handleDrag}
    >
      <div
        className={windowData.isWindowMaximized ? styles.windowMaximized : styles.window}
        onContextMenu={(e) => handleContextMenu(e, contextMenuModel.window, null, windowData)}
        ref={nodeRef}
        onClick={handleWindowClick}
        style={activeWindow && activeWindow.id === windowData.id ? { zIndex: '3' } : undefined}
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
    </Draggable>
  );
};

export default Window;
