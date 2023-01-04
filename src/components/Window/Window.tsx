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
import { getWindowClassName } from 'utils/getWindowClassName';
import ContextMenuOptions from 'common/contextMenuOptions';

interface WindowProps {
  windowData: IWindow;
}

const Window: React.FC<WindowProps> = ({ windowData }) => {
  const dispatch = useAppDispatch();
  const activeWindow = useAppSelector((state) => state.desktop.activeWindow);

  const { draggableTopLimit, draggableBottomLimit, nodeRef, handleDrag } = useDrag();

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

  const maximizeWindow = () => {
    dispatch(updateOpenedWindow({ id: windowData.id, operation: ContextMenuOptions.maximize }));
  };

  const minimizeWindow = () => {
    dispatch(updateOpenedWindow({ id: windowData.id, operation: ContextMenuOptions.minimize }));
  };

  const items = windowData.items.map((item, i) => {
    return <Item item={item} windowData={windowData} key={`${item.name}-${i}`} />;
  });

  return (
    <Draggable
      axis={windowData.isMaximized ? 'none' : 'both'}
      bounds={{ top: draggableTopLimit, bottom: draggableBottomLimit }}
      nodeRef={nodeRef}
      handle=".drag"
      onDrag={handleDrag}
    >
      <div
        className={styles[getWindowClassName(windowData.isMaximized, windowData.isMinimized)]}
        onContextMenu={(e) => handleContextMenu(e, contextMenuModel.window, null, windowData)}
        ref={nodeRef}
        onClick={handleWindowClick}
        style={activeWindow && activeWindow.id === windowData.id ? { zIndex: '3' } : undefined}
      >
        <TopBar
          item={windowData}
          closeWindow={closeWindow}
          maximizeWindow={maximizeWindow}
          minimizeWindow={minimizeWindow}
        >
          <FolderNavigation window={windowData} />
        </TopBar>
        <div className={styles.itemsContainer}>{items}</div>
      </div>
    </Draggable>
  );
};

export default Window;
