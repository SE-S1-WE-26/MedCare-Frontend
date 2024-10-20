/**
 * Truncates a string to a specified length and adds an ellipsis if truncated.
 * @param {string} text - The text to truncate.
 * @param {number} length - The maximum length of the truncated text (default is 100).
 * @param {string} ellipsis - The string to append if text is truncated (default is "...").
 * @returns {string} - The truncated text.
 */
export const truncateText = (text, length = 100, ellipsis = '...') => {
  // Validate input types
  if (typeof text !== 'string') {
    console.warn('Expected a string for text parameter. Returning empty string.');
    return '';
  }
  if (typeof length !== 'number' || length <= 0) {
    console.warn('Length should be a positive number. Returning original text.');
    return text;
  }

  // Truncate the text if it exceeds the specified length
  return text.length > length ? text.substring(0, length) + ellipsis : text;
};
