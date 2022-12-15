import validate from '../utils/validation.js';

export default () => {
  if (window.location.pathname === '/') {
    const registrationForm = document.querySelector('#registration-form');
    const registrationControls = registrationForm.querySelectorAll('[data-validate]');
    // [<input>, <input>] -> { control_name1: control_value1, control_name2: control_value2 };

    const validateRegistrationForm = () => {
      const values = [...registrationControls].reduce((acc, control) => ({
        ...acc,
        [control.getAttribute('data-validate')]: control.type === 'checkbox'
          ? control.checked
          : control.value,
      }), {}); // { data-validate: checked || value }

      return validate(values, {
        'full-name': ['required'],
        'email': ['required', 'email'],
        'password': ['required', 'min-length:8', 'max-length:20'],
        'agreement': ['required', 'accepted'],
      });
    };
    // values -> { full-name: '' }
    // rules -> { full-name: ['required'] }

    registrationControls.forEach((control) => {
      control.addEventListener('blur', ({ target }) => {
        const { inputs } = validateRegistrationForm();

        if (target) {
          const name = target.getAttribute('data-validate');

          if (!inputs[name].isValid) {
            target.parentNode.setAttribute('invalid', 'true');
            target.parentNode.setAttribute('data-error-message', inputs[name].errorMessage);
          } else {
            target.parentNode.removeAttribute('invalid');
            target.parentNode.removeAttribute('data-error-message');
          }
        }
      });
    });

    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const { isValid } = validateRegistrationForm();

      alert(isValid ? 'Form is valid' : 'Form is invalid');
    });
  }
};