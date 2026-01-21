import toast from "react-hot-toast";

export const notify = (message) => toast(message);
export const successNotify = (message) => toast.success(message);
export const errorNotify = (message) => toast.error(message);
