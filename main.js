document.addEventListener("DOMContentLoaded", () => {
  // querySelectors
  const form = document.querySelector(".form");
  const email = document.querySelector("#email");
  const emailMsg = document.querySelector(".email-error");
  const country = document.querySelector("#country");
  const countryMsg = document.querySelector(".country-error");
  const zipcode = document.querySelector("#zipcode");
  const zipcodeMsg = document.querySelector(".zipcode-error");
  const password = document.querySelector("#password");
  const passwordMsg = document.querySelector(".password-error");
  const passwordConfirm = document.querySelector("#password-confirm");
  const passwordConfirmMsg = document.querySelector(".confirm-error");

  // validations
  const validateZip = () => {
    const constraints = {
      ch: [
        "^(CH-)?\\d{4}$",
        "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
      ],
      fr: [
        "^(F-)?\\d{5}$",
        "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
      ],
      de: [
        "^(D-)?\\d{5}$",
        "Germany ZIPs must have exactly 5 digits: e.g. D-12345",
      ],
      nl: [
        "^(NL-?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
        "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
      ],
      uk: [
        "^([A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2}|GIR 0AA)$",
        "UK ZIPs must be in one of the following formats: AA9A 9AA, A9A 9AA",
      ],
    };
    // read country id
    const countryVal = country.value;

    const constraint = new RegExp(constraints[countryVal][0], "");

    if (!constraint.test(zipcode.value)) {
      zipcodeMsg.textContent = constraints[countryVal][1];
      zipcode.setCustomValidity(constraints[countryVal][1]);
    } else {
      zipcodeMsg.textContent = "";
      zipcode.setCustomValidity("");
    }
  };

  const validateCountry = () => {
    if (country.validity.valueMissing) {
      countryMsg.textContent = "Country selection is required";
      country.setCustomValidity("Country is required");
    } else {
      countryMsg.textContent = "";
      country.setCustomValidity("");
    }
  };

  const validateEmail = () => {
    if (email.validity.typeMismatch) {
      emailMsg.textContent = "Value not in email format";
      email.setCustomValidity("Value not in email format");
    } else if (email.validity.valueMissing) {
      emailMsg.textContent = "Email is required.";
      email.setCustomValidity("Email is required.");
    } else if (email.validity.tooShort) {
      emailMsg.textContent = "Email too short.";
      email.setCustomValidity("Email too short.");
    } else if (email.validity.tooLong) {
      emailMsg.textContent = "Email too Long.";
      email.setCustomValidity("Email too Long.");
    } else {
      emailMsg.textContent = "";
      email.setCustomValidity("");
    }
  };

  const validatePassword = () => {
    const passwordRegex = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$";
    const constraint = new RegExp(passwordRegex);
    console.log(constraint.test(password.value));
    if (!constraint.test(password.value)) {
      passwordMsg.textContent =
        "Min 8 characters, at least 1 letter and 1 number";
      password.setCustomValidity(
        "Min 8 characters, at least 1 letter and 1 number"
      );
    } else {
      passwordMsg.textContent = "";
      password.setCustomValidity("");
    }
  };

  const validatePasswordConfirm = () => {
    // same with password
    if (password.value !== passwordConfirm.value) {
      passwordConfirm.setCustomValidity("Password is different.");
      passwordConfirmMsg.textContent = "Password is different.";
    } else {
      passwordConfirm.setCustomValidity("");
      passwordConfirmMsg.textContent = "";
    }
  };

  const checkValidityOfInputs = () => {
    return (
      !email.validity.valid ||
      !country.validity.valid ||
      !zipcode.validity.valid ||
      !password.validity.valid ||
      !passwordConfirm.validity.valid
    );
  };

  // eventListeners
  email.addEventListener("input", validateEmail);
  country.addEventListener("change", validateCountry);
  zipcode.addEventListener("input", validateZip);
  password.addEventListener("input", validatePassword);
  passwordConfirm.addEventListener("input", validatePasswordConfirm);

  form.addEventListener("submit", (e) => {
    validateEmail();
    validateCountry();
    validateZip();
    validatePassword();
    validatePasswordConfirm();

    if (checkValidityOfInputs()) {
      e.preventDefault();

      email.reportValidity();
      country.reportValidity();
      zipcode.reportValidity();
      password.reportValidity();
      passwordConfirm.reportValidity();
    }
  });
});
