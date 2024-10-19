import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import images from "../../constants/images";
import { Button, Card, Typography } from "@material-tailwind/react";

const SignIn = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8010/auth/login", { username, password });
      const { token, role } = response.data;
      localStorage.setItem("token", token);
      setUserRole(role);
      navigate(`/${role}`);

      const verifyResponse = await axios.get("http://localhost:8010/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userId = verifyResponse.data.user.id;
      const userResponse = await axios.get(`http://localhost:8010/user/${userId}`);
      localStorage.setItem("userData", JSON.stringify(userResponse.data));

    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleTestLogin = (role) => {
    setUserRole(role);
    navigate(`/${role}`);
  };

  const handleRegisterNavigate = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center m-8 w-full h-full">
      <div className="flex flex-1 items-center w-full">
        <div className="md:w-1/3 w-full flex flex-col justify-center">
          <Card className="py-8 px-12 rounded-3xl">
            <img src={images.logo} alt="logo" className="w-12 mx-auto my-8" />
            <Typography className="font-semibold text-xl">Login</Typography>
            <form className="mt-4">
              <label className="text-xs font-semibold">Username</label>
              <input
                type="text"
                className="w-full border-b border-gray-300 py-2 px-4 focus:outline-none text-sm rounded-lg"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <label className="text-xs font-semibold mt-4">Password</label>
              <input
                type="password"
                className="w-full border-b border-gray-300 py-2 px-4 focus:outline-none text-sm rounded-lg"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </form>
            <Button
              className="bg-dark-blue rounded-2xl w-full mt-8"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <div className="flex mt-8">
              <Typography className="text-xs font-medium text-gray-500">Don't have an account?</Typography>
              <button onClick={handleRegisterNavigate} className="ml-2 text-xs font-medium text-dark-blue">
                Register
              </button>
            </div>
          </Card>
        </div>

        <div className="md:w-2/3 w-full hidden md:flex justify-center items-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 px-32">
            <img src={images.art1} alt="doctor" className="" />
            <img src={images.art2} alt="doctor" className="" />
            <img src={images.art3} alt="doctor" className="" />
            <img src={images.logo} alt="doctor" className="my-auto" />
          </div>
        </div>
      </div>

      <Card className="py-4 px-6 rounded-3xl absolute bottom-8 right-8">
        <Typography className="font-semibold text-lg mb-4 text-center">Test Login</Typography>
        <div className="flex flex-col gap-2">
          <Button onClick={() => handleTestLogin("patient")} className="bg-dark-blue rounded-2xl">
            Patient
          </Button>
          <Button onClick={() => handleTestLogin("staff")} className="bg-dark-blue rounded-2xl">
            Staff Member
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
