import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import { SideBarContainer } from "@/containers";

export const DefaultLayout = () => {
  const [open, setOpen] = useState<boolean>(false);

  const mainContentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="font-inter bg-default-50 text-default-800 grid min-h-screen grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto]">
      {/* <NavBar /> */}

      <div className="flex pb-[min(12rem,50vh)] [--sidebar-width:16rem]">
        <SideBarContainer
          open={open}
          toggleSideBar={() => {
            setOpen((prev) => !prev);
          }}
          mainContentRef={mainContentRef}
        />
        <main
          className={`w-full transition-all duration-300 ${open ? "xl:pl-[var(--sidebar-width)]" : "pl-0"}`}
          tabIndex={-1}
          role="main"
          aria-label="Main content"
          ref={mainContentRef}
        >
          <Outlet />
        </main>
      </div>

      {/* TODO: Add any footer */}
    </div>
  );
};
