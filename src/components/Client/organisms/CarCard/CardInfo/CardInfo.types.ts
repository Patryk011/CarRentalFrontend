export interface ICardInfoItem {
  key?: string;
  value: string;
}

export interface ICardInfoProps {
  items: ICardInfoItem[];
  showDot?: boolean;
}
