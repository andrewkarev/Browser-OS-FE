import React from 'react';
import styles from './FolderNavigation.module.scss';
import WindowOperation from 'common/windowOperation';
import { useAppDispatch } from 'hooks/redux';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { updateWindow } from 'store/thunks';
import { IWindow } from 'types/IWindow';

interface FolderNavigationProps {
  window: IWindow;
}

const FolderNavigation: React.FC<FolderNavigationProps> = ({ window }) => {
  const dispatch = useAppDispatch();

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

  return (
    <div>
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
  );
};

export default FolderNavigation;
