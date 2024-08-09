import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const withLoading = (WrappedComponent: React.FC) => {
  return () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setLoaded(true);
        }, 50); // Slight delay to trigger the fade-in transition
      }, 3000); // Set the duration of the loading screen here

      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={`fade-in ${loaded ? 'loaded' : ''}`}>
            <WrappedComponent />
          </div>
        )}
      </>
    );
  };
};

export default withLoading;
