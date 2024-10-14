import React from "react";
import { Input, Card } from "@material-tailwind/react";
import { HiSearch } from "react-icons/hi"; // Import search icon

const SearchBar = ({ placeholder = "Search...", className = "", onChange }) => {
  return (
    <Card className="mx-4">
      <div className="relative">
        <Input
          size="lg"
          placeholder={placeholder}
          className={`!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white pl-10 ${className}`} // Add padding-left for the icon
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={onChange}
        />
        {/* Search Icon */}
        <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </Card>
  );
};

export default SearchBar;
