export const showSuccess = (toast) => {
  toast.current.show({
    severity: "success",
    summary: "Success Message",
    detail: "Message Content",
    life: 3000,
  });
};

export const showError = (toast) => {
  toast.current.show({
    severity: "error",
    summary: "Error Message",
    detail: "Message Content",
    life: 3000,
  });
};
