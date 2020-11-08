import { ADD_POST, GET_POST, GET_POSTS, POST_LOADING, RESET_TEXT } from "../actions/types";

const initialState = {
    loading: false,
    post: {},
    posts: [],
    resetText: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            };
        case POST_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case RESET_TEXT:
            return {
                ...state,
                resetText: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
