import React from 'react';
import styles from './Taskbar.module.scss';
import CurrentDate from '../CurrentDate';
import { useAppSelector } from 'hooks/redux';
import { useContextMenu } from 'hooks/useContextMenu';
import { contextMenuModel } from 'data/contextMenuModel';

const Taskbar = () => {
  const taskBarItems = useAppSelector((state) => state.desktop.taskBarItems);
  const isFullScreenMode = useAppSelector((state) => state.desktop.isFullScreenMode);

  const { handleContextMenu } = useContextMenu();

  const tabs = taskBarItems.map((item) => {
    return <div key={item.id}>{item.title}</div>;
  });

  return (
    <div
      className={styles.taskbar}
      onContextMenu={(e) =>
        handleContextMenu(
          e,
          isFullScreenMode ? contextMenuModel.taskBarFullScreen : contextMenuModel.taskBar,
          null
        )
      }
    >
      <div className={styles.logo}>λ</div>
      <div className={styles.tabsContainer}>{tabs}</div>
      <CurrentDate />
    </div>
  );
};

export default Taskbar;
