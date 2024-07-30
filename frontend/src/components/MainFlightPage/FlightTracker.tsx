import { useState, useEffect } from "react";
import React from "react";
import { Label } from "../ui/Form/Label";
import { Input } from "../ui/Form/Input";
import { cn } from "../../utils/cn";
import DatetimePickerGranularity from '@/components/ui/DateTimePicker'
import axiosInstance from "@/utils/axios";

function formatDateToLocalISOString(date) {
  const pad = (num) => num.toString().padStart(2, '0');

  const year = date.getFullYear();           // Get the local year
  const month = pad(date.getMonth() + 1);    // Get the local month (0-indexed, hence +1)
  const day = pad(date.getDate());           // Get the local day
  const hours = pad(date.getHours());        // Get the local hours
  const minutes = pad(date.getMinutes());    // Get the local minutes
  const seconds = pad(date.getSeconds());    // Get the local seconds

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}


export default function SignupFormDemo({setShowForm, setFlightData}) {
    const [isLoading, setIsLoading] = useState(false); 
    const [date, setDate] = React.useState<Date | undefined>(new Date('Thu Aug 01 2024 07:00:00 GMT+0530 (India Standard Time)'));

    useEffect(()=>{
      // if(date) console.log(date);
    },[date])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);  

        if(!date){
          return;
        }

        const queryParams = new URLSearchParams({
            flight_number: e.target.flightNumber.value, 
            date_of_flight: formatDateToLocalISOString(date),
            departure_airport: e.target.departure.value,
            arrival_airport: e.target.arrival.value,
          }).toString();

        try {
            const API_URL = import.meta.env.VITE_API_URL
            console.log(queryParams)
            console.log(API_URL)
            const response = await axiosInstance.get(`/flights/search?${queryParams}`, {  
              method: 'GET'
            });
            let data = response.data;
            console.log(data); 
            data = JSON.parse(data) 
            setFlightData(data);
            setIsLoading(false);  
            setShowForm(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);  
        }
    };







  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to WingSpan!
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Track your Flight
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="departure">Departure Airport</Label>
            <Input id="departure" name='departure' placeholder="JFK" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="arrival">Arrival Airport</Label>
            <Input id="arrival" name='arrival' placeholder="LAX" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="flightNumber">Flight Number</Label>
          <Input id="flightNumber" name='flightNumber' placeholder="UA302" type="text" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-6">
          <Label htmlFor="date-of-flight">Date of Flight</Label>
          <DatetimePickerGranularity date={date} setDate={setDate}/>
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Search Flight &rarr;
          <BottomGradient />
        </button>
        
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
