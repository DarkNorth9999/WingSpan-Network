// @ts-nocheck
import React from 'react';
import Timeline from '@/components/ui/PlaneTimeline'
import { convertDateFormat } from '@/utils/datetimefunctions';
import {FlightInfoProps} from '@/types/flightinfoprops'

const FlightInfo: React.FC<FlightInfoProps> = ({ flightNumber, departureCity, departureTime, departureDate, scheduledDeparture, arrivalCity, arrivalTime, arrivalDate ,scheduledArrival, terminal, status }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-[100%] h-[100%] flex flex-col justify-between">
            <div className="flex items-center justify-between">
                <div>
                    <span className="font-bold text-orange-500">{departureCity}</span> → <span className="font-bold text-orange-500">{arrivalCity}</span>
                </div>
                <div className="text-sm text-gray-500">
                    Terminal {terminal}
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    <span className="font-semibold">{departureCity}</span>
                </div>
                <div className="text-sm text-gray-500">
                    <span className="font-semibold">{arrivalCity}</span>
                </div>
            </div>
            <Timeline status={status} />
            <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-orange-500">
                    Flight {flightNumber}
                </span>
                <span className="text-xs text-green-500 font-bold uppercase">
                    {status}
                </span>
            </div>
            <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">
                Actual Departure 
                {/* - {convertDateFormat(departureDate)} {departureTime} (<span className="line-through">{scheduledDeparture}</span>) */}
                </span>
               <span className="text-sm text-gray-500">
                Estimated Arrival 
                {/* - {convertDateFormat(arrivalDate)} {arrivalTime} (<span className="line-through">{scheduledArrival}</span>) */}
               </span>
               
            </div>

            <div className="flex items-center justify-between mt-2">
                <span>
                <span className=''>{convertDateFormat(departureDate)} <span className='text-lg font-semibold'>{departureTime}</span></span> 
                <span className='font-thin'> (<span className="line-through font-thin">{scheduledDeparture}</span>)</span>
                </span>
               <span>
                <span className=''>{convertDateFormat(arrivalDate)} <span className='text-lg font-semibold'>{arrivalTime}</span></span> 
                <span className='font-thin'> (<span className="line-through">{scheduledArrival}</span>)</span>
               </span>
               
            </div>
        </div>
    );
};

export default FlightInfo;
