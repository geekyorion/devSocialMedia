import { CLEAR_ERRORS, SET_ERRORS } from "./types";

// store the errors in the store and returns
export const setErrors = (errors) => ({
    type: SET_ERRORS,
    payload: errors,
});


// clear the errors in the store
export const clearErrors = () => ({
    type: CLEAR_ERRORS,
});
