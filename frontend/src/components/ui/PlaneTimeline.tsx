
import { useEffect, useState } from 'react';
import PlaneIcon from '../../assets/PlaneIcon.png'

const Timeline = ({ status }:{status:any}) => {

  const [position, setPosition] = useState(10);

  useEffect(()=>{
    status=='Scheduled'?setPosition(0):status=='Departed'?setPosition(50):status=='Arrived'?setPosition(100):status=='Delayed'?setPosition(0):setPosition(10);
  },[])
 
  return (
    <div className="relative w-full h-6">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-0.5 bg-gray-300">
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2" style={{ left: `${position}%` }}>
        <img src={PlaneIcon} alt="Plane Icon" className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Timeline;
