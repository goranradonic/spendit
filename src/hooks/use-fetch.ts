import {suspend, tuple} from "../missing-ts-parts";

export type ApiCallResult<T, E = unknown> =
    | {
    tag: "loaded";
    data: T;
    status: number;
}
    | {
    tag: "failed";
    error: unknown;
    response: E;
    status: number;
};
export function fetchApi<T, E = unknown>(endpoint: RequestInfo, options?: RequestInit): Promise<ApiCallResult<T, E>> {


    return suspend(() => fetch(`http://localhost:8080/api/${endpoint}`, options), 0)()
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            if (response.headers.get("content-type") === "application/json") {
                return response.json().then(json => tuple(json as unknown, response.status));
            } else {
                return response.text().then(text => tuple(text, response.status));
            }
        })
        .then(([json, status]) => {
            return {
                tag: "loaded" as "loaded",
                data: json as T,
                status: status,
            };
        })
        .catch(error => {
            return {
                tag: "failed",
                error: error,
                response: error.statusText,
                status: error.status,
            };
        });
}

