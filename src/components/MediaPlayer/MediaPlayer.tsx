import React, { useEffect, useState } from 'react';
import styles from './MediaPlayer.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IMediaFile } from 'types/IMediaFile';
import TopBar from 'components/TopBar';
import { setOpenedPlayers, updateOpenedPlayers } from 'store/reducers/mediaSlice';
import FileType from 'common/fileType';
import TextRedactor from 'components/TextRedactor';
import UpdateTextButton from 'components/UpdateTextButton';
import Draggable from 'react-draggable';
import { setActiveWindow } from 'store/reducers/desktopSlice';
import { useDrag } from 'hooks/useDrag';

interface MediaPlayerProps {
  fileData: IMediaFile;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ fileData }) => {
  const dispatch = useAppDispatch();
  const activeWindow = useAppSelector((state) => state.desktop.activeWindow);

  const [textValue, setTextValue] = useState('');

  const { draggableTopLimit, nodeRef, handleDrag } = useDrag();

  useEffect(() => {
    dispatch(setActiveWindow(fileData));
  }, [dispatch, fileData]);

  useEffect(() => {
    if (fileData.fileType === FileType.text) {
      setTextValue(fileData.data);
    }
  }, [fileData.data, fileData.fileType]);

  const closeWindow = () => {
    dispatch(setOpenedPlayers(fileData.id));
  };

  const changeWindowSize = () => {
    const updatedPlayer = { ...fileData };
    updatedPlayer.isPlayerMaximized = !fileData.isPlayerMaximized;

    dispatch(updateOpenedPlayers(updatedPlayer));
  };

  return (
    <Draggable
      axis={fileData.isPlayerMaximized ? 'none' : 'both'}
      bounds={{ top: draggableTopLimit }}
      nodeRef={nodeRef}
      handle=".drag"
      onDrag={handleDrag}
    >
      <div
        className={fileData.isPlayerMaximized ? styles.playerMaximized : styles.player}
        ref={nodeRef}
        onClick={() => dispatch(setActiveWindow(fileData))}
        style={activeWindow && activeWindow.id === fileData.id ? { zIndex: '3' } : undefined}
      >
        <TopBar
          title={fileData.fileTitle}
          closeWindow={closeWindow}
          changeWindowSize={changeWindowSize}
        >
          {fileData.fileType === FileType.text && (
            <UpdateTextButton fileData={fileData} textValue={textValue} />
          )}
        </TopBar>
        <div className={styles.content}>
          {fileData.fileType === FileType.text && (
            <TextRedactor setTextValue={setTextValue} textValue={textValue} />
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default MediaPlayer;
