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
import { BACKGROUND_OPTIONS_SIZE, TASK_BAR_HEIGHT } from 'common/constants';

interface ContextMenuProps {
  coordinates: Coordinates;
  closeContextMenu: () => void;
  menuItems: IMenuItem[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({ coordinates, menuItems, closeContextMenu }) => {
  const itemToTransfer = useAppSelector((state) => state.contextMenu.itemToTransfer);
  const activeWindow = useAppSelector((state) => state.desktop.activeWindow);

  const getHandler = useContextMenuHandler(closeContextMenu);

  const contextMenu = useRef<HTMLDivElement | null>(null);
  const backgroundOptions = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contextMenu.current) return;

    let coordinateX = coordinates?.x;
    let coordinateY = coordinates?.y;

    const desktopWidth = innerWidth;
    const desktopHeight = innerHeight - TASK_BAR_HEIGHT;
    const contextMenuCoordinates = contextMenu.current.getBoundingClientRect();
    const verticalSize = contextMenuCoordinates.height + coordinateY;
    const horizontalSize = contextMenuCoordinates.width + coordinateX;

    if (verticalSize > desktopHeight) {
      coordinateY = coordinateY - contextMenuCoordinates.height;
    }

    if (horizontalSize > desktopWidth) {
      coordinateX = coordinateX - contextMenuCoordinates.width;
    }

    if (backgroundOptions.current) {
      backgroundOptions.current.style.top =
        verticalSize + BACKGROUND_OPTIONS_SIZE.height > desktopHeight
          ? `${BACKGROUND_OPTIONS_SIZE.topOffsetInverted}px`
          : `${BACKGROUND_OPTIONS_SIZE.topOffset}px`;

      backgroundOptions.current.style.left =
        horizontalSize + BACKGROUND_OPTIONS_SIZE.width > desktopWidth
          ? `${BACKGROUND_OPTIONS_SIZE.leftOffsetInverted}px`
          : `${BACKGROUND_OPTIONS_SIZE.leftOffset}px`;
    }

    contextMenu.current.style.top = `${coordinateY}px`;
    contextMenu.current.style.left = `${coordinateX}px`;
  }, [coordinates]);

  const menuItemsElements = menuItems?.map(({ title, option }, i) => {
    if (title === ContextMenuOptionsTitle.separator) {
      return <div key={`${title}-${i}`} className={styles.separator} />;
    } else {
      const isPasteOptionDisabled = title === ContextMenuOptionsTitle.paste && !itemToTransfer;
      const isBackground = title === ContextMenuOptionsTitle.background;
      const isRestoreOptionDisabled =
        title === ContextMenuOptionsTitle.restore &&
        !activeWindow?.isMaximized &&
        !activeWindow?.isMinimized;
      const isMaximizeOptionDisabled =
        title === ContextMenuOptionsTitle.maximize &&
        !!(activeWindow?.isMinimized || activeWindow?.isMaximized);
      const isMinimizeOptionDisabled =
        title === ContextMenuOptionsTitle.minimize && !!activeWindow?.isMinimized;

      const isDisabled =
        isPasteOptionDisabled ||
        isRestoreOptionDisabled ||
        isMaximizeOptionDisabled ||
        isMinimizeOptionDisabled;

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
              <div className={styles.backgroundOptionsContainer} ref={backgroundOptions}>
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
