export const contextMenuModel = {
  desktop: [{ option: 'set background', title: 'background' }],
  myPC: [
    { option: 'open root folder', title: 'open' },
    { option: 'rename PC icon', title: 'rename' },
  ],
  window: [
    { option: 'add file', title: 'add file' },
    { option: 'add folder', title: 'add folder' },
  ],
  directory: [
    { option: 'open directory', title: 'open' },
    { option: '', title: 'separator' },
    { option: 'cut directory', title: 'cut' },
    { option: 'copy directory', title: 'copy' },
    { option: '', title: 'separator' },
    { option: 'delete directory', title: 'delete' },
    { option: 'rename directory', title: 'rename' },
  ],
  file: [
    { option: 'open file', title: 'open' },
    { option: '', title: 'separator' },
    { option: 'cut file', title: 'cut' },
    { option: 'copy file', title: 'copy' },
    { option: '', title: 'separator' },
    { option: 'delete file', title: 'delete' },
    { option: 'rename file', title: 'rename' },
  ],
  topBar: [
    { option: 'minimize', title: 'minimize' },
    { option: 'maximize', title: 'maximize' },
    { option: '', title: 'separator' },
    { option: 'close', title: 'close' },
  ],
  taskBar: [{ option: 'enter full screen', title: 'enter full screen' }],
};
