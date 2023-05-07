import {useState} from "react";
import {HttpError} from "@/data/HttpErrors";

export default function useApiCall<T>(defaultValue: T) {
    const [data, setData] = useState<T>(defaultValue)
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string | null>(null);

    const onStart = () => {
        setError(null);
        setLoading(true);
    }

    const onComplete = () => {
        setLoading(false);
    }

    const onFail = (error: any) => {
        console.error(error)
        if (error instanceof HttpError)
            setError(error.message || "Something went wrong");
    }

    return {
        data,
        loading,
        error,
        setData,
        setError,
        setLoading,
        onStart,
        onComplete,
        onFail,
    }
}