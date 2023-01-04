import React from 'react';
import styles from './TaskBarItem.module.scss';
import ITaskBarItem from 'types/ITaskBarItem';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  setActiveWindow,
  updateOpenedPlayers,
  updateOpenedWindow,
} from 'store/reducers/desktopSlice';
import { useContextMenu } from 'hooks/useContextMenu';
import { contextMenuModel } from 'data/contextMenuModel';
import ContextMenuOptions from 'common/contextMenuOptions';
import { IWindow } from 'types/IWindow';
import { IMediaFile } from 'types/IMediaFile';

interface TaskBarItemProps {
  item: ITaskBarItem;
}

const TaskBarItem: React.FC<TaskBarItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const activeWindow = useAppSelector((state) => state.desktop.activeWindow);
  const openedWindows = useAppSelector((state) => state.desktop.openedWindows);
  const openedPlayers = useAppSelector((state) => state.desktop.openedPlayers);

  const { handleContextMenu } = useContextMenu();

  const getActiveWindow = () => {
    return [...openedWindows, ...openedPlayers].find((openedItem) => openedItem.id === item.id);
  };

  const changeWindowVisibility = (window: IWindow | IMediaFile) => {
    'history' in window
      ? dispatch(updateOpenedWindow({ id: window.id, operation: ContextMenuOptions.minimize }))
      : dispatch(updateOpenedPlayers({ id: window.id, operation: ContextMenuOptions.minimize }));
  };

  const handleClick = () => {
    const isNonActiveWindow = activeWindow?.id !== item.id;
    const activeItem = getActiveWindow();

    if (!activeItem) return;

    if (isNonActiveWindow && item.isMinimized) {
      dispatch(setActiveWindow(activeItem));
      changeWindowVisibility(activeItem);
    } else if (isNonActiveWindow) {
      dispatch(setActiveWindow(activeItem));
    } else {
      changeWindowVisibility(activeItem);
    }
  };

  const handleContextMenuClick = (e: React.MouseEvent) => {
    const activeItem = getActiveWindow();

    if (activeItem) dispatch(setActiveWindow(activeItem));

    handleContextMenu(e, contextMenuModel.topBar, null);
  };

  return (
    <div
      className={`${styles.taskBarItem} ${activeWindow?.id === item.id ? styles.active : ''}`}
      onClick={handleClick}
      onContextMenu={(e) => handleContextMenuClick(e)}
    >
      {item.title}
    </div>
  );
};

export default TaskBarItem;
