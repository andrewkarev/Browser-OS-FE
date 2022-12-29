import React from 'react';
import MyPCIcon from 'components/MyPCIcon';
import Taskbar from 'components/Taskbar';
import Window from 'components/Window';
import styles from './Desktop.module.scss';
import { useAppSelector } from 'hooks/redux';
import ContextMenu from 'components/ContextMenu';
import { useContextMenu } from 'hooks/useContextMenu';
import { contextMenuModel } from 'data/contextMenuModel';
import ConfirmForm from 'components/ConfirmForm';
import { backgroundImages } from 'data/backgroundImages';
import WarningModal from 'components/WarningModal';

const Desktop = () => {
  const openedWindows = useAppSelector((state) => state.desktop.openedWindows);
  const coordinates = useAppSelector((state) => state.contextMenu.coordinates);
  const isContextMenuOpened = useAppSelector((state) => state.contextMenu.isContextMenuOpened);
  const menuItems = useAppSelector((state) => state.contextMenu.menuItems);
  const isConfirmFormOpened = useAppSelector((state) => state.desktop.isConfirmFormOpened);
  const wallpaperId = useAppSelector((state) => state.desktop.wallpaperId);
  const isWarningModalDisplayed = useAppSelector((state) => state.desktop.isWarningModalDisplayed);

  const { handleContextMenu, closeContextMenu } = useContextMenu();

  const windows = openedWindows.map(({ window }) => <Window windowData={window} key={window.id} />);

  return (
    <>
      <div
        className={styles.desktop}
        onContextMenu={(e) => handleContextMenu(e, contextMenuModel.desktop, null)}
        style={{
          backgroundImage: `url(${
            backgroundImages.find((image) => image.id === wallpaperId)?.src
          })`,
        }}
      >
        <MyPCIcon />
      </div>
      {windows}
      {isContextMenuOpened && (
        <ContextMenu
          coordinates={coordinates}
          closeContextMenu={closeContextMenu}
          menuItems={menuItems}
        />
      )}
      {isConfirmFormOpened && <ConfirmForm />}
      {isWarningModalDisplayed && <WarningModal />}
      <Taskbar />
    </>
  );
};

export default Desktop;
