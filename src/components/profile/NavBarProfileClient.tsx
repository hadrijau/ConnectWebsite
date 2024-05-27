"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import "@/styles/Client.css";

interface NavBarProfileClientProps {
  className?: string;
}

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={maxWidth}>
      <h2 className="text-normal text-2xl mr-32 ml-10 mt-10">
        Es-tu sûr(e) de vouloir supprimer ton compte ?
      </h2>
      <h5 className="mb-10 ml-10 mt-3">
        Toutes tes données seront définitivement supprimées
      </h5>
      <div className="flex justify-center mb-10">
        <div className="delete-account-button cursor-pointer rounded-4xl py-3 w-4/12 text-center mr-2">
          Oui supprimer
        </div>
        <div
          className="delete-account-button cursor-pointer rounded-4xl py-3 w-4/12 text-center ml-2"
          onClick={handleClose}
        >
          Non je change d&apos;avis
        </div>
      </div>
    </Dialog>
  );
}

const NavBarProfileClient: React.FC<NavBarProfileClientProps> = ({
  className,
}) => {
  const path = usePathname();
  let color: string;
  if (path.startsWith("/client/profil")) {
    color = "#79B3D1";
  } else if (path.startsWith("/client/competences")) {
    color = "#D892C0";
  } else if (path.startsWith("/client/experiences")) {
    color = "#79B3D1";
  } else {
    color = "#D892C0";
  }
  const welcomeData = [
    {
      href: "/client/profil",
      title: "Mon profil",
      image: "/welcome4.svg",
    },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={`flex-col bg-pink p-10 ${className} relative`}>
      <Link href="/">
        <Image
          src="/logoWithConnect.svg"
          alt="Logo Connect avec le nom"
          width={120}
          height={120}
          className="mb-10"
        />
      </Link>

      {welcomeData.map((data, index) => {
        const { href, title, image } = data;
        return (
          <Link href={href} key={index} className="flex my-10">
            <div className="bg-white rounded-full overflow-hidden">
              <img src={image} alt="Mon Profil" className="nav-profil-img" />
            </div>
            <div
              className={
                path.startsWith(href.toString())
                  ? "flex justify-center items-center ml-10 client-active"
                  : "flex justify-center items-center ml-10"
              }
            >
              <h5
                className="font-normal text-xl"
                style={
                  path.startsWith(href.toString())
                    ? {
                        fontWeight: "bold",
                        borderBottom: `5px solid ${color}`,
                        paddingBottom: "0.5rem",
                      }
                    : undefined
                }
              >
                {title}
              </h5>
            </div>
          </Link>
        );
      })}
      <div className="flex flex-col justify-end mt-auto absolute delete-account-text">
        <h5 className="cursor-pointer" onClick={handleClickOpen}>
          Supprimer mon compte
        </h5>
      </div>

      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
};

export default NavBarProfileClient;
