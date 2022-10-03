import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ children, href, active = false }: {
  href: string
  children: JSX.Element[] | JSX.Element
  active?: boolean
}) => {
  const child = React.Children.only(children);
  const router = useRouter();

  return (
    <Link href={href}>
      {React.cloneElement(child, {
        "aria-current": router.pathname === href || active ? "page" : null
      })}
    </Link>
  );
};

export default NavLink;