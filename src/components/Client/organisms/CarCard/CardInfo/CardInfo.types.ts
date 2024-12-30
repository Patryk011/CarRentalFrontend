export interface ICardInfoItem {
  key?: string | number;
  value: string | number;
}

export interface ICardInfoProps {
  items: ICardInfoItem[];
  showDot?: boolean;
}
