import { PROCESSING } from "./types";

export const setProcessing = (isProcessing) => ({
    type: PROCESSING,
    payload: isProcessing,
});
