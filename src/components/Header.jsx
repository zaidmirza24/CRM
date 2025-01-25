import React from "react";
import { FiSearch, FiBell, FiSettings, FiPlus } from "react-icons/fi";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import { usePageTitle } from "./PageTitleContext";
import SearchInput from "./SearchInput.jsx";

const Header = () => {
  const { pageTitle } = usePageTitle();
  return (
    <header className="bg-white flex border-b border-gray-200">
      <div className="header-logo w-[15%] flex items-center justify-center py-6 border-r border-gray-200">
        <img src={logo1} alt="Logo 1" />
        <img src={logo2} alt="Logo 2" />
      </div>
      <div className="header-content flex-1 flex items-center justify-between gap-6 px-12">
        <h1 className="text-2xl text-gray-800 font-bold">{pageTitle}</h1>
        <div className="flex items-center gap-6 ml-auto">
          <SearchInput />
          <HeaderIcons />
        </div>
      </div>
    </header>
  );
};

// HeaderIcons Component
const HeaderIcons = () => {
  const icons = [
    {
      id: "search",
      icon: <FiSearch />,
      label: "Search",
    },
    {
      id: "notificationBell",
      icon: <FiBell />,
      label: "Notifications",
    },
    {
      id: "add",
      icon: <FiPlus />,
      label: "Add New",
    },
    {
      id: "settings",
      icon: <FiSettings />,
      label: "Settings",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {icons.map(({ id, icon, label }) => (
        <button
          key={id}
          className="p-3 border border-gray-200 rounded-full hover:bg-gray-100 transition duration-200"
          aria-label={label}
        >
          {React.cloneElement(icon, { className: "text-gray-600 text-xl" })}
        </button>
      ))}
    </div>
  );
};

export default Header;