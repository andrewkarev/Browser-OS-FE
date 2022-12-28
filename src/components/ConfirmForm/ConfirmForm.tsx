import React, { useEffect, useState } from 'react';
import styles from './ConfirmForm.module.scss';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import OutsideClickHandler from 'react-outside-click-handler';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setIsConfirmFormOpened, setMyPCIconTitle } from 'store/reducers/desktopSlice';
import ContextMenuOptions from 'common/contextMenuOptions';
import Placeholders from 'common/placeholders';
import { addFile, addFolder, renameItem } from 'store/reducers/thunks';
import { getCurrentWindowPath } from 'utils/getCurrentWindowPath';

const ConfirmForm = () => {
  const dispatch = useAppDispatch();
  const confirmModalOperation = useAppSelector((state) => state.desktop.confirmModalOperation);
  const currentWindowId = useAppSelector((state) => state.contextMenu.currentWindowId);
  const selectedItem = useAppSelector((state) => state.contextMenu.selectedItem);
  const openedWindows = useAppSelector((state) => state.desktop.openedWindows);
  const myPCIconTitle = useAppSelector((state) => state.desktop.myPCIconTitle);

  const [inputValue, setInputValue] = useState('');
  const [isValueValid, setIsValueValid] = useState(true);
  const [inputPlaceholder, setInputPlaceholder] = useState('');

  useEffect(() => {
    const isAllowedChars = /^[ a-zA-Z0-9_.-]*$/.test(inputValue);
    setIsValueValid(isAllowedChars);
  }, [inputValue]);

  useEffect(() => {
    if (confirmModalOperation === ContextMenuOptions.renamePCIcon) {
      setInputPlaceholder(Placeholders.folderName);
      setInputValue(myPCIconTitle);
    }

    if (confirmModalOperation === ContextMenuOptions.addFile) {
      setInputPlaceholder(Placeholders.addFile);
    }

    if (confirmModalOperation === ContextMenuOptions.addFolder) {
      setInputPlaceholder(Placeholders.folderName);
    }

    if (confirmModalOperation === ContextMenuOptions.rename) {
      setInputPlaceholder(Placeholders.renameDirectory);
      selectedItem && setInputValue(selectedItem.name);
    }
  }, [confirmModalOperation, myPCIconTitle, selectedItem]);

  const closeConfirmForm = () => {
    dispatch(setIsConfirmFormOpened(false));
  };

  const handleSubmitBtnClick = (e: React.MouseEvent) => {
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

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  };

  return (
    <OutsideClickHandler onOutsideClick={closeConfirmForm}>
      <div className={styles.container}>
        <form className={styles.form}>
          <input
            className={`${styles.input} ${isValueValid ? '' : styles.inputInvalid}`}
            type="text"
            placeholder={inputPlaceholder}
            onInput={(e) => handleInput(e)}
            value={inputValue}
            autoFocus
          />
          <div className={styles.buttonsContainer}>
            <button
              className={styles.button}
              type="submit"
              onClick={(e) => handleSubmitBtnClick(e)}
              disabled={!inputValue || !isValueValid}
            >
              <IoMdCheckmark className={styles.icon} />
            </button>
            <button className={styles.button} type="button" onClick={closeConfirmForm}>
              <IoMdClose className={styles.icon} />
            </button>
          </div>
        </form>
      </div>
    </OutsideClickHandler>
  );
};

export default ConfirmForm;
