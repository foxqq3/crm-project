export default () => {
  const inputs = document.querySelectorAll('.app-input');

  inputs.forEach((el) => {
    const input = el.querySelector('input');
    const inputWrapper = el.querySelector('.app-input__input-container');
    const iconWrrapper = el.querySelector('.app-input__append-slot');

    input.addEventListener('focus', () => {
      inputWrapper.classList.add('app-input__input-container_focused');
      iconWrrapper.classList.add('app-input__append-slot_focused');
    });

    input.addEventListener('invalid', () => {
      inputWrapper.classList.add('app-input__input-container_validation_false');
      iconWrrapper.classList.add('app-input__append-slot_validation_false');
    });

    input.addEventListener('blur', () => {
      inputWrapper.classList.remove('app-input__input-container_focused');
      iconWrrapper.classList.remove('app-input__append-slot_focused');
    });
  });
};
