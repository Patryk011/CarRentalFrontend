import { TIconType } from "@/components/Shared/atoms/Icon/Icon.types";

export interface ISidebarItemProps {
  to: string;
  icon: TIconType;
  text?: string;
}
