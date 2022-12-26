import React, { useEffect, useState } from 'react';
import styles from './ConfirmForm.module.scss';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import OutsideClickHandler from 'react-outside-click-handler';
import { useAppDispatch } from 'hooks/redux';
import { setIsConfirmFormOpened } from 'store/reducers/desktopSlice';

const ConfirmForm = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const [isValueValid, setIsValueValid] = useState(true);

  useEffect(() => {
    const isAllowedChars = /^[a-zA-Z0-9_.-]*$/.test(inputValue);
    setIsValueValid(isAllowedChars);
    console.log(isAllowedChars);
  }, [inputValue]);

  const closeContextMenu = () => {
    dispatch(setIsConfirmFormOpened(false));
  };

  const handleSubmitBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  };

  const handleResetBtnClick = () => {
    setInputValue('');
  };

  return (
    <OutsideClickHandler onOutsideClick={closeContextMenu}>
      <div className={styles.container}>
        <form className={styles.form}>
          <input
            className={`${styles.input} ${isValueValid ? '' : styles.inputInvalid}`}
            type="text"
            placeholder="file-name.ext"
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
