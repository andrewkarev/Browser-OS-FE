import React from 'react';
import styles from './UpdateTextButton.module.scss';
import { IoMdCheckmark } from 'react-icons/io';

const UpdateTextButton = () => {
  const handleClick = () => {};

  return (
    <button className={styles.button} type="button" onClick={handleClick} disabled={false}>
      <IoMdCheckmark className={styles.icon} />
    </button>
  );
};

export default UpdateTextButton;
