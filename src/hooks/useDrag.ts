import { useRef, useState } from 'react';

export const useDrag = () => {
  const [draggableTopLimit, setDraggableTopLimit] = useState(0);

  const nodeRef = useRef<HTMLDivElement | null>(null);

  const handleDrag = () => {
    if (nodeRef.current) {
      setDraggableTopLimit(-nodeRef.current.offsetTop);
    }
  };

  return { draggableTopLimit, nodeRef, handleDrag };
};
