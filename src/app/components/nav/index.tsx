import React from "react";
import Link from "next/link";
import { ROUTES } from "@app/lib/consts";

const TopNav: React.FC = () => {
  return (
    <nav className="items-center flex gap-4 h-14 px-6  justify-start text-lg py-0">
      {ROUTES.map((item) => {
        return (
          <Link
            key={item.name}
            href={item.path}
            className="text-orange-500 hover:text-orange-300"
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default TopNav;
