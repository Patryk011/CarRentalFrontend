export interface ITableColumn {
  label: string;
  key: string;
}

export interface ITableData {
  [key: string]: any;
}

export interface ITableProps {
  columns: ITableColumn[];
  data: ITableData[];
}
