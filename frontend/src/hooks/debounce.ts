import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {

    const [debounceText, setDebounceText] = useState<T>();

    useEffect(() => {

        const timerHandler = setTimeout(() => {
            setDebounceText(value);
            console.log("debounce text : ", value);
        }, delay);

        return () => {
            clearTimeout(timerHandler);
        }
    }, [value, delay]);

    return debounceText as T;
}