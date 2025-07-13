import { ForwardRefExoticComponent, RefAttributes } from "react";

import { LucideProps } from "lucide-react";

export interface SideBarItemProps {
  label: string;
  href?: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  isActive?: boolean;
  onClick?: () => void;
  ref?: React.Ref<HTMLButtonElement>;
}
