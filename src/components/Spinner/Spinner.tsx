import React, { useEffect, useRef } from 'react';
import styles from './Spinner.module.scss';
import SPINNER from '../../assets/images/spinning-pinwheel.gif';
import { useAppSelector } from 'hooks/redux';
import { SPINNER_SIDE } from 'common/constants';

interface SpinnerProps {
  mouseCoordinates: { x: number; y: number };
}

const Spinner: React.FC<SpinnerProps> = ({ mouseCoordinates }) => {
  const isPending = useAppSelector((state) => state.desktop.isPending);

  const spinnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (spinnerRef.current) {
      const offset = SPINNER_SIDE / 2;
      spinnerRef.current.style.top = `${mouseCoordinates.y - offset}px`;
      spinnerRef.current.style.left = `${mouseCoordinates.x - offset}px`;
    }
  }, [mouseCoordinates]);

  return (
    <div className={`${styles.spinner} ${isPending ? styles.active : ''}`} ref={spinnerRef}>
      <img src={SPINNER} alt="spinner" />
    </div>
  );
};

export default Spinner;
