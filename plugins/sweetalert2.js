import Swal from "sweetalert2";

export default defineNuxtPlugin(() => {
  const successMessage = (message) => {
    Swal.fire({
      title: "Success",
      text: message,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const errorMessage = (message) => {
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const toastMessage = (message, type = "success") => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  return {
    provide: {
      successMessage,
      errorMessage,
      toastMessage,
    },
  };
});
