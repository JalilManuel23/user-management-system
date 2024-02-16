import Swal from "sweetalert2";

export const showAlert = (
    title,
    type = "success",
    text = null,
    timer = 1500,
) => {
    Swal.fire({
        title,
        text,
        position: "top-end",
        showConfirmButton: false,
        icon: type,
        toast: true,
        timer,
    });
};
