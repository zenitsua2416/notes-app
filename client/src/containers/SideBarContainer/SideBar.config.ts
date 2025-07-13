import { Cog, House, Trash2 } from "lucide-react";

import { ROUTES } from "@/constants";

export const SideBarConfig = {
  top: [
    {
      label: "Home",
      href: ROUTES.HOME_ROUTE,
      icon: House,
    },
  ],
  bottom: [
    {
      label: "Trash",
      href: "/trash",
      icon: Trash2,
    },
    {
      label: "Settings",
      icon: Cog,
      onClick: () => {
        console.log("Hello world");
      },
    },
  ],
};
