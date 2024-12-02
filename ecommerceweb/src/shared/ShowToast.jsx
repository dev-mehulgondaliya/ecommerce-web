import { toast } from "react-toastify";

function ShowToast(type, msg) {
  return toast[type](msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    
}

export default ShowToast