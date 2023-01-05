import React from 'react';
import MyPCIcon from 'components/MyPCIcon';
import Window from 'components/Window';
import styles from './Desktop.module.scss';
import { useAppSelector } from 'hooks/redux';
import { useContextMenu } from 'hooks/useContextMenu';
import { contextMenuModel } from 'data/contextMenuModel';
import ConfirmForm from 'components/ConfirmForm';
import { backgroundImages } from 'data/backgroundImages';
import WarningModal from 'components/WarningModal';
import MediaPlayerWindow from 'components/MediaPlayerWindow';

const Desktop = () => {
  const openedWindows = useAppSelector((state) => state.desktop.openedWindows);
  const isConfirmFormOpened = useAppSelector((state) => state.desktop.isConfirmFormOpened);
  const wallpaperId = useAppSelector((state) => state.desktop.wallpaperId);
  const isWarningModalDisplayed = useAppSelector((state) => state.desktop.isWarningModalDisplayed);
  const openedPlayers = useAppSelector((state) => state.desktop.openedPlayers);

  const { handleContextMenu } = useContextMenu();

  const windows = openedWindows.map((window) => <Window windowData={window} key={window.id} />);
  const players = openedPlayers.map((player) => (
    <MediaPlayerWindow fileData={player} key={player.id} />
  ));

  return (
    <div
      className={styles.desktop}
      onContextMenu={(e) => handleContextMenu(e, contextMenuModel.desktop, null)}
      style={{
        backgroundImage: `url(${backgroundImages.find((image) => image.id === wallpaperId)?.src})`,
      }}
    >
      <MyPCIcon />
      {windows}
      {players}
      {isConfirmFormOpened && <ConfirmForm />}
      {isWarningModalDisplayed && <WarningModal />}
    </div>
  );
};

export default Desktop;
