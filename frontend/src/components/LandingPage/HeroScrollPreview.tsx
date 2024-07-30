// HeroScrollDemo.tsx
import { ContainerScroll } from "../ui/HeroScroll"; // Adjust the import path as necessary
import MainFlightPage from '../MainFlightPage/MainFlightPage'

export default function HeroScrollDemo({setUsername}:{setUsername:any}) {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
               Real-time <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Flight Tracking
              </span>
            </h1>
          </>
        }
      >
        <MainFlightPage setUsername={setUsername}/>
      </ContainerScroll>
    </div>
  );
}
