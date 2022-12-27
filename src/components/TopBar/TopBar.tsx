import React, { useEffect, useState } from 'react';
import styles from './TopBar.module.scss';
import { FaLessThan, FaGreaterThan } from 'react-icons/fa';
import { VscDash, VscClose } from 'react-icons/vsc';
import { TbDotsDiagonal2 } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setIsWindowMaximized, setOpenedWindows } from 'store/reducers/desktopSlice';
import { IWindow } from 'types/IWindow';
import { updateWindow } from 'store/reducers/thunks';
import { useContextMenu } from 'hooks/useContextMenu';
import { contextMenuModel } from 'data/contextMenuModel';
import WindowOperation from 'common/windowOperation';

interface TopBarProps {
  id: string;
  folderTitle: string;
}

const TopBar: React.FC<TopBarProps> = ({ id, folderTitle }) => {
  const dispatch = useAppDispatch();
  const openedWindows = useAppSelector((state) => state.desktop.openedWindows);
  const [isIconsVisible, setIsIconsVisible] = useState(false);
  const [window, setWindow] = useState<IWindow>();

  const { handleContextMenu } = useContextMenu();

  useEffect(() => {
    const currentWindow = openedWindows.find(({ window }) => window.id === id);
    setWindow(currentWindow);
  }, [id, openedWindows]);

  const handleMouseOver = () => {
    setIsIconsVisible((prev) => !prev);
  };

  const closeWindow = () => {
    dispatch(setOpenedWindows(id));
  };

  const handleBackwardBtnClick = () => {
    if (!window) return;

    const currentPathIdx = window.history.indexOf(window.currentPath);
    const previousPath = currentPathIdx ? window.history[currentPathIdx - 1] : '';

    dispatch(
      updateWindow({ itemPath: previousPath, windowId: id, operation: WindowOperation.move })
    );
  };

  const handleForwardBtnClick = () => {
    if (!window) return;

    const currentPathIdx = window.history.indexOf(window.currentPath);
    const isLast = currentPathIdx === window.history.length - 1;
    const nextPathId = isLast ? currentPathIdx : currentPathIdx + 1;
    const nextPath = window.history[nextPathId];

    dispatch(updateWindow({ itemPath: nextPath, windowId: id, operation: WindowOperation.move }));
  };

  const changeWindowSize = () => {
    dispatch(setIsWindowMaximized());
  };

  return (
    <div
      className={styles.topBar}
      onContextMenu={(e) => handleContextMenu(e, contextMenuModel.topBar, null)}
      onDoubleClick={changeWindowSize}
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
          <FaLessThan className={styles.icon} />
        </button>
        <button
          className={styles.forward}
          disabled={!window?.history.length || window?.currentPath === window.history.at(-1)}
          onClick={handleForwardBtnClick}
          type="button"
        >
          <FaGreaterThan className={styles.icon} />
        </button>
      </div>
      <div className={styles.itemTitle}>{folderTitle}</div>
    </div>
  );
};

export default TopBar;
