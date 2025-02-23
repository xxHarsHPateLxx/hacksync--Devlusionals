import { useState, useEffect } from 'react';

export default function useAudioProgress(initialProgress = 0) {
  const [progress, setProgress] = useState(initialProgress);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        let next = prev + 1;
        if (next > 100) next = 100;
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return progress;
}
