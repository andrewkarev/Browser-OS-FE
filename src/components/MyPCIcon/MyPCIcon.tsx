import React from 'react';
import styles from './MyPCIcon.module.scss';
import MY_PC_ICON from '../../assets/icons/my-pc.png';
import { useAppDispatch } from 'hooks/redux';
import { getItems } from 'store/reducers/thunks';
import { useContextMenu } from 'hooks/useContextMenu';
import { contextMenuModel } from 'data/contextMenuModel';

const MyPCIcon = () => {
  const dispatch = useAppDispatch();

  const { handleContextMenu } = useContextMenu();

  const handleIconClick = () => {
    dispatch(getItems(''));
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.content}
        onDoubleClick={handleIconClick}
        onContextMenu={(e) => handleContextMenu(e, contextMenuModel.myPC, null)}
      >
        <div className={styles.iconWrapper}>
          <img src={MY_PC_ICON} alt="My PC icon" />
        </div>
        <div className={styles.title}>My PC</div>
      </div>
    </div>
  );
};

export default MyPCIcon;
