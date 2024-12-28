import { useEffect, useState } from "react";
import logo from "./logo.svg";

export function CrashLogo() {
  const [planetCrashing, setPlanetCrashing] = useState(false);
  const [showRipples, setShowRipples] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);

  useEffect(() => {
    const planetTimeout = setTimeout(() => {
      setPlanetCrashing(true);
    }, 1000);

    const rippleTimeout = setTimeout(() => {
      setShowRipples(true);
    }, 1300);

    const landedTimeout = setTimeout(() => {
      setHasLanded(true);
    }, 1400); // Set after crash animation completes

    return () => {
      clearTimeout(planetTimeout);
      clearTimeout(rippleTimeout);
      clearTimeout(landedTimeout);
    };
  }, []);

  return (
    <>
      <div className="relative">
        <div 
          className={`
            absolute -top-80 left-1/2 -translate-x-1/2 transition-none
            ${planetCrashing ? 'visible animate-crash' : 'invisible -translate-y-[200vh] -translate-x-[200vw]'}
          `}
        >
          <div className="relative">
            <div className={`
              relative z-10 w-[320px] h-[320px]
              ${hasLanded ? 'animate-spin-record' : ''}
            `}>
              <img src={logo} alt="Logo" className="w-full h-full" />
            </div>
            
            {showRipples && (
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 animate-ripple bg-primary/60 rounded-full" />
                <div className="absolute inset-0 animate-ripple animation-delay-100 bg-primary/40 rounded-full" />
                <div className="absolute inset-0 animate-ripple animation-delay-200 bg-primary/20 rounded-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}