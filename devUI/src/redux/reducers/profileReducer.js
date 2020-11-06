import {
    CLEAR_PROFILE,
    GET_ALL_PROFILES,
    GET_PROFILE,
    PROFILE_LOADING
} from "../actions/types";

const initialState = {
    profile: null,
    profiles: null,
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null
            };
        case GET_ALL_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }
        default:
            return state
    }
}
