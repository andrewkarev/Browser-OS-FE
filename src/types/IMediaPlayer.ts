import FileType from 'common/fileType';

export interface IMediaPlayer {
  id: string;
  fileType: FileType;
  isPlayerMaximized: boolean;
  fileTitle: string;
  data: string;
}
