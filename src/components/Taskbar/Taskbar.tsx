import React from 'react';
import styles from './Taskbar.module.scss';
import CurrentDate from '../CurrentDate';
import { useAppSelector } from 'hooks/redux';
import { useContextMenu } from 'hooks/useContextMenu';
import { contextMenuModel } from 'data/contextMenuModel';

const Taskbar = () => {
  const openedWindows = useAppSelector((state) => state.desktop.openedWindows);

  const { handleContextMenu } = useContextMenu();

  const tabs = openedWindows.map(({ window }) => {
    return <div key={window.id}>{window.folderTitle}</div>;
  });

  return (
    <div
      className={styles.taskbar}
      onContextMenu={(e) => handleContextMenu(e, contextMenuModel.taskBar)}
    >
      <div className={styles.logo}>λ</div>
      <div className={styles.tabsContainer}>{tabs}</div>
      <CurrentDate />
    </div>
  );
};

export default Taskbar;
