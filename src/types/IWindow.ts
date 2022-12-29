import { IDirectory } from './IDirectory';

export interface IWindow extends IDirectory {
  history: string[];
  currentPath: string;
  isWindowMaximized: boolean;
}
