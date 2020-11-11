import {
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_LOADING,
    REPLACE_POST,
    RESET_TEXT,
} from "../actions/types";

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
        case REPLACE_POST:
            for (let i = 0; i < state.posts.length; i++) {
                if (state.posts[i]._id === action.payload._id) {
                    state.posts[i] = action.payload;
                    break;
                }
            }
            return { ...state };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
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
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        default:
            return state;
    }
}
