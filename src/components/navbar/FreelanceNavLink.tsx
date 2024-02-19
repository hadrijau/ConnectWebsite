"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import "@/styles/components/NavLink.css";
interface FreelanceNavLinkProps extends LinkProps {
  children: ReactNode;
  background?: string;
  className?: string;
}

const FreelanceNavLink: React.FC<FreelanceNavLinkProps> = ({
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
        className={path.startsWith(href.toString()) ? "link-active" : background ? "nav-link-white" : "nav-link"}
      >
        {children}
      </Link>
    </div>
  );
};

export default FreelanceNavLink;
