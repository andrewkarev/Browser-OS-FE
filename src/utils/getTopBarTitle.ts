import { IMediaFile } from 'types/IMediaFile';
import { IWindow } from 'types/IWindow';

export const getTopBarTitle = (item: IWindow | IMediaFile) => {
  return 'history' in item ? item.folderTitle : item.fileTitle;
};
