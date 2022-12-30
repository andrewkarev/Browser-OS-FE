import React from 'react';
import styles from './MediaPlayer.module.scss';
import { useAppDispatch } from 'hooks/redux';
import { IMediaPlayer } from 'types/IMediaPlayer';
import TopBar from 'components/TopBar';
import { setOpenedPlayers, updateOpenedPlayers } from 'store/reducers/mediaSlice';
import FileType from 'common/fileType';
import TextRedactor from 'components/TextRedactor';
import UpdateTextButton from 'components/UpdateTextButton';

interface MediaPlayerProps {
  fileData: IMediaPlayer;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ fileData }) => {
  const dispatch = useAppDispatch();

  const closeWindow = () => {
    dispatch(setOpenedPlayers(fileData.id));
  };

  const changeWindowSize = () => {
    const updatedPlayer = { ...fileData };
    updatedPlayer.isPlayerMaximized = !fileData.isPlayerMaximized;

    dispatch(updateOpenedPlayers(updatedPlayer));
  };

  return (
    <div className={fileData.isPlayerMaximized ? styles.playerMaximized : styles.player}>
      <TopBar
        title={fileData.fileTitle}
        closeWindow={closeWindow}
        changeWindowSize={changeWindowSize}
      >
        {fileData.fileType === FileType.text && <UpdateTextButton />}
      </TopBar>
      <div className={styles.content}>
        {fileData.fileType === FileType.text && <TextRedactor content={fileData.data} />}
      </div>
    </div>
  );
};

export default MediaPlayer;
