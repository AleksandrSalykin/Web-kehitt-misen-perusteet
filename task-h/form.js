(function () {

  const form = document.getElementById("contactForm");
  const tableBody = document.getElementById("tableBody");

  const fields = {
    fullName: document.getElementById("fullName"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    birthDate: document.getElementById("birthDate"),
    terms: document.getElementById("terms"),
    timestamp: document.getElementById("timestamp")
  };

  function showError(field, msg = "") {
    const targetId = field.dataset.errorTarget;
    const el = targetId ? document.getElementById(targetId) : null;
    field.setCustomValidity(msg);
    if (el) {
      if (msg) {
        el.textContent = msg;
        el.classList.remove("hidden");
        field.classList.add("ring-2", "ring-red-500", "border-red-500");
      } else {
        el.textContent = "";
        el.classList.add("hidden");
        field.classList.remove("ring-2", "ring-red-500", "border-red-500");
      }
    }
  }

  function validateName() {
    const val = fields.fullName.value.trim();
    if (!val) return showError(fields.fullName, "Enter your full name (first and last).");
    const words = val.split(" ").filter(w => w.length >= 2);
    if (words.length < 2) return showError(fields.fullName, "Please enter at least 2 words.");
    return showError(fields.fullName);
  }

  function validateEmail() {
    const val = fields.email.value.trim();
    if (!val) return showError(fields.email, "Email is required.");
    if (!fields.email.checkValidity()) return showError(fields.email, "Please enter a valid email address.");
    return showError(fields.email);
  }

  function validatePhone() {
    const val = fields.phone.value.trim();
    if (!val) return showError(fields.phone, "Phone number is required.");
    const pattern = /^\+358\s?\d{7,9}$/;
    if (!pattern.test(val)) return showError(fields.phone, "Use Finnish phone format, e.g., +358 401234567.");
    return showError(fields.phone);
  }

  function validateBirth() {
    const val = fields.birthDate.value;
    if (!val) return showError(fields.birthDate, "Birth date is required.");
    const date = new Date(val);
    const today = new Date();
    if (date > today) return showError(fields.birthDate, "Birth date cannot be in the future.");
    return showError(fields.birthDate);
  }

  function validateTerms() {
    if (!fields.terms.checked) return showError(fields.terms, "You must accept the terms.");
    return showError(fields.terms);
  }

  fields.fullName.addEventListener("input", validateName);
  fields.email.addEventListener("input", validateEmail);
  fields.phone.addEventListener("input", validatePhone);
  fields.birthDate.addEventListener("input", validateBirth);
  fields.terms.addEventListener("change", validateTerms);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const validators = [validateName, validateEmail, validatePhone, validateBirth, validateTerms];
    validators.forEach(fn => fn());

    const firstInvalid = Object.values(fields).find(f => f.checkValidity && !f.checkValidity());
    if (firstInvalid) {
      firstInvalid.reportValidity();
      firstInvalid.focus();
      return;
    }

    const now = new Date();
    fields.timestamp.value = now.toISOString();

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="border p-2">${fields.timestamp.value}</td>
      <td class="border p-2">${fields.fullName.value}</td>
      <td class="border p-2">${fields.email.value}</td>
      <td class="border p-2">${fields.phone.value}</td>
      <td class="border p-2">${fields.birthDate.value}</td>
      <td class="border p-2">${fields.terms.checked ? "Yes" : "No"}</td>
    `;
    tableBody.appendChild(tr);

    form.reset();
    Object.values(fields).forEach(f => showError(f, ""));

    const successBox = document.getElementById("formSuccess");
    successBox.textContent = "Submission successful!";
    successBox.classList.remove("hidden");
    setTimeout(() => successBox.classList.add("hidden"), 5000);
  });

})();
