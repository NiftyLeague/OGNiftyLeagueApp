// eslint-disable-next-line import/prefer-default-export
export const getErrorForName = (value: string): string => {
  const regex = new RegExp('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$');
  const doubleSpaceRegex = new RegExp('^(?!.*[ ]{2})');
  if (!value.length) {
    return 'Please input a name.';
  }

  if (value.length > 32) {
    return 'Max character length of 32.';
  }

  if (!regex.test(value)) {
    return 'Please only use numbers, letters, or spaces.';
  }

  if (value.charAt(0) === ' ' || value.charAt(value.length - 1) === ' ') {
    return 'No leading or trailing spaces.';
  }

  if (!doubleSpaceRegex.test(value)) {
    return 'No double spaces allowed.';
  }

  return '';
};
