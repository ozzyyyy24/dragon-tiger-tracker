import React, { useEffect } from 'react';

const PHMapaladGame = () => {
  useEffect(() => {
    window.location.href = "https://www.phmapalad.co/seamless?gameType=LIVE";
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Redirecting to PH Mapalad Game...</h2>
    </div>
  );
};

export default PHMapaladGame;
