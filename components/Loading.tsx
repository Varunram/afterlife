// components/Loading.tsx

import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <img
          src="/tinywarp.svg"
          alt="Loading"
          className="w-20 h-20 mx-auto animate-spin"
        />
        <h1 className="mt-4 text-2xl font-bold">
          Welcome to Developers
        </h1>
      </div>
    </div>
  );
};

export default Loading;
