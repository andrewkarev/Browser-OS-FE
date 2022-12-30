import React, { useEffect, useRef, useState } from 'react';
import styles from './MediaPlayer.module.scss';
import { useAppDispatch } from 'hooks/redux';
import { IMediaFile } from 'types/IMediaFile';
import TopBar from 'components/TopBar';
import { setOpenedPlayers, updateOpenedPlayers } from 'store/reducers/mediaSlice';
import FileType from 'common/fileType';
import TextRedactor from 'components/TextRedactor';
import UpdateTextButton from 'components/UpdateTextButton';
import Draggable from 'react-draggable';

interface MediaPlayerProps {
  fileData: IMediaFile;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ fileData }) => {
  const dispatch = useAppDispatch();

  const [textValue, setTextValue] = useState('');
  const [draggableTopLimit, setDraggableTopLimit] = useState(0);

  const windowRef = useRef<HTMLDivElement | null>(null);

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

  const handleDrag = () => {
    if (windowRef.current) {
      setDraggableTopLimit(-windowRef.current.offsetTop);
    }
  };

  return (
    <Draggable
      axis={fileData.isPlayerMaximized ? 'none' : 'both'}
      bounds={{ top: draggableTopLimit }}
      nodeRef={windowRef}
      handle=".drag"
      onDrag={handleDrag}
    >
      <div
        className={fileData.isPlayerMaximized ? styles.playerMaximized : styles.player}
        ref={windowRef}
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
