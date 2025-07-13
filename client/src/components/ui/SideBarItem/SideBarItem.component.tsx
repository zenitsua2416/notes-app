import { forwardRef } from "react";
import { Link } from "react-router-dom";

import { Button } from "@heroui/react";

import { generateFocusClasses, generateHoverClasses } from "@/utils";

import { SideBarItemProps } from "./SideBarItem.types";

export const SideBarItem = forwardRef<HTMLButtonElement, SideBarItemProps>(
  ({ label, href, icon: Icon, isActive = false, onClick = () => {} }, ref) => {
    const activeClass = "text-default-800 bg-default-900/5";
    const className =
      "text-default-500 text-left h-min grid grid-cols-[auto_1fr] outline-none w-full items-center gap-2 rounded-md bg-transparent px-2 py-1 text-base font-medium";

    return (
      <Button
        ref={ref}
        disableRipple
        as={href ? Link : "button"}
        {...(href && { to: href })}
        onPress={href ? undefined : onClick}
        role="menuitem"
        className={`${className} ${generateHoverClasses(activeClass)} ${generateFocusClasses(activeClass)} ${isActive ? activeClass : ""}`}
      >
        <Icon size={18} />
        <span className="truncate">{label}</span>
      </Button>
    );
  },
);

SideBarItem.displayName = "SideBarItem";
