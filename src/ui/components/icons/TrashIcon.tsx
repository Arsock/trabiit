import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const TrashIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
  className = "",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9 6V4.5C9 3.67 9.67 3 10.5 3h3C14.33 3 15 3.67 15 4.5V6" />
      <path d="M4.5 6h15" />
      <path d="M6 6l1.2 12.6c.1.9.9 1.6 1.8 1.6h6c.9 0 1.7-.7 1.8-1.6L18 6" />
      <line x1="10" y1="10" x2="10" y2="15" />
      <line x1="14" y1="10" x2="14" y2="15" />
    </svg>
  );
};