import React from 'react';
import styles from './UpdateTextButton.module.scss';
import { IoMdCheckmark } from 'react-icons/io';

interface UpdateTextButtonProps {
  isUpdateTextBtnDisabled: boolean;
}

const UpdateTextButton: React.FC<UpdateTextButtonProps> = ({ isUpdateTextBtnDisabled }) => {
  const handleClick = () => {};

  return (
    <button
      className={styles.button}
      type="button"
      onClick={handleClick}
      disabled={isUpdateTextBtnDisabled}
    >
      <IoMdCheckmark className={styles.icon} />
    </button>
  );
};

export default UpdateTextButton;
