import React, { useState } from 'react';
import styles from './TextRedactor.module.scss';

interface TextRedactorProps {
  content: string;
}

const TextRedactor: React.FC<TextRedactorProps> = ({ content }) => {
  const [value, setValue] = useState(() => content);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setValue(target.value);
  };

  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={(e) => handleInput(e)}
      autoFocus
    ></textarea>
  );
};

export default TextRedactor;
