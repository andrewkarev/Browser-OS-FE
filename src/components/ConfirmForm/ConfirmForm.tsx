import React, { useEffect, useState } from 'react';
import styles from './ConfirmForm.module.scss';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import OutsideClickHandler from 'react-outside-click-handler';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setIsConfirmFormOpened } from 'store/reducers/desktopSlice';
import ContextMenuOptions from 'common/contextMenuOptions';
import Placeholders from 'common/placeholders';
import { useConfirmFormSubmit } from 'hooks/useConfirmFormSubmit';

const ConfirmForm = () => {
  const dispatch = useAppDispatch();
  const confirmModalOperation = useAppSelector((state) => state.desktop.confirmModalOperation);
  const selectedItem = useAppSelector((state) => state.contextMenu.selectedItem);
  const myPCIconTitle = useAppSelector((state) => state.desktop.myPCIconTitle);

  const [inputValue, setInputValue] = useState('');
  const [isValueValid, setIsValueValid] = useState(true);
  const [isUniqueName, setIsUniqueName] = useState(true);
  const [inputPlaceholder, setInputPlaceholder] = useState('');

  useEffect(() => {
    const isAllowedChars = /^[ a-zA-Z0-9_.-]*$/.test(inputValue);
    const isInputValueUnique = inputValue !== selectedItem?.name;

    setIsUniqueName(isInputValueUnique);
    setIsValueValid(isAllowedChars);
  }, [inputValue, selectedItem?.name]);

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

  const handleSubmitBtnClick = useConfirmFormSubmit(inputValue, closeConfirmForm);

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
              disabled={!inputValue || !isValueValid || !isUniqueName}
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
