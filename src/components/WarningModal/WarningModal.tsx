import React from 'react';
import styles from './WarningModal.module.scss';
import WARNING_IMG from '../../assets/icons/warning.png';
import OutsideClickHandler from 'react-outside-click-handler';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setIsWarningModalDisplayed, setSelectedFileName } from 'store/reducers/desktopSlice';
import { WARNING_MODAL_TEXT } from 'common/constants';

const WarningModal = () => {
  const dispatch = useAppDispatch();
  const selectedFileName = useAppSelector((state) => state.desktop.selectedFileName);

  const closeWarningModal = () => {
    dispatch(setIsWarningModalDisplayed(false));
    dispatch(setSelectedFileName(null));
  };

  return (
    <OutsideClickHandler onOutsideClick={closeWarningModal}>
      <div className={styles.container}>
        <div className={styles.imgWrapper}>
          <img src={WARNING_IMG} alt="Warning sign" />
        </div>
        <div className={styles.text}>{`"${selectedFileName}" ${WARNING_MODAL_TEXT}`}</div>
        <button className={styles.button} onClick={closeWarningModal}>
          Cancel
        </button>
      </div>
    </OutsideClickHandler>
  );
};

export default WarningModal;
