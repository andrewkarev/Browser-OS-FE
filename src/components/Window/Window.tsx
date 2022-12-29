import Item from 'components/Item/';
import TopBar from 'components/TopBar/';
import { contextMenuModel } from 'data/contextMenuModel';
import { useAppDispatch } from 'hooks/redux';
import { useContextMenu } from 'hooks/useContextMenu';
import React, { useEffect } from 'react';
import { setCurrentWindowId } from 'store/reducers/contextMenuSlice';
import { IWindow } from 'types/IWindow';
import styles from './Window.module.scss';

interface WindowProps {
  windowData: IWindow;
}

const Window: React.FC<WindowProps> = ({ windowData }) => {
  const dispatch = useAppDispatch();

  const { handleContextMenu } = useContextMenu();

  useEffect(() => {
    dispatch(setCurrentWindowId(windowData.id));
  }, [dispatch, windowData.id]);

  const items = windowData.items.map((item, i) => {
    return <Item item={item} windowData={windowData} key={`${item.name}-${i}`} />;
  });

  return (
    <div
      className={windowData.isWindowMaximized ? styles.windowMaximized : styles.window}
      onContextMenu={(e) => handleContextMenu(e, contextMenuModel.window, null, windowData.id)}
    >
      <TopBar window={windowData} />
      <div className={styles.itemsContainer}>{items}</div>
    </div>
  );
};

export default Window;
