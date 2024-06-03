document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  // email
  const email = document.querySelector("#email");
  const emailMsg = document.querySelector(".email-error");

  // validations
  const validateEmail = () => {
    if (email.validity.typeMismatch) {
      emailMsg.textContent = "Value not in email format";
      email.setCustomValidity("Value not in email format");
    } else if (email.validity.valueMissing) {
      emailMsg.textContent = "Email is required.";
      email.setCustomValidity("Email is required.");
    } else if (email.validity.valid) {
      emailMsg.textContent = "";
      email.setCustomValidity("");
    }
  };

  // email inline
  email.addEventListener("focusout", validateEmail);

  form.addEventListener("submit", (e) => {
    if (!email.validity.valid) {
      e.preventDefault();
      validateEmail();
      email.reportValidity();
    }
  });
});
