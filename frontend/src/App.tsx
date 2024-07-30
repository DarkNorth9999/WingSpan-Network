import { SparklesPreview } from './components/LandingPage/SparklesPreview'
import HeroScrollDemo from './components/LandingPage/HeroScrollPreview'
import GlobeDemo from './components/LandingPage/Globe'
import AnimatedPinDemo from './components/LandingPage/PinContainerDemo'
import FloatingNavbar from './components/MainFlightPage/Navbar'
import { useRef, useState } from 'react'


function App() {
  const mainPageRef = useRef(null)
  const [username, setUsername] = useState(null);

  return (
    <>
    <FloatingNavbar mainPageRef={mainPageRef} username={username}/>
    <SparklesPreview/>
    <div ref={mainPageRef}><HeroScrollDemo setUsername={setUsername}/></div>
    <div className='mt-10'>
      <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
        Real-Time Notifications
      </h2>
      <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
        Track flights worldwide
      </p>
    </div>
    <div className='flex gap-4 items-center justify-center'>
    <AnimatedPinDemo/>
      <GlobeDemo/>
    </div>
    </>
  )
}

export default App
