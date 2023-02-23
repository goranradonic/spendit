import {useMemo, useState} from "react";
import {ApiCallResult, fetchApi} from "../hooks/use-fetch";


export type EventPageData = {
  id:string
  firstName: string
  lastName: string
  age: number
  phone: string
}

export type DataIo = {
    getMakes: () => Promise<ApiCallResult<Array<EventPageData>, unknown>>;
}

export function useDataIo(): {io: DataIo; pendingIO: number} {
    const [pendingIOCount, setPendingIOCount] = useState(0);

    function withPendingIO<T>(fetcher: () => Promise<T>) {
        setPendingIOCount(s => s + 1);
        const promise = fetcher();

        promise.finally(() => {
            setPendingIOCount(s => s - 1);
        });

        return promise;
    }
    const io: DataIo = useMemo(
        () =>({
            getMakes: () =>
                withPendingIO(() => {
                    return fetchApi(`makes`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });
                })
        }), []
    );
    return { io, pendingIO: pendingIOCount };
}
