import FileType from 'common/fileType';

export interface IMediaPlayer {
  id: string;
  fileType: FileType;
  filePath: string;
  fileTitle: string;
  isPlayerMaximized: boolean;
  data: string;
}
