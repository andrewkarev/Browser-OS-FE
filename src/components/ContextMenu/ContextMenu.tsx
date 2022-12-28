import React, { useEffect, useRef } from 'react';
import { Coordinates } from 'types/Coordinates';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './ContextMenu.module.scss';
import { useAppSelector } from 'hooks/redux';
import { IMenuItem } from 'types/IMenuItem';
import ContextMenuOptionsTitle from 'common/contextMenuOptionsTitle';
import { useContextMenuHandler } from 'hooks/useContextMenuHandler';

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

    // const taskBarHeight = 28;

    // let coordinateX = coordinates?.x;
    // let coordinateY = coordinates?.y;

    // const desktopWidth = innerWidth;
    // const desktopHeight = innerHeight - taskBarHeight;
    // const contextMenuCoordinates = contextMenu.current?.getBoundingClientRect();

    // console.log(contextMenuCoordinates);
    // if (contextMenuCoordinates.bottom > desktopHeight) {
    //   coordinateY = contextMenuCoordinates.top - contextMenuCoordinates.height;
    // }

    // if (contextMenuCoordinates.right > desktopWidth) {
    //   coordinateX = contextMenuCoordinates.left - contextMenuCoordinates.width;
    // }

    const coordinateX = coordinates?.x;
    const coordinateY = coordinates?.y;

    contextMenu.current.style.top = `${coordinateY}px`;
    contextMenu.current.style.left = `${coordinateX}px`;
  }, [coordinates]);

  const menuItemsElements = menuItems?.map(({ title, option }, i) => {
    if (title === ContextMenuOptionsTitle.separator) {
      return <hr key={`${title}-${i}`} className={styles.separator} />;
    } else {
      const isDisabled = title === ContextMenuOptionsTitle.paste && !itemToTransfer;

      return (
        <div
          key={`${title}-${i}`}
          className={isDisabled ? styles.menuitemDisabled : styles.menuitem}
          onClick={isDisabled ? undefined : getHandler({ title, option })}
        >
          {title}
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
