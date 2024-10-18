import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import images from "../../constants/images";
import axios from "axios";
import { Button, Card, Typography } from "@material-tailwind/react";

const SignIn = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Clear tokens when the component mounts
  useEffect(() => {
    localStorage.removeItem("token"); // Remove any existing token when visiting this page
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8010/auth/login", {
        username,
        password,
      });
      const { token, role } = response.data;
      localStorage.setItem("token", token); // Save the JWT in local storage
      setUserRole(role); // Set user role in Layout
      navigate(`/${role}`); // Navigate to the specified role

      try{
        const response = await axios.get("http://localhost:8010/auth/verify", {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      console.log("Token verified", response.data);

      const userId = response.data.user.id;

      // Fetch user data
      try {
        const userResponse = await axios.get(`http://localhost:8010/user/${userId}`);
        console.log("User data fetched", userResponse.data);

        localStorage.setItem("userData", JSON.stringify(userResponse.data));
        console.log("User data:", JSON.parse(localStorage.getItem("userData")));
        
      } catch (error) {
        console.error("Error during user data fetch", error);
      }

      } catch (error) {
        console.error("Error during token verification", error);
      }
    } catch (error) {
      console.error("Error during sign-in", error);
    }
  };

  const handleTestLogin = async (role) => {
    console.log("Sign In as:", role);
    setUserRole(role); // Set user role in Layout
    navigate(`/${role}`); // Navigate to the specified role
  }

  const handleRegisterNavigate = () => {
    navigate("/register");
  }

  return (
    <div className="w-full h-full m-8 flex flex-col">
      <div className="flex flex-1 items-center">
        {/* Left Section for Login Form */}
        <div className="md:w-1/3 w-full flex flex-col justify-center">
          {/* Login Section */}
          <Card className="py-8 px-12 rounded-3xl h-full lg:mr-16">
            <img src={images.logo} alt="logo" className="w-12 mx-auto my-8" />
            <div>
              <Typography className="font-semibold font-poppins text-xl">
                Login
              </Typography>
              <form>
                <div className="mt-4">
                  <label className="text-xs font-semibold">Username</label>
                  <input
                    type="text"
                    className="w-full border-b border-gray-300 py-2 p-2 focus:outline-none"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </div>
                <div className="mt-4">
                  <label className="text-xs font-semibold">Password</label>
                  <input
                    type="password"
                    className="w-full border-b border-gray-300 p-2 focus:outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
              </form>
            </div>
            <Button
              style={{ textTransform: "none" }}
              className="rounded-2xl bg-dark-blue w-full mt-16" // Added full width
              onClick={handleSignIn}
            >
              <Typography className="font-semibold">Sign In</Typography>
            </Button>
            <div className="flex flex-row my-8">
              <Typography className="text-xs lg:text-sm font-poppins text-gray-500 font-medium">Don't have an account?</Typography>
              <button onClick={handleRegisterNavigate}><Typography className="ml-2 text-xs lg:text-sm font-poppins text-dark-blue font-medium">Register</Typography></button>
            </div>
          </Card>
        </div>

        {/* Images Section */}
        <div className="md:w-2/3 w-full hidden md:flex justify-center items-center flex-col">
          {" "}
          {/* Flex column for image alignment */}
          {/* Hidden on mobile */}
          <div className="flex flex-1 justify-center items-center px-32">
            <div className="flex flex-col w-1/2 justify-between items-right gap-4">
              <img src={images.art1} alt="doctor" />
              <img src={images.art2} alt="poster1" />
            </div>
            <div className="w-1/2 flex my-auto ml-8">
              <img src={images.art3} alt="doctor" />
            </div>
          </div>
        </div>
      </div>

      {/* Test Login Section */}
      <Card className="py-6 px-6 rounded-3xl absolute bottom-8 right-8">
        <Typography className="font-semibold font-poppins text-lg mb-4 text-center">
          Test Login
        </Typography>
        <div className="flex flex-col gap-2">
          <Button
            style={{ textTransform: "none" }}
            onClick={() => handleTestLogin("patient")}
            className="rounded-2xl bg-dark-blue"
          >
            <Typography className="font-semibold text-xs">Patient</Typography>
          </Button>
          <Button
            style={{ textTransform: "none" }}
            onClick={() => handleTestLogin("staff")}
            className="rounded-2xl bg-dark-blue"
          >
            <Typography className="font-semibold text-xs">
              Staff Member
            </Typography>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
