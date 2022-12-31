import React from 'react';
import styles from './TaskBarItem.module.scss';
import ITaskBarItem from 'types/ITaskBarItem';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setActiveWindow } from 'store/reducers/desktopSlice';
import { useContextMenu } from 'hooks/useContextMenu';
import { contextMenuModel } from 'data/contextMenuModel';

interface TaskBarItemProps {
  item: ITaskBarItem;
}

const TaskBarItem: React.FC<TaskBarItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const activeWindow = useAppSelector((state) => state.desktop.activeWindow);
  const openedWindows = useAppSelector((state) => state.desktop.openedWindows);
  const openedPlayers = useAppSelector((state) => state.desktop.openedPlayers);

  const { handleContextMenu } = useContextMenu();

  const handleClick = () => {
    const activeItem = [...openedWindows, ...openedPlayers].find(
      (openedItem) => openedItem.id === item.id
    );

    activeItem && dispatch(setActiveWindow(activeItem));
  };

  return (
    <div
      className={`${styles.taskBarItem} ${activeWindow?.id === item.id ? styles.active : ''}`}
      onClick={handleClick}
      onContextMenu={(e) => handleContextMenu(e, contextMenuModel.topBar, null)}
    >
      {item.title}
    </div>
  );
};

export default TaskBarItem;
