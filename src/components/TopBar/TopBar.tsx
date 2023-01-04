import React, { useState } from 'react';
import styles from './TopBar.module.scss';
import { VscDash, VscClose } from 'react-icons/vsc';
import { TbDotsDiagonal2 } from 'react-icons/tb';
import { useContextMenu } from 'hooks/useContextMenu';
import { contextMenuModel } from 'data/contextMenuModel';
import { IWindow } from 'types/IWindow';
import { IMediaFile } from 'types/IMediaFile';
import { useAppDispatch } from 'hooks/redux';
import { setActiveWindow } from 'store/reducers/desktopSlice';
import { getTopBarTitle } from 'utils/getTopBarTitle';

interface TopBarProps {
  item: IWindow | IMediaFile;
  closeWindow: () => void;
  maximizeWindow: () => void;
  minimizeWindow: () => void;
  children?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({
  item,
  closeWindow,
  maximizeWindow,
  minimizeWindow,
  children,
}) => {
  const dispatch = useAppDispatch();

  const [isIconsVisible, setIsIconsVisible] = useState(false);

  const { handleContextMenu } = useContextMenu();

  const handleMouseOver = () => {
    setIsIconsVisible((prev) => !prev);
  };

  const handleDBClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      maximizeWindow();
    }
  };

  const handleContextMenuClick = (e: React.MouseEvent) => {
    dispatch(setActiveWindow(item));
    handleContextMenu(e, contextMenuModel.topBar, null);
  };

  return (
    <div
      className={`${styles.topBar} drag`}
      onContextMenu={(e) => handleContextMenuClick(e)}
      onDoubleClick={(e) => handleDBClick(e)}
    >
      <div
        className={styles.buttonsContainer}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOver}
      >
        <button className={styles.controlElement} onClick={closeWindow} type="button">
          <span className={`${styles.circle} ${styles.close}`}>
            {isIconsVisible && <VscClose />}
          </span>
        </button>
        <button className={styles.controlElement} type="button" onClick={minimizeWindow}>
          <span className={`${styles.circle} ${styles.hide}`}>{isIconsVisible && <VscDash />}</span>
        </button>
        <button className={styles.controlElement} type="button" onClick={maximizeWindow}>
          <span className={`${styles.circle} ${styles.maximize}`}>
            {isIconsVisible && <TbDotsDiagonal2 />}
          </span>
        </button>
      </div>
      {children}
      <div className={styles.itemTitle} onDoubleClick={(e) => handleDBClick(e)}>
        {getTopBarTitle(item)}
      </div>
    </div>
  );
};

export default TopBar;
