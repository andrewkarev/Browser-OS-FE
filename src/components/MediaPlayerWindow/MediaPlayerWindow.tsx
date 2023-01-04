import React, { useEffect, useState } from 'react';
import styles from './MediaPlayerWindow.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IMediaFile } from 'types/IMediaFile';
import TopBar from 'components/TopBar';
import { setOpenedPlayers, updateOpenedPlayers } from 'store/reducers//desktopSlice';
import FileType from 'common/fileType';
import TextRedactor from 'components/TextRedactor';
import UpdateTextButton from 'components/UpdateTextButton';
import Draggable from 'react-draggable';
import { setActiveWindow } from 'store/reducers/desktopSlice';
import { useDrag } from 'hooks/useDrag';
import { getWindowClassName } from 'utils/getWindowClassName';
import ContextMenuOptions from 'common/contextMenuOptions';
import VideoPlayer from 'components/VideoPlayer';
import AudioPlayer from 'components/AudioPlayer';

interface MediaPlayerProps {
  fileData: IMediaFile;
}

const MediaPlayerWindow: React.FC<MediaPlayerProps> = ({ fileData }) => {
  const dispatch = useAppDispatch();
  const activeWindow = useAppSelector((state) => state.desktop.activeWindow);

  const [textValue, setTextValue] = useState('');

  const { draggableTopLimit, draggableBottomLimit, nodeRef, handleDrag } = useDrag();

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

  const maximizeWindow = () => {
    dispatch(updateOpenedPlayers({ id: fileData.id, operation: ContextMenuOptions.maximize }));
  };

  const minimizeWindow = () => {
    dispatch(updateOpenedPlayers({ id: fileData.id, operation: ContextMenuOptions.minimize }));
  };

  return (
    <Draggable
      axis={fileData.isMaximized ? 'none' : 'both'}
      bounds={{ top: draggableTopLimit, bottom: draggableBottomLimit }}
      nodeRef={nodeRef}
      handle=".drag"
      onDrag={handleDrag}
    >
      <div
        className={styles[getWindowClassName(fileData.isMaximized, fileData.isMinimized)]}
        ref={nodeRef}
        onClick={() => dispatch(setActiveWindow(fileData))}
        style={activeWindow && activeWindow.id === fileData.id ? { zIndex: '3' } : undefined}
      >
        <TopBar
          item={fileData}
          closeWindow={closeWindow}
          maximizeWindow={maximizeWindow}
          minimizeWindow={minimizeWindow}
        >
          {fileData.fileType === FileType.text && (
            <UpdateTextButton fileData={fileData} textValue={textValue} />
          )}
        </TopBar>
        <>
          {fileData.fileType === FileType.text && (
            <TextRedactor setTextValue={setTextValue} textValue={textValue} />
          )}
          {fileData.fileType === FileType.video && <VideoPlayer fileData={fileData} />}
          {fileData.fileType === FileType.audio && <AudioPlayer fileData={fileData} />}
          {/* {fileData.fileType === FileType.image && (
              <img src={`${BASE_URL}/imageView?imagePath=${fileData.filePath}`} />
            )} */}
        </>
      </div>
    </Draggable>
  );
};

export default MediaPlayerWindow;
