/**
 * Calculates the age of a person based on their birthday.
 * @param {string} birthday - The birthday in ISO format (YYYY-MM-DD).
 * @returns {number} - The calculated age in years.
 * @throws {Error} - If the birthday is not a valid date string.
 */
export const calculateAge = (birthday) => {
  const birthDate = new Date(birthday);
  if (isNaN(birthDate.getTime())) {
      throw new Error("Invalid birthday format. Expected an ISO date string.");
  }
  
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
      age--;
  }
  return age;
};

/**
* Formats a date string into a more readable format.
* @param {string} isoString - The date in ISO format.
* @returns {string} - The formatted date string (e.g., "October 21, 2024").
*/
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
      throw new Error("Invalid date format. Expected an ISO date string.");
  }

  // Options for date formatting
  const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
  };

  // Format date to a human-readable format (e.g., October 21, 2024)
  return date.toLocaleDateString('en-US', options);
};
