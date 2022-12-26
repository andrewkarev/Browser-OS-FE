import Item from 'components/Item/';
import TopBar from 'components/TopBar/';
import { contextMenuModel } from 'data/contextMenuModel';
import { useContextMenu } from 'hooks/useContextMenu';
import React from 'react';
import { IDirectory } from 'types/IDirectory';
import styles from './Window.module.scss';

interface WindowProps {
  windowData: IDirectory;
}

const Window: React.FC<WindowProps> = ({ windowData }) => {
  const { handleContextMenu } = useContextMenu();

  const items = windowData.items.map((item, i) => {
    return <Item item={item} windowData={windowData} key={`${item.name}-${i}`} />;
  });

  return (
    <div
      className={styles.window}
      onContextMenu={(e) => handleContextMenu(e, contextMenuModel.window)}
    >
      <TopBar id={windowData.id} folderTitle={windowData.folderTitle} />
      <div className={styles.itemsContainer}>{items}</div>
    </div>
  );
};

export default Window;
