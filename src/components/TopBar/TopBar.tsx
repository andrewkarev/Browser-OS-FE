import React, { useState } from 'react';
import styles from './TopBar.module.scss';
import { VscDash, VscClose } from 'react-icons/vsc';
import { TbDotsDiagonal2 } from 'react-icons/tb';
import { useAppDispatch } from 'hooks/redux';
import { setOpenedWindows, updateOpenedWindow } from 'store/reducers/desktopSlice';
import { IWindow } from 'types/IWindow';
import { updateWindow } from 'store/reducers/thunks';
import { useContextMenu } from 'hooks/useContextMenu';
import { contextMenuModel } from 'data/contextMenuModel';
import WindowOperation from 'common/windowOperation';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';

interface TopBarProps {
  window: IWindow;
}

const TopBar: React.FC<TopBarProps> = ({ window }) => {
  const dispatch = useAppDispatch();

  const [isIconsVisible, setIsIconsVisible] = useState(false);

  const { handleContextMenu } = useContextMenu();

  const handleMouseOver = () => {
    setIsIconsVisible((prev) => !prev);
  };

  const closeWindow = () => {
    dispatch(setOpenedWindows(window.id));
  };

  const handleBackwardBtnClick = () => {
    if (!window) return;

    const currentPathIdx = window.history.indexOf(window.currentPath);
    const previousPath = currentPathIdx ? window.history[currentPathIdx - 1] : '';

    dispatch(
      updateWindow({
        itemPath: previousPath,
        windowId: window.id,
        operation: WindowOperation.move,
      })
    );
  };

  const handleForwardBtnClick = () => {
    if (!window) return;

    const currentPathIdx = window.history.indexOf(window.currentPath);
    const isLast = currentPathIdx === window.history.length - 1;
    const nextPathId = isLast ? currentPathIdx : currentPathIdx + 1;
    const nextPath = window.history[nextPathId];

    dispatch(
      updateWindow({ itemPath: nextPath, windowId: window.id, operation: WindowOperation.move })
    );
  };

  const changeWindowSize = () => {
    const updatedWindow = { ...window };
    updatedWindow.isWindowMaximized = !window.isWindowMaximized;

    dispatch(updateOpenedWindow(updatedWindow));
  };

  const handleDBClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      changeWindowSize();
    }
  };

  return (
    <div
      className={styles.topBar}
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
      <div className={styles.controlsContainer}>
        <button
          className={styles.backward}
          disabled={!window?.currentPath}
          onClick={handleBackwardBtnClick}
          type="button"
        >
          <IoChevronBackSharp className={styles.icon} />
        </button>
        <button
          className={styles.forward}
          disabled={!window?.history.length || window?.currentPath === window.history.at(-1)}
          onClick={handleForwardBtnClick}
          type="button"
        >
          <IoChevronForwardSharp className={styles.icon} />
        </button>
      </div>
      <div className={styles.itemTitle} onDoubleClick={(e) => handleDBClick(e)}>
        {window.folderTitle}
      </div>
    </div>
  );
};

export default TopBar;
