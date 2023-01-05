import React, { useEffect, useState } from 'react';
import styles from './UpdateTextButton.module.scss';
import { IoMdCheckmark } from 'react-icons/io';
import { useAppDispatch } from 'hooks/redux';
import { updateTextFile } from 'store/thunks';
import { IMediaFile } from 'types/IMediaFile';

interface UpdateTextButtonProps {
  fileData: IMediaFile;
  textValue: string;
}

const UpdateTextButton: React.FC<UpdateTextButtonProps> = ({ fileData, textValue }) => {
  const dispatch = useAppDispatch();

  const [isUpdateTextBtnDisabled, setIsUpdateTextBtnDisabled] = useState(true);

  useEffect(() => {
    fileData.data === textValue
      ? setIsUpdateTextBtnDisabled(true)
      : setIsUpdateTextBtnDisabled(false);
  }, [fileData.data, textValue]);

  const handleClick = () => {
    const valueToSend = { ...fileData, data: textValue };

    dispatch(updateTextFile(valueToSend));
  };

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
