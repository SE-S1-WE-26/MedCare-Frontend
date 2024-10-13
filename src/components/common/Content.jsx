import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import the separated AppRoutes component
import AppRoutes from "./AppRoutes";

const Content = () => {
  const [selected, setSelected] = useState("/");
  const navigate = useNavigate();

  const handleMenuClick = (link) => {
    setSelected(link);
    navigate(link);
  };

  const sections = [
    {
      title: "Home",
      link: "/",
      // icon: icons.home,
      // whiteIcon: icons.whitehome,
    },
  ];

  const renderMenu = sections.map((section, index) => (
    <div
      key={index}
      onClick={() => handleMenuClick(section.link)}
    >
    </div>
  ));

  return (
    <div className="flex">
      <main>
        <AppRoutes />
      </main>
    </div>
  );
};

export default Content;
