import React, {ReactNode, useEffect, useMemo} from "react";
import {DataIo, useDataIo} from "./use-data-io";
import {DataStoreAction, DataStoreState, useDataStore} from "./use-data-store";


export const StoreContext = React.createContext<{
    state: DataStoreState,
    io: DataIo;
    pendingIO: number;
    dispatch: React.Dispatch<DataStoreAction>
}>(null as any);


export function Store(props: { children: ReactNode }) {

    const {state, dispatch} = useDataStore();
    const {io, pendingIO} = useDataIo();


    const contextValue = useMemo(() => ({state, io, pendingIO, dispatch}), [state, io, pendingIO, dispatch])


    useEffect(() => {
        io.getMakes().then(async res => {
            if (res.tag === "loaded") {
                dispatch({tag: 'set-data', value: res.data, count: res.data.length})
            }
        })
    }, []);


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
