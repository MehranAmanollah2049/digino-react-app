import React, { useEffect, useState } from "react";

type ValidationCallback = (value: any) => string | null;

interface ReturnType {
    data: any,
    setData: React.Dispatch<any>,
    error: string | null,
    isValid: () => boolean,
    setError: React.Dispatch<any>
}

export function useField(validationCallBack: ValidationCallback, intialValue: any = ''): ReturnType {
    const [data, setData] = useState<any>(intialValue);
    const [error, setErrorMsg] = useState<string | null>(null)

    const isValid = () => !validationCallBack(data);

    const setError = () => {
        if (!isValid()) {
            setErrorMsg(validationCallBack(data))
        }
    }

    useEffect(() => {
        if (isValid()) {
            setErrorMsg('')
        }
    }, [data])

    return {
        data,
        setData,
        error,
        isValid,
        setError
    }
}