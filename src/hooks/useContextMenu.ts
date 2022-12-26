import {
  setCoordinates,
  setIsContextMenuOpened,
  setMenuItems,
  setSelectedItem,
} from 'store/reducers/contextMenuSlice';
import { IDirItem } from 'types/IDirItem';
import { IMenuItem } from 'types/IMenuItem';
import { useAppDispatch } from './redux';

export const useContextMenu = () => {
  const dispatch = useAppDispatch();

  const handleContextMenu = (
    e: React.MouseEvent,
    menuItems: IMenuItem[],
    selectedItemStats?: {
      item: IDirItem;
      windowId: string;
    }
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedItemStats) {
      dispatch(setSelectedItem(selectedItemStats));
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
    dispatch(setSelectedItem(null));
  };

  return {
    handleContextMenu,
    closeContextMenu,
  };
};
