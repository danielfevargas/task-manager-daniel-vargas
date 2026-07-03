import { useState, useEffect } from "react";
import { Hourglass, AlarmClockOff } from "lucide-react";

function getTimeRemaining(dueDate) {
    const total = new Date(dueDate) - new Date();

    if (total <= 0) {
        return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        expired: false,
        days: Math.floor(total / (1000 * 60 * 60 * 24)),
        hours: Math.floor((total / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((total / (1000 * 60)) % 60),
        seconds: Math.floor((total / 1000) % 60),
    };
}

export function CountdownTimer({ dueDate }) {
    const [time, setTime] = useState(() => getTimeRemaining(dueDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTimeRemaining(dueDate));
        }, 1000);

        return () => clearInterval(interval);
    }, [dueDate]);

    if (time.expired) {
        return (
            <span className="countdown expired">
                <AlarmClockOff size={13} /> Vencida
            </span>
        );
    }

    return (
        <span className="countdown">
            <Hourglass size={13} /> {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
        </span>
    );
}