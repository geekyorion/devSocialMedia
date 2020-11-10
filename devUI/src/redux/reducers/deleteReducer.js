import { CLEAR_DELETE, INIT_DELETE } from "../actions/types";

const initialState = {
    modalType: null,
    modalFunc: null,
    modalParam: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case INIT_DELETE:
            return {
                modalType: action.payload.modalType,
                modalFunc: action.payload.modalFunc,
                modalParam: action.payload.modalParam || null,
            };
        case CLEAR_DELETE:
            return initialState;
        default:
            return state;
    };
}
