import React from 'react';
import styles from './ImageViewer.module.scss';
import { IMediaFile } from 'types/IMediaFile';
import { BASE_URL } from 'common/constants';

interface ImageViewerProps {
  fileData: IMediaFile;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ fileData }) => {
  return <img className={styles.image} src={`${BASE_URL}/image?imagePath=${fileData.filePath}`} />;
};

export default ImageViewer;
