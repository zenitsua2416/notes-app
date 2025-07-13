export interface SideBarContainerProps {
  open: boolean;
  toggleSideBar: () => void;
  mainContentRef: React.RefObject<HTMLDivElement | null>;
}
