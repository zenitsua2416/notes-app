import { useEffect, useRef } from "react";

import { Button, Tooltip } from "@heroui/react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

import { SideBarItem } from "@/components/ui";

import { SideBarConfig } from "./SideBar.config";
import { SideBarContainerProps } from "./SideBar.types";

export const SideBarContainer = ({
  open,
  toggleSideBar,
  mainContentRef,
}: SideBarContainerProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const sidebarItemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        toggleSideBar();
        toggleButtonRef.current?.focus();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, toggleSideBar]);

  useEffect(() => {
    const handleShiftTab = (e: KeyboardEvent) => {
      if (
        e.key === "Tab" &&
        e.shiftKey &&
        document.activeElement === mainContentRef.current
      ) {
        e.preventDefault();
        toggleButtonRef.current?.focus();
      }
    };

    const handleButton = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowDown" &&
        document.activeElement === toggleButtonRef.current
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleShiftTab);
    toggleButtonRef.current?.addEventListener("keydown", handleButton);

    return () => {
      document.removeEventListener("keydown", handleShiftTab);
    };
  }, [mainContentRef]);

  const handleSidebarKeyUp = (e: React.KeyboardEvent) => {
    console.log(e.key);
    if (!open) return;

    const currentIndex = Array.from(sidebarItemsRef.current).findIndex(
      (item) => item === document.activeElement,
    );

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % sidebarItemsRef.current.length;
        sidebarItemsRef.current[nextIndex]?.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prevIndex =
          currentIndex <= 0
            ? sidebarItemsRef.current.length - 1
            : currentIndex - 1;
        sidebarItemsRef.current[prevIndex]?.focus();
        break;
      }
      case "Tab": {
        toggleSideBar();
        e.preventDefault();
        mainContentRef.current?.focus();
        break;
      }
    }
  };

  return (
    <div
      className={`absolute z-10 transition-all duration-300 ${open ? "left-0 w-full backdrop-blur-md" : "left-[calc(-1*var(--sidebar-width))] w-fit"}`}
    >
      <aside
        className={`bg-default-50 relative w-64 transition-all duration-300`}
        role="navigation"
        aria-label="Sidebar navigation"
        ref={sidebarRef}
      >
        <Button
          ref={toggleButtonRef}
          isIconOnly
          variant="light"
          radius="lg"
          className={`text-default-400 hover:text-default-600 absolute top-2 ${open ? "right-2" : "right-[-3rem]"}`}
          onPress={() => {
            toggleSideBar();
            toggleButtonRef.current?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Tab" && !open) {
              e.preventDefault();
              mainContentRef.current?.focus();
            }
          }}
          aria-label={open ? "Close Sidebar" : "Open Sidebar"}
        >
          <Tooltip
            content={open ? "Close Sidebar" : "Open Sidebar"}
            placement="right"
            offset={20}
            className="text-default-600"
          >
            {open ? (
              <ChevronsLeft className="outline-none" />
            ) : (
              <ChevronsRight className="outline-none" />
            )}
          </Tooltip>
        </Button>

        {/* Content */}
        <div
          className="border-r-default-200 border-r-1 flex h-screen flex-col justify-between gap-8 p-2 pt-16"
          role="menu"
          tabIndex={open ? 0 : -1}
          onKeyUp={handleSidebarKeyUp}
        >
          <div className="flex flex-col gap-2">
            {SideBarConfig.top.map((item, index) => (
              <SideBarItem
                key={index}
                {...item}
                ref={(el) => {
                  sidebarItemsRef.current[index] = el;
                }}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {SideBarConfig.bottom.map((item, index) => (
              <SideBarItem
                key={index}
                {...item}
                ref={(el) => {
                  sidebarItemsRef.current[index] = el;
                }}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};
