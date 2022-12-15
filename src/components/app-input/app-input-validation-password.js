export default () => {
  const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const passwordInput = document.querySelector('#password');
  const passwordWrapper = passwordInput.closest('.app-input__input-container');
  const iconWrapper = passwordWrapper.querySelector('.app-input__append-slot');

  let passwordValidTest = (value) => PASSWORD_REGEXP.test(value);
  let validStatus = null;

  passwordInput.addEventListener('blur', () => {
    if (passwordValidTest(passwordInput.value)) {
      passwordWrapper.classList.remove('app-input__input-container_validation_false');
      iconWrapper.classList.remove('app-input__append-slot_validation_false');
      passwordInput.classList.remove('app-input__entry-field_validation_false');
      passwordInput.classList.add('app-input__entry-field_validation_true');
      iconWrapper.classList.add('app-input__append-slot_validation_true');
      passwordWrapper.classList.add('app-input__input-container_validation_true');
      validStatus = true;
    } else if (passwordInput.value == '') {
      passwordWrapper.classList.remove('app-input__input-container_validation_true');
      passwordWrapper.classList.remove('app-input__input-container_validation_false');
      iconWrapper.classList.remove('app-input__append-slot_validation_true');
      iconWrapper.classList.remove('app-input__append-slot_validation_false');
      passwordInput.classList.remove('app-input__entry-field_validation_true');
      passwordInput.classList.remove('app-input__entry-field_validation_false');
      validStatus = false;
    } else {
      passwordWrapper.classList.remove('app-input__input-container_validation_true');
      iconWrapper.classList.remove('app-input__append-slot_validation_true');
      passwordInput.classList.remove('app-input__entry-field_validation_true');
      passwordInput.classList.add('app-input__entry-field_validation_false');
      iconWrapper.classList.add('app-input__append-slot_validation_false');
      passwordWrapper.classList.add('app-input__input-container_validation_false');
      validStatus = false;
    }
    console.log(validStatus);
  });
};
