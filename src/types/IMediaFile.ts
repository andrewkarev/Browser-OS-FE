import FileType from 'common/fileType';

export interface IMediaFile {
  id: string;
  fileType: FileType;
  filePath: string;
  fileTitle: string;
  isMaximized: boolean;
  isMinimized: boolean;
  data: string;
}
