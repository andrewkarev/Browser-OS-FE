import React from 'react';
import styles from './BackgroundOptions.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setWallpaperId } from 'store/reducers/desktopSlice';
import { IoMdCheckmark } from 'react-icons/io';
import { backgroundImages } from 'data/backgroundImages';

interface BackgroundOptionsProps {
  closeContextMenu: () => void;
}

const BackgroundOptions: React.FC<BackgroundOptionsProps> = ({ closeContextMenu }) => {
  const dispatch = useAppDispatch();
  const wallpaperId = useAppSelector((state) => state.desktop.wallpaperId);

  return (
    <>
      {backgroundImages.map(({ id, title }) => {
        const handleClick = () => {
          dispatch(setWallpaperId(id));
          closeContextMenu();
        };

        return (
          <div key={id} className={styles.menuitem} onClick={handleClick}>
            <p>{title}</p>
            {wallpaperId === id && <IoMdCheckmark className={styles.icon} />}
          </div>
        );
      })}
    </>
  );
};

export default BackgroundOptions;
