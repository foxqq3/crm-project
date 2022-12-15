export default () => {
  const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const registrationInputs = document.querySelectorAll('.app-input');

  let validCondition = {
    name: null,
    email: null,
    password: null,
  };

  registrationInputs.forEach((el) => {
    const input = el.querySelector('input');
    const inputWrapper = el.querySelector('.app-input__input-container');
    const iconWrapper = el.querySelector('.app-input__append-slot');

    let validForInput = null;

    if (inputWrapper.querySelector('#full-name')) {
        if (input.value !== '') {
          validCondition.name = 'confrim';
        } else {
          validCondition.name = 'clear';
        }
        validForInput = validCondition.name;
      } else if (inputWrapper.querySelector('#email')) {
        if (EMAIL_REGEXP.test(input.value)) {
          validCondition.email = 'confrim';
        } else if (input.value == '') {
          validCondition.email = 'clear';
        } else {
          validCondition.email = 'error';
        }
        validForInput = validCondition.email;
      } else if (inputWrapper.querySelector('#password')) {
        if (PASSWORD_REGEXP.test(input.value)) {
          validCondition.password = 'confrim';
        } else if (input.value == '') {
          validCondition.password = 'clear';
        } else {
          validCondition.password = 'error';
        }
        validForInput = validCondition.password;
      }

    console.log(validForInput);

    input.addEventListener('focus', () => {
      inputWrapper.classList.add('app-input__input-container_focused');
      iconWrapper.classList.add('app-input__append-slot_focused');
    });
    input.addEventListener('input', () => {
      inputWrapper.classList.add('app-input__input-container_focused');
      iconWrapper.classList.add('app-input__append-slot_focused');
      inputWrapper.classList.remove('app-input__input-container_validation_false');
      iconWrapper.classList.remove('app-input__append-slot_validation_false');
    });
    input.addEventListener('blur', () => {
      inputWrapper.classList.remove('app-input__input-container_focused');
      iconWrapper.classList.remove('app-input__append-slot_focused');
      if (validForInput == 'cofrim') {
        inputWrapper.classList.remove('app-input__input-container_validation_false');
        iconWrapper.classList.remove('app-input__append-slot_validation_false');
        input.classList.remove('app-input__entry-field_validation_false');
        input.classList.add('app-input__entry-field_validation_true');
        iconWrapper.classList.add('app-input__append-slot_validation_true');
        inputWrapper.classList.add('app-input__input-container_validation_true');
      } else if (validForInput == 'clear') {
        inputWrapper.classList.remove('app-input__input-container_validation_true');
        inputWrapper.classList.remove('app-input__input-container_validation_false');
        iconWrapper.classList.remove('app-input__append-slot_validation_true');
        iconWrapper.classList.remove('app-input__append-slot_validation_false');
        input.classList.remove('app-input__entry-field_validation_true');
        input.classList.remove('app-input__entry-field_validation_false');
      } else {
        inputWrapper.classList.remove('app-input__input-container_validation_true');
        iconWrapper.classList.remove('app-input__append-slot_validation_true');
        input.classList.remove('app-input__entry-field_validation_true');
        input.classList.add('app-input__entry-field_validation_false');
        iconWrapper.classList.add('app-input__append-slot_validation_false');
        inputWrapper.classList.add('app-input__input-container_validation_false');
      }
    });
  });
};
