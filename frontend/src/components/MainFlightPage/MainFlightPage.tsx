import {useEffect, useState} from 'react'
import LoginAndSignUp from './LoginPage'
import FlightTrackerForm from './FlightTracker'
import FlightInfo from './FlightStatus'
import {parseAndFormatDateTime} from '@/utils/datetimefunctions'
import SubscribeDialog from './SubscribeDialog'
import MenubarDemo from './demo'


type FlightInfo = {
  flight_id: string;
  flight_number: string;
  airline: string;
  origin: string;
  destination: string;
  scheduled_departure: string;
  actual_departure: string;
  scheduled_arrival: string;
  actual_arrival: string;
  departure_gate: string;
  arrival_gate: string;
  departure_terminal: string;
  arrival_terminal: string;
  status: string;
  last_updated: string;
  subscription_count: number;
};

function MainFlightPage({setUsername}:{setUsername:any}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [flightData, setFlightData] = useState<FlightInfo>();
  

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      setIsLoggedIn(true);
      console.log('token found')
    }
  },[])

  return (
    <>
   
    {isLoggedIn && <>
    
      {showForm && <><FlightTrackerForm setShowForm={setShowForm} setFlightData={setFlightData}/></>}
      {!showForm && 
        <div className='flex flex-col w-[80%] h-[40%]'>
          <div className='flex justify-end mb-[0.8rem]'>
          <SubscribeDialog flight_id={flightData?.flight_id}/>
          </div>
          <FlightInfo
            flightNumber={flightData?.flight_number}
            departureCity={flightData?.origin}
            departureTime={parseAndFormatDateTime(flightData?.actual_departure)['time']}
            scheduledDeparture={parseAndFormatDateTime(flightData?.scheduled_departure)['time']}
            departureDate={parseAndFormatDateTime(flightData?.actual_departure)['date']}
            arrivalCity={flightData?.destination}
            arrivalTime={parseAndFormatDateTime(flightData?.actual_arrival)['time']}
            arrivalDate={parseAndFormatDateTime(flightData?.actual_arrival)['date']}
            scheduledArrival={parseAndFormatDateTime(flightData?.scheduled_arrival)['time']}
            terminal={flightData?.departure_terminal}
            status={flightData?.status}
          />
          <div className='flex flex-col items-center justify-center mt-[2.5rem]'>
            <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={()=>{
              setShowForm(!showForm)
            }}>
              Track Another Flight
            </button>

          </div>

          
        </div>
      }
    </>}

    {!isLoggedIn && <LoginAndSignUp setUsername={setUsername} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}

    
    </>
    
  )
}

export default MainFlightPage