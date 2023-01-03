import React, { useEffect, useRef } from 'react';
import { Coordinates } from 'types/Coordinates';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './ContextMenu.module.scss';
import { useAppSelector } from 'hooks/redux';
import { IMenuItem } from 'types/IMenuItem';
import ContextMenuOptionsTitle from 'common/contextMenuOptionsTitle';
import { useContextMenuHandler } from 'hooks/useContextMenuHandler';
import { getContextMenuOptionClassName } from 'utils/getContextMenuOptionClassName';
import { IoChevronForwardSharp } from 'react-icons/io5';
import BackgroundOptions from 'components/BackgroundOptions';

interface ContextMenuProps {
  coordinates: Coordinates;
  closeContextMenu: () => void;
  menuItems: IMenuItem[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({ coordinates, menuItems, closeContextMenu }) => {
  const itemToTransfer = useAppSelector((state) => state.contextMenu.itemToTransfer);

  const getHandler = useContextMenuHandler(closeContextMenu);

  const contextMenu = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contextMenu.current) return;

    const taskBarHeight = 28;

    let coordinateX = coordinates?.x;
    let coordinateY = coordinates?.y;

    const desktopWidth = innerWidth;
    const desktopHeight = innerHeight - taskBarHeight;
    const contextMenuCoordinates = contextMenu.current?.getBoundingClientRect();

    if (contextMenuCoordinates.height + coordinateY > desktopHeight) {
      coordinateY = coordinateY - contextMenuCoordinates.height;
    }

    if (contextMenuCoordinates.width + coordinateX > desktopWidth) {
      coordinateX = coordinateX - contextMenuCoordinates.width;
    }

    contextMenu.current.style.top = `${coordinateY}px`;
    contextMenu.current.style.left = `${coordinateX}px`;
  }, [coordinates]);

  const menuItemsElements = menuItems?.map(({ title, option }, i) => {
    if (title === ContextMenuOptionsTitle.separator) {
      return <div key={`${title}-${i}`} className={styles.separator} />;
    } else {
      const isDisabled = title === ContextMenuOptionsTitle.paste && !itemToTransfer;
      const isBackground = title === ContextMenuOptionsTitle.background;

      return (
        <div
          key={`${title}-${i}`}
          className={styles[getContextMenuOptionClassName(isDisabled, isBackground)]}
          onClick={isDisabled || isBackground ? undefined : getHandler({ title, option })}
        >
          <p>{title}</p>
          {isBackground && (
            <>
              <IoChevronForwardSharp className={styles.icon} />
              <div className={styles.backgroundOptionsContainer}>
                <BackgroundOptions closeContextMenu={closeContextMenu} />
              </div>
            </>
          )}
        </div>
      );
    }
  });

  return (
    <OutsideClickHandler onOutsideClick={closeContextMenu}>
      <div className={styles.menu} ref={contextMenu}>
        {menuItemsElements}
      </div>
    </OutsideClickHandler>
  );
};

export default ContextMenu;
