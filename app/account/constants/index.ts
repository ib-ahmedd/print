import {
  faEnvelope,
  faMessage,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { SideBarLinkType } from "../types";
import { faBox, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

export const sidebarLinksArray: SideBarLinkType[] = [
  { icon: faUser, title: "Account Overview", path: "/overview" },
  { icon: faBox, title: "Orders", path: "/orders" },
  { icon: faEnvelope, title: "Inbox", path: "/inbox" },
  { icon: faMessage, title: "Pending Reviews", path: "/pending-review" },
  { icon: faClockRotateLeft, title: "Recently Viewed", path: "/recent-viewed" },
];
