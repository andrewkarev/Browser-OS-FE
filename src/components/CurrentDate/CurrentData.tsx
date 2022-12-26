import React, { useEffect, useState } from 'react';
import styles from './CurrentDate.module.scss';

const CurrentDate = () => {
  const [date, setDate] = useState('');

  useEffect(() => {
    const formatTime = (time: string) => {
      const lastColonId = time.lastIndexOf(':');
      return time.slice(0, lastColonId);
    };

    const intervalID = setInterval(() => {
      const now = new Date();
      const element = now.toString().split(' ');
      const dateTime = `${element[0]}, ${element[1]} ${element[2]}. ${formatTime(element[4])}`;

      setDate(dateTime);
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return <div className={styles.currentDate}>{date}</div>;
};

export default CurrentDate;
