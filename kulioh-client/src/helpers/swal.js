import swal from "sweetalert";

export const showError = async (err) => {
  return swal("Error", err, "error");
};

export const showSuccess = async (msg) => {
  return swal(msg, "", "success");
};
