export const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
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
  
  export const formatDate = (isoString) => {
    const date = new Date(isoString);
  
    // Options for date formatting
    const options = {
      year: 'numeric',
      month: 'long', // This can be 'numeric', '2-digit', or 'short' as well
      day: '2-digit',
    };
  
    // Format date to a human-readable format (e.g., October 21, 2024)
    return date.toLocaleDateString('en-US', options);
  };