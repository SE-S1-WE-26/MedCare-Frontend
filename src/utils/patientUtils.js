import axios from "axios";

const Host_Ip = "https://medcare-backend.vercel.app";

/**
 * Fetches patient demographic and bio data based on user ID.
 * @param {string} userId - The ID of the user whose data is being fetched.
 * @returns {Promise<{demographicData: object|null, bioData: object|null}>} 
 *          - An object containing demographic and bio data or null if not found.
 * @throws {Error} - Throws an error if the fetch fails.
 */
export const fetchPatientDetails = async (userId) => {
  if (!userId) {
    throw new Error("Invalid user ID: userId cannot be null or undefined.");
  }

  // Initialize empty variables for demographic and bio data
  let demographicData = null;
  let bioData = null;

  try {
    // Fetch Demographic Data
    const demographicResponse = await axios.get(
      `${Host_Ip}/patient/demographic/user/${userId}`
    );
    demographicData = demographicResponse.data;
  } catch (error) {
    console.error("Error fetching demographic data:", error);
    // Optionally, you can return null for demographic data if needed
  }

  try {
    // Fetch Bio Data
    const bioDataResponse = await axios.get(
      `${Host_Ip}/patient/biodata/user/${userId}`
    );
    bioData = bioDataResponse.data;
  } catch (error) {
    console.error("Error fetching bio data:", error);
    // Optionally, you can return null for bio data if needed
  }

  // Return the fetched data
  return { demographicData, bioData };
};
