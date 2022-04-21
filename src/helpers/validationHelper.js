export function validateEmail(email) {
  const isValid =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      email
    );
  if (!isValid) {
    return "Please ensure that the email address entered is valid.";
  }
}

export function validateRepeatPassword(pw1, pw2) {
  if (pw1 !== pw2) {
    return "Passwords do not match.";
  }
}

export function notNull(value) {
  if (!value || value.length < 1) {
    return "Please enter a value.";
  }
}
