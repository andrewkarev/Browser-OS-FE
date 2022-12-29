import ContextMenuOptions from 'common/contextMenuOptions';
import { setMyPCIconTitle } from 'store/reducers/desktopSlice';
import { addFile, addFolder, renameItem } from 'store/reducers/thunks';
import { useAppDispatch, useAppSelector } from './redux';

export const useConfirmFormSubmit = (inputValue: string, closeConfirmForm: () => void) => {
  const dispatch = useAppDispatch();
  const confirmModalOperation = useAppSelector((state) => state.desktop.confirmModalOperation);
  const currentWindow = useAppSelector((state) => state.window.currentWindow);
  const selectedItem = useAppSelector((state) => state.contextMenu.selectedItem);

  return (e: React.MouseEvent) => {
    e.preventDefault();

    const valueToSend = inputValue.trim();

    if (confirmModalOperation === ContextMenuOptions.renamePCIcon) {
      dispatch(setMyPCIconTitle(inputValue));
    }

    if (confirmModalOperation === ContextMenuOptions.addFile && currentWindow) {
      dispatch(
        addFile({
          windowPath: currentWindow.currentPath,
          windowId: currentWindow.id,
          title: valueToSend,
        })
      );
    }

    if (confirmModalOperation === ContextMenuOptions.addFolder && currentWindow) {
      dispatch(
        addFolder({
          windowPath: currentWindow.currentPath,
          windowId: currentWindow.id,
          title: valueToSend,
        })
      );
    }

    if (confirmModalOperation === ContextMenuOptions.rename && selectedItem && currentWindow) {
      dispatch(
        renameItem({
          itemPath: selectedItem.path,
          windowId: currentWindow.id,
          title: valueToSend,
        })
      );
    }

    closeConfirmForm();
  };
};
