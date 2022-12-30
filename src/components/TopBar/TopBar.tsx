import React, { useState } from 'react';
import styles from './TopBar.module.scss';
import { VscDash, VscClose } from 'react-icons/vsc';
import { TbDotsDiagonal2 } from 'react-icons/tb';
import { useContextMenu } from 'hooks/useContextMenu';
import { contextMenuModel } from 'data/contextMenuModel';

interface TopBarProps {
  title: string;
  closeWindow: () => void;
  changeWindowSize: () => void;
  children?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ title, closeWindow, changeWindowSize, children }) => {
  const [isIconsVisible, setIsIconsVisible] = useState(false);

  const { handleContextMenu } = useContextMenu();

  const handleMouseOver = () => {
    setIsIconsVisible((prev) => !prev);
  };

  const handleDBClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      changeWindowSize();
    }
  };

  return (
    <div
      className={`${styles.topBar} drag`}
      onContextMenu={(e) => handleContextMenu(e, contextMenuModel.topBar, null)}
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
        <button className={styles.controlElement} type="button">
          <span className={`${styles.circle} ${styles.hide}`}>{isIconsVisible && <VscDash />}</span>
        </button>
        <button className={styles.controlElement} type="button" onClick={changeWindowSize}>
          <span className={`${styles.circle} ${styles.maximize}`}>
            {isIconsVisible && <TbDotsDiagonal2 />}
          </span>
        </button>
      </div>
      {children}
      <div className={styles.itemTitle} onDoubleClick={(e) => handleDBClick(e)}>
        {title}
      </div>
    </div>
  );
};

export default TopBar;
