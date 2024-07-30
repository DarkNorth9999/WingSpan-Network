import { Ref, useEffect, useState } from "react";
import { FloatingNav } from "../../components/ui/FloatingNavbar";
import { IconHome } from "@tabler/icons-react";

export default function FloatingNavbar({mainPageRef, username}:{mainPageRef:useRef<HTMLInputElement>, username:string}) {


  const scrollToDiv = () => {
    console.log(mainPageRef)
    // Ensure the ref is attached to an element
    if (mainPageRef.current) {
      mainPageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    {
      name: "Track a Flight",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    }
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} func={scrollToDiv} username={username} />
    </div>
  );
}

