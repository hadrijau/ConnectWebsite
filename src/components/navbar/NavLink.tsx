"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import "@/styles/components/NavLink.css";
interface NavLinkProps extends LinkProps {
  children: ReactNode;
  background?: string;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  background,
  className,
  ...props
}) => {
  const path = usePathname();
  return (
    <div
      style={{ background: background }}
      className={background ? `${className} rounded-lg px-2 py-1` : `${className}`}
    >
      <Link
        href={href}
        {...props}
        className={path.startsWith(href.toString()) ? "link-active" : undefined}
      >
        {children}
      </Link>
    </div>
  );
};

export default NavLink;
