import { contextMenuModel } from 'data/contextMenuModel';
import { useAppDispatch } from 'hooks/redux';
import { useContextMenu } from 'hooks/useContextMenu';
import React from 'react';
import { updateWindow } from 'store/reducers/thunks';
import { IDirItem } from 'types/IDirItem';
import { getItemIcon } from 'utils/getItemsIcon';
import DIRECTORY from '../../assets/icons/folder.png';
import styles from './Item.module.scss';
import ItemType from 'common/itemType';
import WindowOperation from 'common/windowOperation';
import { getFileType } from 'utils/getFileType';
import FileType from 'common/fileType';
import { setIsWarningModalDisplayed, setSelectedFileName } from 'store/reducers/desktopSlice';
import { IWindow } from 'types/IWindow';

interface ItemProps {
  item: IDirItem;
  windowData: IWindow;
}

const Item: React.FC<ItemProps> = ({ item, windowData }) => {
  const dispatch = useAppDispatch();

  const { handleContextMenu } = useContextMenu();

  const handleItemClick = (dirItem: IDirItem) => {
    if (dirItem.type === ItemType.directory) {
      dispatch(
        updateWindow({
          itemPath: dirItem.path,
          windowId: windowData.id,
          operation: WindowOperation.update,
        })
      );
    } else {
      const fileType = getFileType(dirItem.extension ?? '');

      dispatch(setSelectedFileName(dirItem.name));

      switch (fileType) {
        case null:
          dispatch(setIsWarningModalDisplayed(true));
          break;
        case FileType.text:
          break;
        case FileType.image:
          break;
        case FileType.audio:
          break;
        case FileType.video:
          break;
        default:
          break;
      }
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
