import React, { useState } from "react";
import DragonTigerTracker from './DragonTigerTracker';
import PHMapaladGame from './PHMapaladGame';

function App() {
  const [showTracker, setShowTracker] = useState(true);

  return (
    <div>
      <div style={{ padding: "10px", textAlign: "center" }}>
        <button
          onClick={() => setShowTracker(!showTracker)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid gray",
            backgroundColor: "#f3f3f3",
            cursor: "pointer"
          }}
        >
          {showTracker ? "Go to PH Mapalad Game" : "Go to Dragon Tiger Tracker"}
        </button>
      </div>

      {showTracker ? <DragonTigerTracker /> : <PHMapaladGame />}
    </div>
  );
}

export default App;
