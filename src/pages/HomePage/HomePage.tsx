import React, { useEffect, useState } from 'react';
import Desktop from 'components/Desktop';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import Taskbar from 'components/Taskbar';
import { useAppSelector } from 'hooks/redux';
import ContextMenu from 'components/ContextMenu';
import { useContextMenu } from 'hooks/useContextMenu';
import { useNavigate } from 'react-router-dom';
import AppPaths from 'common/routes';

const HomePage = () => {
  const isPending = useAppSelector((state) => state.desktop.isPending);
  const coordinates = useAppSelector((state) => state.contextMenu.coordinates);
  const isContextMenuOpened = useAppSelector((state) => state.contextMenu.isContextMenuOpened);
  const menuItems = useAppSelector((state) => state.contextMenu.menuItems);
  const isError = useAppSelector((state) => state.desktop.isError);

  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  const { closeContextMenu } = useContextMenu();

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) navigate(AppPaths.NOT_FOUND);
  }, [isError, navigate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseCoordinates({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={(e) => handleMouseMove(e)} style={{ cursor: isPending ? 'none' : 'default' }}>
      <Container>
        <Desktop />
        <Taskbar />
        <Spinner mouseCoordinates={mouseCoordinates} />
        {isContextMenuOpened && (
          <ContextMenu
            coordinates={coordinates}
            closeContextMenu={closeContextMenu}
            menuItems={menuItems}
          />
        )}
      </Container>
    </div>
  );
};

export default HomePage;
