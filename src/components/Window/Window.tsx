import Item from 'components/Item/';
import TopBar from 'components/TopBar/';
import { contextMenuModel } from 'data/contextMenuModel';
import { useAppSelector } from 'hooks/redux';
import { useContextMenu } from 'hooks/useContextMenu';
import React from 'react';
import { IWindow } from 'types/IWindow';
import styles from './Window.module.scss';

interface WindowProps {
  windowData: IWindow;
}

const Window: React.FC<WindowProps> = ({ windowData }) => {
  const { handleContextMenu } = useContextMenu();
  const isWindowMaximized = useAppSelector((state) => state.desktop.isWindowMaximized);

  const items = windowData.items.map((item, i) => {
    return <Item item={item} windowData={windowData} key={`${item.name}-${i}`} />;
  });

  return (
    <div
      className={isWindowMaximized ? styles.windowMaximized : styles.window}
      onContextMenu={(e) => handleContextMenu(e, contextMenuModel.window, null, windowData.id)}
    >
      <TopBar id={windowData.id} folderTitle={windowData.folderTitle} />
      <div className={styles.itemsContainer}>{items}</div>
    </div>
  );
};

export default Window;
