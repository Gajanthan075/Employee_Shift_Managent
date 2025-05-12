import React, { useState } from "react";
import CheckLocationButtons from "../location/CheckLocationButtons";
import MapDisplay from "../dashboardComponents/MapDisplay.jsx";

const MapSection = () => {
  const [location, setLocation] = useState(null);

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-2 text-white">Location Map</h2>

      <div className="bg-gray-700 rounded-xl flex items-center justify-center h-[300px] mb-6">
        {location ? (
          <MapDisplay
            latitude={location.latitude}
            longitude={location.longitude}
          />
        ) : (
          <span className="text-gray-400">[Map Placeholder]</span>
        )}
      </div>

      <div className="max-w-xl mx-auto">
        <CheckLocationButtons setLocation={setLocation} />
      </div>
    </div>
  );
};

export default MapSection;
