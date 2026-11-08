import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface AndroidDeviceFrameProps {
  isAndroidView: boolean;
  children: React.ReactNode;
}

export const AndroidDeviceFrame: React.FC<AndroidDeviceFrameProps> = ({
  isAndroidView,
  children,
}) => {
  const [time, setTime] = useState('10:30');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isAndroidView) {
    return <div className="w-full min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#1c1a1a] py-6 sm:py-10 px-2 sm:px-4 flex flex-col items-center justify-start">
      {/* Device wrapper */}
      <div className="relative w-full max-w-[420px] h-[880px] bg-[#222] rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-4 border-[#3a3536] flex flex-col overflow-hidden">
        {/* Android Punch Hole & Speaker */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-black z-50 ring-1 ring-white/10" />

        {/* Android Status Bar */}
        <div className="h-7 w-full bg-[#EEEFE8] px-6 flex items-center justify-between text-xs text-[#2D2322] font-semibold shrink-0 z-40 select-none">
          <span className="text-[11px]">{time}</span>
          <div className="flex items-center gap-1.5 opacity-80">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Inner Screen viewport */}
        <div className="flex-1 w-full bg-[#EEEFE8] rounded-[36px] overflow-hidden flex flex-col relative">
          <div className="flex-1 overflow-y-auto relative no-scrollbar">
            {children}
          </div>

          {/* Android Gesture Bar */}
          <div className="absolute bottom-1 inset-x-0 h-4 flex items-center justify-center pointer-events-none z-50">
            <div className="w-28 h-1 rounded-full bg-black/30" />
          </div>
        </div>
      </div>
    </div>
  );
};
