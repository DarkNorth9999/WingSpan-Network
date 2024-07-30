"use client";
import { PinContainer } from "../ui/PinCard";
import maps from '@/assets/maps.png'

export default function AnimatedPinDemo() {
  return (
    <div className="h-[40rem] w-full flex items-center justify-center pb-2">
      <PinContainer
        title="Find your Flight"
        href="https://github.com/DarkNorth9999"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[25rem] h-[30rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Find your flight
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
              Get notified in real-time every time the status of your flight changes
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500">
            <img src={maps} alt="" />
          </div>
        </div>
      </PinContainer>
    </div>
  );
}
