import { TASK_BAR_HEIGHT, TOP_BAR_HEIGHT } from 'common/constants';
import { useRef, useState } from 'react';

export const useDrag = () => {
  const [draggableTopLimit, setDraggableTopLimit] = useState(0);
  const [draggableBottomLimit, setDraggableBottomLimit] = useState(0);

  const nodeRef = useRef<HTMLDivElement | null>(null);

  const handleDrag = () => {
    const bottomOffset = TASK_BAR_HEIGHT + TOP_BAR_HEIGHT;

    if (nodeRef.current) {
      setDraggableTopLimit(-nodeRef.current.offsetTop);
      setDraggableBottomLimit(innerHeight - nodeRef.current.offsetTop - bottomOffset);
    }
  };

  return { draggableTopLimit, draggableBottomLimit, nodeRef, handleDrag };
};
