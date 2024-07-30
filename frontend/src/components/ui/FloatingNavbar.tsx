// @ts-nocheck
import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {Link} from 'react-router-dom';

export const FloatingNav = ({
  navItems,
  className,
  func,
  username
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  func:() => void;
  username: string|null;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const timeoutRef = useRef(null);

  const onLogout=()=>{
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    window.location.reload();
  }

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
            onClick={()=>func()}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        <div 
          className="relative inline-block"
          onMouseEnter={() => {
            
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            setShowDropdown(true);
            
          }}
          onMouseLeave={() => {
            timeoutRef.current = setTimeout(() => {
              setShowDropdown(false);
            }, 300);
          }}
        >
        <button onClick={()=>func()} className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>{username?`Welcome ${username}`:"Login"}</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>

        {username && showDropdown && (
          <button
            onClick={onLogout}
            className="absolute top-full w-[80%] mt-1 right-[1.25rem] bg-white dark:bg-black text-sm border border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-3 py-1 rounded-full shadow-lg"
            // className="absolute top-full mt-1 right-0 bg-white dark:bg-black text-sm border border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-3 py-1 rounded-full shadow-lg"
          >
            Logout
          </button>
        )}

        </div>

        {/* <Link
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 mr-8"
            )}
            onClick={()=>{}}
          >
            <span className="hidden sm:block text-sm">Logout</span>
          </Link> */}

      </motion.div>
    </AnimatePresence>
  );
};
