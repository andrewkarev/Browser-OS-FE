import { contextMenuModel } from 'data/contextMenuModel';
import { useAppDispatch } from 'hooks/redux';
import { useContextMenu } from 'hooks/useContextMenu';
import React from 'react';
import { updateWindow } from 'store/reducers/thunks';
import { IDirItem } from 'types/IDirItem';
import { IDirectory } from 'types/IDirectory';
import { getItemIcon } from 'utils/getItemsIcon';
import DIRECTORY from '../../assets/icons/folder.png';
import styles from './Item.module.scss';

interface ItemProps {
  item: IDirItem;
  windowData: IDirectory;
}

const Item: React.FC<ItemProps> = ({ item, windowData }) => {
  const dispatch = useAppDispatch();

  const { handleContextMenu } = useContextMenu();

  const handleItemClick = (dirItem: IDirItem) => {
    if (dirItem.type === 'directory') {
      dispatch(
        updateWindow({ itemPath: dirItem.path, windowId: windowData.id, operation: 'updating' })
      );
    } else {
      console.log(dirItem.name);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.content}
        onDoubleClick={() => handleItemClick(item)}
        onContextMenu={(e) =>
          handleContextMenu(
            e,
            item.extension === null ? contextMenuModel.directory : contextMenuModel.file,
            {
              item,
              windowId: windowData.id,
            }
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
