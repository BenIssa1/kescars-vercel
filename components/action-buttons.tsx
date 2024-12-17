"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { Button } from "./ui/button";

// ######## Create Button ##############
export function CreateBringer() {
  return (
    <Button size={"sm"}>
      <FiPlus />
      Enregistrer
    </Button>
  );
}

export function CreateAccount() {
  return (
    <Button size={"sm"}>
      <FiPlus />
      Enregistrer
    </Button>
  );
}

export function CreateCompny() {
  return (
    <Button size={"sm"}>
      <FiPlus />
      Enregistrer
    </Button>
  );
}

export function CreateSubscriber() {
  return (
    <Button size={"sm"}>
      <FiPlus />
      Enregistrer
    </Button>
  );
}

export function CreateInsured() {
  return (
    <Button size={"sm"}>
      <FiPlus />
      Enregistrer
    </Button>
  );
}

export function CreateStatment() {
  const pathname = usePathname();

  return (
    <Button size={"sm"}>
      {pathname === "/first-aid"
        ? "Declarer un sinistre"
        : pathname === "/health-center"
        ? "Declarer une prise en charge"
        : ""}
    </Button>
  );
}

export function NewStatment() {
  const pathname = usePathname();

  return (
    <Link
      href={
        pathname === "/first-aid/statment-table"
          ? "/first-aid "
          : ""
      }
    >
      <Button size={"sm"}>
        {pathname === "/first-aid/statment-table"
          ? "Nouveau sinistre"
          : pathname === "/health-center/statment-table"
          ? "Nouvelle prise en charge"
          : ""}
      </Button>
    </Link>
  );
}
