import { contextMenuModel } from 'data/contextMenuModel';
import { useContextMenu } from 'hooks/useContextMenu';
import React from 'react';
import { IDirItem } from 'types/IDirItem';
import { getItemIcon } from 'utils/getItemsIcon';
import DIRECTORY from '../../assets/icons/folder.png';
import styles from './Item.module.scss';
import { IWindow } from 'types/IWindow';
import { useOpenOperation } from 'hooks/useOpenOperation';

interface ItemProps {
  item: IDirItem;
  windowData: IWindow;
}

const Item: React.FC<ItemProps> = ({ item, windowData }) => {
  const { handleContextMenu } = useContextMenu();
  const { handleOpenOperation } = useOpenOperation();

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.content}
        onDoubleClick={() => handleOpenOperation(item, windowData.id)}
        onContextMenu={(e) =>
          handleContextMenu(
            e,
            item.extension === null ? contextMenuModel.directory : contextMenuModel.file,
            item,
            windowData
          )
        }
      >
        <div className={styles.iconWrapper}>
          <img
            src={item.extension === null ? DIRECTORY : getItemIcon(item.extension)}
            alt="Element image"
          />
        </div>
        <div className={styles.title}>{item.name}</div>
      </div>
    </div>
  );
};

export default Item;
