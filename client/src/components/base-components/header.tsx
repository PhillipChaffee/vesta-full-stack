import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  name: string;
  centerLinks: { text: string; location: string }[];
  rightLinks: { text: string; location: string }[];
}

const Header: React.FC<HeaderProps> = (props) => {
  const { name, centerLinks, rightLinks } = props;

  return (
    <div className="bg-white mb-9">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <span className="text-xl font-bold">{name}</span>
          </div>
          <nav className="hidden md:flex space-x-10">
            {centerLinks.map((link) => (
              <Link
                to={link.location}
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                {link.text}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {rightLinks.map((link) => (
              <a
                href={link.location}
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
