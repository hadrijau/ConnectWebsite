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
    <div className={`${className}`}>
      <Link
        href={href}
        {...props}
        className={
          path.startsWith(href.toString())
            ? "text-xl text-normal link-active-client xl:text-base 2lg:text-sm"
            : " text-xl text-normal nav-link-client xl:text-base 2lg:text-sm"
        }
      >
        {children}
      </Link>
    </div>
  );
};

export default ClientNavLink;
