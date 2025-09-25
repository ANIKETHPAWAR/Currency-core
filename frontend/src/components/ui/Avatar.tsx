import { cn } from "../../lib/utils";

interface AvatarProps {
  name: string;
  picture?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Avatar = ({ name, picture, className, size = "md" }: AvatarProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold",
        sizeClasses[size],
        className
      )}
    >
      {picture ? (
        <img
          src={picture}
          alt={name}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span className="select-none">{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
