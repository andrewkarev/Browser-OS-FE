import React, { useState } from 'react';
import Desktop from 'components/Desktop';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import Taskbar from 'components/Taskbar';
import { useAppSelector } from 'hooks/redux';

const HomePage = () => {
  //
  const isPending = useAppSelector((state) => state.desktop.isPending);

  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseCoordinates({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={(e) => handleMouseMove(e)} style={{ cursor: isPending ? 'none' : 'default' }}>
      <Container>
        <Desktop />
        <Taskbar />
        <Spinner mouseCoordinates={mouseCoordinates} />
      </Container>
    </div>
  );
};

export default HomePage;
