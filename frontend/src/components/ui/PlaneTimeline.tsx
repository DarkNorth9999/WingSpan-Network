import React from 'react';
import PlaneIcon from '../../assets/PlaneIcon.png'

const Timeline = ({ position }) => {
  // position should be a value between 0 and 100 representing percentage along the timeline
  return (
    <div className="relative w-full h-6">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-0.5 bg-gray-300">
        {/* Static line */}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: `${position}%` }}>
        <img src={PlaneIcon} alt="Plane Icon" className="w-8 h-8" />
        {/* Replace the path d attribute with your plane SVG path */}
      </div>
    </div>
  );
};

export default Timeline;
