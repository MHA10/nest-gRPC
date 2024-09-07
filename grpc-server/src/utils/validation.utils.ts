import { ValidationError } from 'class-validator';

/**
 * Formats the given array of ValidationError instances into a nested object structure.
 *
 * @param errors - An array of ValidationError instances.
 * @returns A nested object structure representing the errors.
 */
export const formatValidationErrors = (errors: ValidationError[]): any => {
  return errors.reduce((acc, error) => {
    if (error.constraints) {
      acc[error.property] = Object.values(error.constraints);
    }
    if (error.children.length) {
      acc[error.property] = formatValidationErrors(error.children);
    }
    return acc;
  }, {});
};
