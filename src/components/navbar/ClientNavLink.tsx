"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import "@/styles/components/NavLink.css";
interface ClientNavLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

const ClientNavLink: React.FC<ClientNavLinkProps> = ({
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
        className={path.startsWith(href.toString()) ? "link-active-client" : "nav-link-client"}
      >
        {children}
      </Link>
    </div>
  );
};

export default ClientNavLink;
