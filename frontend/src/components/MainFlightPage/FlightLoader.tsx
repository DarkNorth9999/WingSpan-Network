import { MultiStepLoader as Loader } from "@/components/ui/MultiStepLoader";

const loadingStates = [
    {
      text: "Packing your bags...",
    },
    {
      text: "Checking in your luggage...",
    },
    {
      text: "Going through security...",
    },
    {
      text: "Grabbing a coffee at the terminal...",
    },
    {
      text: "Finding your gate...",
    },
    {
      text: "Boarding the plane...",
    },
    {
      text: "Finding your seat...",
    },
    {
      text: "Fastening your seatbelt...",
    },
    {
      text: "Preparing for takeoff...",
    },
    {
      text: "Enjoy your flight!",
    },
  ];
  

export default function FlightLoader() {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Loader loadingStates={loadingStates} loading={true} duration={1000} />
    </div>
  );
}
