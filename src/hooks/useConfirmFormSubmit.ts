import ContextMenuOptions from 'common/contextMenuOptions';
import { setMyPCIconTitle } from 'store/reducers/desktopSlice';
import { addFile, addFolder, renameItem } from 'store/reducers/thunks';
import { getCurrentWindowPath } from 'utils/getCurrentWindowPath';
import { useAppDispatch, useAppSelector } from './redux';

export const useConfirmFormSubmit = (inputValue: string, closeConfirmForm: () => void) => {
  const dispatch = useAppDispatch();
  const confirmModalOperation = useAppSelector((state) => state.desktop.confirmModalOperation);
  const currentWindowId = useAppSelector((state) => state.contextMenu.currentWindowId);
  const openedWindows = useAppSelector((state) => state.desktop.openedWindows);
  const selectedItem = useAppSelector((state) => state.contextMenu.selectedItem);

  return (e: React.MouseEvent) => {
    e.preventDefault();

    const valueToSend = inputValue.trim();

    if (confirmModalOperation === ContextMenuOptions.renamePCIcon) {
      dispatch(setMyPCIconTitle(inputValue));
    }

    if (confirmModalOperation === ContextMenuOptions.addFile && currentWindowId) {
      dispatch(
        addFile({
          windowPath: getCurrentWindowPath(currentWindowId, openedWindows),
          windowId: currentWindowId,
          title: valueToSend,
        })
      );
    }

    if (confirmModalOperation === ContextMenuOptions.addFolder && currentWindowId) {
      dispatch(
        addFolder({
          windowPath: getCurrentWindowPath(currentWindowId, openedWindows),
          windowId: currentWindowId,
          title: valueToSend,
        })
      );
    }

    if (confirmModalOperation === ContextMenuOptions.rename && selectedItem && currentWindowId) {
      dispatch(
        renameItem({
          itemPath: selectedItem.path,
          windowId: currentWindowId,
          title: valueToSend,
        })
      );
    }

    closeConfirmForm();
  };
};
