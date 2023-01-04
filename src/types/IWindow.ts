import { IDirectory } from './IDirectory';

export interface IWindow extends IDirectory {
  history: string[];
  currentPath: string;
  isMaximized: boolean;
  isMinimized: boolean;
}
