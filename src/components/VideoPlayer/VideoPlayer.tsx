import React from 'react';
import { BASE_URL } from 'common/constants';
import { IMediaFile } from 'types/IMediaFile';
import styles from './VideoPlayer.module.scss';

interface VideoPlayerProps {
  fileData: IMediaFile;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ fileData }) => {
  return (
    <video className={styles.videoPlayer} controls autoPlay>
      <source src={`${BASE_URL}/player?videoPath=${fileData.filePath}`} type="video/mp4" />
      Your browser does not support HTML5 video.
    </video>
  );
};

export default VideoPlayer;
