export const disabledSubmitButton = () => {
  document.querySelector('button[type=submit]').setAttribute('disabled', '');
};

export const enabledSubmitButton = () => {
  document.querySelector('button[type=submit]').removeAttribute('disabled');
};
