import {
  setCoordinates,
  setIsContextMenuOpened,
  setMenuItems,
  setSelectedItem,
} from 'store/reducers/contextMenuSlice';
import { setCurrentWindow } from 'store/reducers/desktopSlice';
import { IDirItem } from 'types/IDirItem';
import { IMenuItem } from 'types/IMenuItem';
import { IWindow } from 'types/IWindow';
import { useAppDispatch } from './redux';

export const useContextMenu = () => {
  const dispatch = useAppDispatch();

  const handleContextMenu = (
    e: React.MouseEvent,
    menuItems: IMenuItem[],
    selectedItem: IDirItem | null,
    currentWindow?: IWindow
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedItem) {
      dispatch(setSelectedItem(selectedItem));
    }

    if (currentWindow) {
      dispatch(setCurrentWindow(currentWindow));
    }

    dispatch(
      setCoordinates({
        x: e.clientX,
        y: e.clientY,
      })
    );

    dispatch(setMenuItems(menuItems));
    dispatch(setIsContextMenuOpened(true));
  };

  const closeContextMenu = () => {
    dispatch(setIsContextMenuOpened(false));
    // dispatch(setSelectedItem(null));
  };

  return {
    handleContextMenu,
    closeContextMenu,
  };
};
