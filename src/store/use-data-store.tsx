import {useReducer} from "react";
import { EventPageData } from "./use-data-io";

export type DataStoreState = {
    data: [] | Array<EventPageData>,
    total: number,
    page: number,
    perPage: number,
};

export type DataStoreAction = {tag:'set-data'; value: Array<EventPageData>, count:number}

export function useDataStore() {
    function reducer(state:DataStoreState, action:DataStoreAction):DataStoreState {

        if(action.tag === 'set-data'){
            return {...state,  data: action.value, total: action.count, page: 1, perPage: 10}
        }
        return state
    }
    const [state, dispatch] = useReducer(reducer, {
        data: [],
        total: 0,
        page: 0,
        perPage: 10,
    });

    return { state, dispatch };
}
