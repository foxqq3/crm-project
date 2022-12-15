export default () => {
  //check valid
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const emailInput = document.querySelector('#email');
  const emailWrapper = emailInput.closest('.app-input__input-container');
  const iconWrapper = emailWrapper.querySelector('.app-input__append-slot');

  let emailValidTest = (value) => EMAIL_REGEXP.test(value);
  let validStatus = null;

  emailInput.addEventListener('blur', () => {
    if (emailValidTest(emailInput.value)) {
      emailWrapper.classList.remove('app-input__input-container_validation_false');
      iconWrapper.classList.remove('app-input__append-slot_validation_false');
      emailInput.classList.remove('app-input__entry-field_validation_false');
      emailInput.classList.add('app-input__entry-field_validation_true');
      iconWrapper.classList.add('app-input__append-slot_validation_true');
      emailWrapper.classList.add('app-input__input-container_validation_true');
      validStatus = true;
    } else if (emailInput.value == '') {
      emailWrapper.classList.remove('app-input__input-container_validation_true');
      emailWrapper.classList.remove('app-input__input-container_validation_false');
      iconWrapper.classList.remove('app-input__append-slot_validation_true');
      iconWrapper.classList.remove('app-input__append-slot_validation_false');
      emailInput.classList.remove('app-input__entry-field_validation_true');
      emailInput.classList.remove('app-input__entry-field_validation_false');
      validStatus = false;
    } else {
      emailWrapper.classList.remove('app-input__input-container_validation_true');
      iconWrapper.classList.remove('app-input__append-slot_validation_true');
      emailInput.classList.remove('app-input__entry-field_validation_true');
      emailInput.classList.add('app-input__entry-field_validation_false');
      iconWrapper.classList.add('app-input__append-slot_validation_false');
      emailWrapper.classList.add('app-input__input-container_validation_false');
      validStatus = false;
    }
    console.log(validStatus);
  });
};
