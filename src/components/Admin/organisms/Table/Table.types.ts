export interface ITableColumn {
  label: string;
  key: string;
}

export interface ITableData {
  id: number;
  [key: string]: any;
}

export interface ITableActions {
  label: string;
  onClick: (item) => void;
}

export interface ITableProps {
  columns: ITableColumn[];
  data: ITableData[];
  actions?: (item) => ITableActions[];
}
