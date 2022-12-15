const defaultRules = {
  required: {
    validator: (value) => {
      if (typeof value === 'string' || Array.isArray(value)) {
        return !!value.length;
      }

      if (typeof value === 'number') {
        return !!String(value).length;
      }

      return !!value;
    },
    errorMessage: () => 'Поле не заполнено',
  },
  'min-length': {
    validator: (value, minLength) => {
      if (typeof value === 'boolean' || typeof value === 'object') {
        return true;
      }

      const v = typeof value === 'number'
        ? String(value)
        : value;

      return v.length >= minLength;
    },
    errorMessage: (minLength) => `Поле должно содержать минимум ${minLength} символов`,
  },
  'max-length': {
    validator: (value, maxLength) => {
      if (typeof value === 'boolean' || typeof value === 'object') {
        return true;
      }

      const v = typeof value === 'number'
        ? String(value)
        : value;

      return v.length <= maxLength;
    },
    errorMessage: (maxLength) => `Поле должно содержать максимум ${maxLength} символов`,
  },
  email: {
    validator: (value) => /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(String(value)),
    errorMessage: () => 'Некорректный email',
  },
  accepted: {
    validator: (value) => {
      if (typeof value === 'string') {
        return value === 'true' || value === '1';
      }

      return !!value;
    },
    errorMessage: () => 'Поле должно содержать положительный ответ',
  },
};

function parseRule(rule) {
  const parts = rule.split(':');

  if (parts.length === 1) {
    return {
      name: parts,
      args: [],
    };
  }

  return {
    name: parts[0],
    args: parts[1].split(','),
  };
}

export default function validate(values, rules, customMessages = {}) {
  const inputs = Object.entries(values).reduce((acc, [name, value]) => ({
    ...acc,
    [name]: {
      value,
      isValid: true,
      errorMessage: undefined,
    },
  }), {});

  Object.entries(rules).forEach(([name, inputRules]) => {
    const input = inputs[name];

    inputRules.forEach((rule) => {
      if (!input.isValid) {
        return;
      }

      const { name, args } = parseRule(rule);
      const isValid = defaultRules[name].validator(input.value, ...args);

      let errorMessage = undefined;

      if (!isValid) {
        errorMessage = defaultRules[name].errorMessage(...args);
      }

      Object.assign(input, { isValid, errorMessage });
    });
  });

  return {
    inputs,
    get isValid() {
      return Object.values(inputs).every(({ isValid }) => isValid);
    },
  };
}