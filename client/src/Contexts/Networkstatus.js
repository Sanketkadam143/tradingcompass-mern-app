import { useState, useEffect } from 'react';

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  const status=(()=>{
   try{ fetch('https://www.google.com/', {
        mode: 'no-cors',
      })
        .then(() => !isOnline && setIsOnline(true))
        .catch(() => isOnline && setIsOnline(false));}catch(error){}
  })


  useEffect(() => {
    
    status();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
     status();
    }, 20000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  return { isOnline };
};

export default useNetworkStatus;