import { PROCESSING } from "../actions/types";

const initialState = {
    processing: false,
    flag: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROCESSING:
            state.flag += (action.payload ? 1 : -1);
            state.processing = (state.flag !== 0);
            break;
        default:
            break;
    };
    return state;
}
