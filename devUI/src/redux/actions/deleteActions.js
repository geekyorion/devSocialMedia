import { CLEAR_DELETE, INIT_DELETE } from "./types";

export const initDelete = (deleteInfo) => ({
    type: INIT_DELETE,
    payload: deleteInfo
});

export const clearDelete = () => ({ type: CLEAR_DELETE });
