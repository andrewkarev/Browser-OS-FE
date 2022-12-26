import { IDirItem } from './IDirItem';

export interface IDirectory {
  id: string;
  folderTitle: string;
  items: IDirItem[];
}
