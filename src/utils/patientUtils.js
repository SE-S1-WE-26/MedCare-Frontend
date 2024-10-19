import axios from "axios";

const Host_Ip = "http://localhost:8010";

export const fetchPatientDetails = async (userId) => {
  try {
    // Initialize empty variables for demographic and bio data
    let demographicData = null;
    let bioData = null;

    // Fetch Demographic Data
    try {
      const demographicResponse = await axios.get(
        `${Host_Ip}/patient/demographic/user/${userId}`
      );
      demographicData = demographicResponse.data;
    } catch (error) {
      console.error("Error fetching demographic data:", error);
    }

    // Fetch Bio Data
    try {
      const bioDataResponse = await axios.get(
        `${Host_Ip}/patient/biodata/user/${userId}`
      );
      bioData = bioDataResponse.data;
    } catch (error) {
      console.error("Error fetching bio data:", error);
    }

    // Return the fetched data
    return { demographicData, bioData };
  } catch (error) {
    console.error("Error fetching patient details:", error);
    throw error;
  }
};

