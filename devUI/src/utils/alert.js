const { toast } = require('react-toastify');

const emitToaster = ({
    position = 'top-right',
    autoClose = 5000,
    hideProgressBar = false,
    closeOnClick = false,
    pauseOnFocusLoss = true,
    pauseOnHover = true,
    draggable = true,
    progress = undefined,
    toastText = '',
    type = toast.TYPE.DEFAULT,
}) => {
    switch (type) {
        case "info": type = toast.TYPE.INFO; break;
        case "success": type = toast.TYPE.SUCCESS; break;
        case "warning": type = toast.TYPE.WARNING; break;
        case "error": type = toast.TYPE.ERROR; break;
        case "dark": type = toast.TYPE.DARK; break;
        default: type = toast.TYPE.DEFAULT;
    }

    toast(toastText, {
        position,
        autoClose,
        hideProgressBar,
        closeOnClick,
        pauseOnFocusLoss,
        pauseOnHover,
        draggable,
        progress,
        type,
    });
}

export default emitToaster;

/**
 * usages:
 *
 *  import emiteToaster from 'path';
 *
 *  emitToaster({
 *      toastText: 'This is a temp toast',
 *      type: 'success'
 *  });
 */
