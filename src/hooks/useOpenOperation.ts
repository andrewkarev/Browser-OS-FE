import FileType from 'common/fileType';
import ItemType from 'common/itemType';
import WindowOperation from 'common/windowOperation';
import { setIsWarningModalDisplayed, setSelectedFileName } from 'store/reducers/desktopSlice';
import { getMediaFile, getTextFile, updateWindow } from 'store/thunks';
import { IDirItem } from 'types/IDirItem';
import { getFileType } from 'utils/getFileType';
import { useAppDispatch } from './redux';

export const useOpenOperation = () => {
  const dispatch = useAppDispatch();

  const handleOpenOperation = (item: IDirItem, windowId: string) => {
    if (item.type === ItemType.directory) {
      dispatch(
        updateWindow({
          itemPath: item.path,
          operation: WindowOperation.update,
          windowId,
        })
      );
    } else {
      const fileType = getFileType(item.extension ?? '');

      dispatch(setSelectedFileName(item.name));

      if (!fileType) {
        dispatch(setIsWarningModalDisplayed(true));
      } else {
        const fileData = {
          filePath: item.path,
          fileType,
        };

        fileType === FileType.text
          ? dispatch(getTextFile(fileData))
          : dispatch(getMediaFile(fileData));
      }
    }
  };

  return { handleOpenOperation };
};
