import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const DTO_CLASS_KEY = 'dto_class';

/**
 * Decorator to set the DTO class for a specific entity.
 *
 * @param {Function} dtoClass - The Data Transfer Object (DTO) class to be associated with the entity.
 *
 * @returns {CustomDecorator} - No return value, but sets the metadata for the DTO class.
 */
export const DtoClass = (dtoClass: Function): CustomDecorator =>
  SetMetadata(DTO_CLASS_KEY, dtoClass);
