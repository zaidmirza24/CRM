import { FiSearch } from "react-icons/fi";
const SearchInput = ({
  type = "text",
  className = "",
  width = "w-full", // Default width is 100%
  ...props
}) => {
  return (
    <div className={`relative ${width}`}>
      <input
        type={type}
        placeholder="Search"
        className={`px-4 py-3 pl-10 rounded-lg text-sm border border-gray-100 shadow-md focus:outline-none w-full ${className}`}
        aria-label="Search emails"
        {...props}
      />
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
    </div>
  );
};

export default SearchInput;
