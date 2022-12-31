import { useRef, useState } from 'react';

export const useDrag = () => {
  const [draggableTopLimit, setDraggableTopLimit] = useState(0);
  const [draggableBottomLimit, setDraggableBottomLimit] = useState(0);

  const nodeRef = useRef<HTMLDivElement | null>(null);

  const handleDrag = () => {
    const bottomOffset = 57;

    if (nodeRef.current) {
      setDraggableTopLimit(-nodeRef.current.offsetTop);
      setDraggableBottomLimit(innerHeight - nodeRef.current.offsetTop - bottomOffset);
      console.log(nodeRef.current.offsetHeight);
    }
  };

  return { draggableTopLimit, draggableBottomLimit, nodeRef, handleDrag };
};
