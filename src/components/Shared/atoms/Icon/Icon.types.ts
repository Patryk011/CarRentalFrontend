export type TIconType =
  | "Login"
  | "Phone"
  | "LeftArrow"
  | "RightArrows"
  | "Home"
  | "Logout";

export interface IIconProps {
  iconType: TIconType;
  width?: number;
  height?: number;
  color?: string;
  hoverColor?: string;
}
