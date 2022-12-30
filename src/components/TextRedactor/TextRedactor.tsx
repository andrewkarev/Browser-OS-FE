import React from 'react';
import styles from './TextRedactor.module.scss';

interface TextRedactorProps {
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
  textValue: string;
}

const TextRedactor: React.FC<TextRedactorProps> = ({ setTextValue, textValue }) => {
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setTextValue(target.value);
  };

  return (
    <textarea
      className={styles.textarea}
      value={textValue}
      onChange={(e) => handleInput(e)}
      autoFocus
    ></textarea>
  );
};

export default TextRedactor;
