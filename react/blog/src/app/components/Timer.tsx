'use client'
import { useEffect, useState } from 'react';
const Timer = () => { 

    const targetData = '2025-03-09T17:00:00';
    interface TimeLeft {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }

    const useCountDown = (targetData: string): TimeLeft => { 
            const countDownDate = new Date(targetData).getTime();
            const [countDown, setCountDown] = useState<number>(countDownDate - new Date().getTime());
            useEffect(() => { 
                    const interval = setInterval(() => { 
                            setCountDown(countDownDate - new Date().getTime());
                    }, 1000);
                    return () => clearInterval(interval);
            }, [countDownDate]);
            return getReturnValues(countDown);
    }
    const getReturnValues = (countDown: number): TimeLeft => { 
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
    }
    const { days, hours, minutes, seconds } = useCountDown(targetData);
    const formatData = (data: number): string | number => { 
        return data < 10 ? `0${data}` : data;
    }
    return ( 
        <div className="w-full flex flex-wrap md:flex-row gap-14 justify-start items-center font-anon px-40">
            <div className="text-text flex-col flex justify-center items-center">
                <h1 className="text-6xl md:text-7xl lg:text-8xl">
                    {formatData(days)}
                </h1>
                <h1 className="text-md md:text-xl font-extralight">Days</h1>
            </div>
            <div className="text-text flex-col flex justify-center items-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl">
                    {formatData(hours)}
                </h1>
                <h1 className="text-md md:text-xl font-extralight">Hours</h1>
            </div>
            <div className="text-text flex-col flex justify-center items-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl">
                    {formatData(minutes)}
                </h1>
                <h1 className="text-md md:text-xl font-extralight">Minutes</h1>
            </div>
            <div className="text-text flex-col flex justify-center items-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl">
                    {formatData(seconds)}
                </h1>
                <h1 className="text-md md:text-xl font-extralight">Seconds</h1>
            </div>
        </div>
    )
}
export default Timer;