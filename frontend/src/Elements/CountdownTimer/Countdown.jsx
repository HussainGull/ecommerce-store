import {useEffect, useState, useCallback} from "react";

export default function Countdown(
    {initialDays = 0, initialHours = 0, initialMinutes = 0, initialSeconds = 0}
) {
    const [countDownTime, setCountDownTime] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    const calculateTargetDate = () => {
        const now = new Date();
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + parseInt(initialDays),
            now.getHours() + parseInt(initialHours),
            now.getMinutes() + parseInt(initialMinutes),
            now.getSeconds() + parseInt(initialSeconds)
        ).getTime();
    };

    const getTimeDifference = (targetTime) => {
        const currentTime = new Date().getTime();
        const timeDifference = targetTime - currentTime;

        const formatUnit = (unit) => (unit >= 10 ? unit.toString() : `0${unit}`);

        const days = formatUnit(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
        const hours = formatUnit(Math.floor((timeDifference / (1000 * 60 * 60)) % 24));
        const minutes = formatUnit(Math.floor((timeDifference / (1000 * 60)) % 60));
        const seconds = formatUnit(Math.floor((timeDifference / 1000) % 60));

        if (timeDifference <= 0) {
            setCountDownTime({days: "00", hours: "00", minutes: "00", seconds: "00"});
        } else {
            setCountDownTime({days, hours, minutes, seconds});
        }
    };

    const startCountdown = useCallback(() => {
        const target = calculateTargetDate();
        const interval = setInterval(() => {
            getTimeDifference(target);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const clear = startCountdown();
        return () => clear && clear();
    }, [startCountdown]);

    const timeUnits = [
        {value: countDownTime.days, label: "Day", plural: "Days"},
        {value: countDownTime.hours, label: "Hour", plural: "Hours"},
        {value: countDownTime.minutes, label: "Minute", plural: "Minutes"},
        {value: countDownTime.seconds, label: "Second", plural: "Seconds"},
    ];

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-3 sm:gap-4">
            <div
                className="flex justify-center md:justify-end items-center gap-1 sm:gap-2 md:gap-4"> {/* Adjusted gap for small screens */}
                {timeUnits.map((item, index) => (
                    <div className="flex flex-col items-start min-w-[40px] sm:min-w-[50px] md:min-w-[unset]"
                         key={index}> {/* Reduced min-width for very small screens */}
                        <span
                            className="text-black text-[10px] sm:text-xs md:text-sm font-medium mb-0.5 sm:mb-1 leading-tight"> {/* Smaller text for labels */}
                            {item.value === "01" ? item.label : item.plural}
                </span>
                        <div
                            className="text-2xl sm:text-[24px] lg:text-4xl font-semibold text-black leading-none"> {/* Smaller text for time values */}
                            {item.value}
                        </div>
                    </div>
                )).reduce((acc, curr, i, arr) => {
                    acc.push(curr);
                    if (i < arr.length - 1) {
                        acc.push(
                            <div
                                key={`colon-${i}`}
                                className="text-hover-warn text-xl sm:text-2xl md:text-3xl font-bold leading-none px-0.5 sm:px-1" // Smaller colon for small screens
                            >
                                :
                            </div>
                        );
                    }
                    return acc;
                }, [])}
            </div>
        </div>
    );
};

