import { Link } from "react-router-dom";

const Button = ({
  onClick,
  children,
  type = "button",
  to = null,
  bgColor = "bg-[#B11C08]", // Default Tailwind class for red background
  textColor = "text-white", // Default Tailwind class for white text
  className,
  textSize = "text-lg",
  disabled = false,
  icon = null,
  iconSize = "text-xl",
  iconPosition = "left", // This can be 'left' or 'right'
  ...props
}) => {
  const IconElement = icon && (
    <span className={`mr-2 ${iconPosition === "right" ? "ml-2" : ""} ${iconSize}`}>
      {icon}
    </span>
  );

  const buttonClass = `px-4 py-2 rounded-md flex items-center ${bgColor} ${textColor} ${textSize} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonClass} {...props}>
        {icon && iconPosition === "left" && IconElement}
        {children}
        {icon && iconPosition === "right" && IconElement}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={buttonClass}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && IconElement}
      {children}
      {icon && iconPosition === "right" && IconElement}
    </button>
  );
};

export default Button;
