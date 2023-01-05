import ContextMenuOptions from 'common/contextMenuOptions';
import TransferOperation from 'common/transferOperation';
import { setItemToTransfer, setTransferOperation } from 'store/reducers/contextMenuSlice';
import {
  setConfirmModalOperation,
  setIsConfirmFormOpened,
  setIsFullScreenMode,
  setOpenedPlayers,
  setOpenedWindows,
  updateOpenedPlayers,
  updateOpenedWindow,
} from 'store/reducers/desktopSlice';
import { copyItem, cutItem, deleteFile, getItems, removeFolder } from 'store/thunks';
import { IMenuItem } from 'types/IMenuItem';
import { useAppDispatch, useAppSelector } from './redux';
import { useOpenOperation } from './useOpenOperation';

export const useContextMenuHandler = (closeContextMenu: () => void) => {
  const dispatch = useAppDispatch();
  const selectedItem = useAppSelector((state) => state.contextMenu.selectedItem);
  const currentWindow = useAppSelector((state) => state.window.currentWindow);
  const itemToTransfer = useAppSelector((state) => state.contextMenu.itemToTransfer);
  const transferOperation = useAppSelector((state) => state.contextMenu.transferOperation);
  const activeWindow = useAppSelector((state) => state.desktop.activeWindow);

  const { handleOpenOperation } = useOpenOperation();

  return (menuItem: IMenuItem) => {
    switch (menuItem.option) {
      case ContextMenuOptions.openRootFolder:
        return () => {
          dispatch(getItems(''));
          closeContextMenu();
        };
      case ContextMenuOptions.renamePCIcon:
        return () => {
          dispatch(setConfirmModalOperation(ContextMenuOptions.renamePCIcon));
          dispatch(setIsConfirmFormOpened(true));
          closeContextMenu();
        };
      case ContextMenuOptions.open: {
        if (!selectedItem || !currentWindow) return;

        return () => {
          handleOpenOperation(selectedItem, currentWindow.id);
          closeContextMenu();
        };
      }
      case ContextMenuOptions.addFile:
        return () => {
          dispatch(setConfirmModalOperation(ContextMenuOptions.addFile));
          dispatch(setIsConfirmFormOpened(true));
          closeContextMenu();
        };
      case ContextMenuOptions.deleteFile: {
        if (!selectedItem || !currentWindow) return;

        return () => {
          dispatch(deleteFile({ itemPath: selectedItem.path, windowId: currentWindow.id }));
          closeContextMenu();
        };
      }
      case ContextMenuOptions.addFolder:
        return () => {
          dispatch(setConfirmModalOperation(ContextMenuOptions.addFolder));
          dispatch(setIsConfirmFormOpened(true));
          closeContextMenu();
        };
      case ContextMenuOptions.deleteDirectory:
        if (!currentWindow || !selectedItem) return;

        return () => {
          dispatch(
            removeFolder({
              folderPath: selectedItem?.path,
              windowId: currentWindow.id,
            })
          );
          closeContextMenu();
        };
      case ContextMenuOptions.rename:
        return () => {
          dispatch(setConfirmModalOperation(ContextMenuOptions.rename));
          dispatch(setIsConfirmFormOpened(true));
          closeContextMenu();
        };
      case ContextMenuOptions.copy:
        return () => {
          dispatch(setItemToTransfer(selectedItem));
          dispatch(setTransferOperation(TransferOperation.copy));
          closeContextMenu();
        };
      case ContextMenuOptions.cut:
        return () => {
          dispatch(setItemToTransfer(selectedItem));
          dispatch(setTransferOperation(TransferOperation.cut));
          closeContextMenu();
        };
      case ContextMenuOptions.paste:
        if (!itemToTransfer || !currentWindow) return;

        return () => {
          if (transferOperation === TransferOperation.copy) {
            dispatch(
              copyItem({
                sourcePath: itemToTransfer.path,
                destPath: currentWindow.currentPath,
                windowId: currentWindow.id,
              })
            );
          }

          if (transferOperation === TransferOperation.cut) {
            dispatch(
              cutItem({
                sourcePath: itemToTransfer.path,
                destPath: currentWindow.currentPath,
                windowId: currentWindow.id,
                itemType: itemToTransfer.type,
              })
            );
          }

          dispatch(setItemToTransfer(null));
          dispatch(setTransferOperation(null));
          closeContextMenu();
        };
      case ContextMenuOptions.enterFullScreen:
        return () => {
          document.body.requestFullscreen();
          dispatch(setIsFullScreenMode(true));
          closeContextMenu();
        };
      case ContextMenuOptions.exitFullScreen:
        return () => {
          document.exitFullscreen();
          dispatch(setIsFullScreenMode(false));
          closeContextMenu();
        };
      case ContextMenuOptions.maximize:
        if (!activeWindow) return;

        return () => {
          'history' in activeWindow
            ? dispatch(
                updateOpenedWindow({ id: activeWindow.id, operation: ContextMenuOptions.maximize })
              )
            : dispatch(
                updateOpenedPlayers({ id: activeWindow.id, operation: ContextMenuOptions.maximize })
              );

          closeContextMenu();
        };
      case ContextMenuOptions.minimize:
        if (!activeWindow) return;

        return () => {
          'history' in activeWindow
            ? dispatch(
                updateOpenedWindow({ id: activeWindow.id, operation: ContextMenuOptions.minimize })
              )
            : dispatch(
                updateOpenedPlayers({ id: activeWindow.id, operation: ContextMenuOptions.minimize })
              );

          closeContextMenu();
        };
      case ContextMenuOptions.restore:
        if (!activeWindow) return;

        return () => {
          'history' in activeWindow
            ? dispatch(
                updateOpenedWindow({ id: activeWindow.id, operation: ContextMenuOptions.restore })
              )
            : dispatch(
                updateOpenedPlayers({ id: activeWindow.id, operation: ContextMenuOptions.restore })
              );

          closeContextMenu();
        };
      case ContextMenuOptions.close:
        if (!activeWindow) return;

        return () => {
          'history' in activeWindow
            ? dispatch(setOpenedWindows(activeWindow.id))
            : dispatch(setOpenedPlayers(activeWindow.id));

          closeContextMenu();
        };
      default:
        return () => {
          closeContextMenu();
        };
    }
  };
};
