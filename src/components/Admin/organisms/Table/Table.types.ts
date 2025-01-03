export interface ITableColumn {
  label: string;
  key: string;
}

export interface ITableData {
  id: number;
  [key: string]: any;
}

export interface ITableProps {
  columns: ITableColumn[];
  data: ITableData[];
}
