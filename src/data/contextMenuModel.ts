import ContextMenuOptions from 'common/contextMenuOptions';
import ContextMenuOptionsTitle from 'common/contextMenuOptionsTitle';

export const contextMenuModel = {
  desktop: [
    { option: ContextMenuOptions.setBackground, title: ContextMenuOptionsTitle.background },
  ],
  myPC: [
    { option: ContextMenuOptions.openRootFolder, title: ContextMenuOptionsTitle.open },
    { option: ContextMenuOptions.renamePCIcon, title: ContextMenuOptionsTitle.rename },
  ],
  window: [
    { option: ContextMenuOptions.addFile, title: ContextMenuOptionsTitle.addFile },
    { option: ContextMenuOptions.addFolder, title: ContextMenuOptionsTitle.addFolder },
  ],
  directory: [
    { option: ContextMenuOptions.openDirectory, title: ContextMenuOptionsTitle.open },
    { option: ContextMenuOptions.separator, title: ContextMenuOptionsTitle.separator },
    { option: ContextMenuOptions.cutDirectory, title: ContextMenuOptionsTitle.cut },
    { option: ContextMenuOptions.copyDirectory, title: ContextMenuOptionsTitle.copy },
    { option: ContextMenuOptions.pasteDirectory, title: ContextMenuOptionsTitle.paste },
    { option: ContextMenuOptions.separator, title: ContextMenuOptionsTitle.separator },
    { option: ContextMenuOptions.deleteDirectory, title: ContextMenuOptionsTitle.delete },
    { option: ContextMenuOptions.rename, title: ContextMenuOptionsTitle.rename },
  ],
  file: [
    { option: ContextMenuOptions.openFile, title: ContextMenuOptionsTitle.open },
    { option: ContextMenuOptions.separator, title: ContextMenuOptionsTitle.separator },
    { option: ContextMenuOptions.cutFile, title: ContextMenuOptionsTitle.cut },
    { option: ContextMenuOptions.copyFile, title: ContextMenuOptionsTitle.copy },
    { option: ContextMenuOptions.pasteFile, title: ContextMenuOptionsTitle.paste },
    { option: ContextMenuOptions.separator, title: ContextMenuOptionsTitle.separator },
    { option: ContextMenuOptions.deleteFile, title: ContextMenuOptionsTitle.delete },
    { option: ContextMenuOptions.rename, title: ContextMenuOptionsTitle.rename },
  ],
  topBar: [
    { option: ContextMenuOptions.minimize, title: ContextMenuOptionsTitle.minimize },
    { option: ContextMenuOptions.maximize, title: ContextMenuOptionsTitle.maximize },
    { option: ContextMenuOptions.separator, title: ContextMenuOptionsTitle.separator },
    { option: ContextMenuOptions.close, title: ContextMenuOptionsTitle.close },
  ],
  taskBar: [
    { option: ContextMenuOptions.enterFullScreen, title: ContextMenuOptionsTitle.enterFullScreen },
  ],
  taskBarFullScreen: [
    { option: ContextMenuOptions.exitFullScreen, title: ContextMenuOptionsTitle.exitFullScreen },
  ],
};
