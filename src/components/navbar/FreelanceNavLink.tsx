"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import "@/styles/components/NavLink.css";
interface FreelanceNavLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

const FreelanceNavLink: React.FC<FreelanceNavLinkProps> = ({
  href,
  children,
  className,
  ...props
}) => {
  const path = usePathname();
  return (
    <div
      className={`${className}`}
    >
      <Link
        href={href}
        {...props}
        className={path.startsWith(href.toString()) ? "link-active-freelance" : "nav-link-freelance"}
      >
        {children}
      </Link>
    </div>
  );
};

export default FreelanceNavLink;
