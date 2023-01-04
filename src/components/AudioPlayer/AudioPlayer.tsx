import React from 'react';
import { BASE_URL } from 'common/constants';
import styles from './AudioPlayer.module.scss';
import { IMediaFile } from 'types/IMediaFile';
import BG_VIDEO from '../../assets/videos/audioPlayer.mp4';

interface AudioPlayerProps {
  fileData: IMediaFile;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ fileData }) => {
  return (
    <div className={styles.audioPlayerContainer}>
      <video className={styles.backgroundVideo} autoPlay muted loop>
        <source src={BG_VIDEO} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      <div className={styles.audioPlayerWrapper}>
        <audio className={styles.audioPlayer} controls autoPlay>
          <source src={`${BASE_URL}/audioPlayer?audioPath=${fileData.filePath}`} type="audio/mp3" />
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayer;
