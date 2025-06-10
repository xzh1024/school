import { useEffect, useRef, useState } from 'react';

function useTyping(text, delay = 200) {
  const [typingText, setTypingText] = useState('');
  const intervalRef = useRef(null);
  const typingIndex = useRef(null);

  useEffect(() => {
    if (text) {
      typingIndex.current = 0;
      intervalRef.current = setInterval(() => {
        setTypingText(typingText => {
          const currentText = text.slice(0, typingIndex.current + 1);
          if (typingIndex.current + 1 === text.length && intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return currentText;
        });
        typingIndex.current = typingIndex.current + 1;
      }, delay);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text]);

  return typingText;
}
export default useTyping;
