import React, { useEffect, useState } from 'react';
import styles from './ConfirmForm.module.scss';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import OutsideClickHandler from 'react-outside-click-handler';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setIsConfirmFormOpened, setMyPCIconTitle } from 'store/reducers/desktopSlice';
import ContextMenuOptions from 'common/contextMenuOptions';
import Placeholders from 'common/placeholders';

const ConfirmForm = () => {
  const dispatch = useAppDispatch();
  const confirmModalOperation = useAppSelector((state) => state.desktop.confirmModalOperation);

  const [inputValue, setInputValue] = useState('');
  const [isValueValid, setIsValueValid] = useState(true);
  const [inputPlaceholder, setInputPlaceholder] = useState('');

  useEffect(() => {
    const isAllowedChars = /^[a-zA-Z0-9_.-]*$/.test(inputValue);
    setIsValueValid(isAllowedChars);
  }, [inputValue]);

  useEffect(() => {
    if (confirmModalOperation === ContextMenuOptions.renamePCIcon) {
      setInputPlaceholder(Placeholders.folderName);
    }
  }, [confirmModalOperation]);

  const closeConfirmForm = () => {
    dispatch(setIsConfirmFormOpened(false));
  };

  const handleSubmitBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (confirmModalOperation === ContextMenuOptions.renamePCIcon) {
      dispatch(setMyPCIconTitle(inputValue));
    }

    closeConfirmForm();
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  };

  const handleResetBtnClick = () => {
    setInputValue('');
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
            <button className={styles.button} type="button" onClick={handleResetBtnClick}>
              <IoMdClose className={styles.icon} />
            </button>
          </div>
        </form>
      </div>
    </OutsideClickHandler>
  );
};

export default ConfirmForm;
