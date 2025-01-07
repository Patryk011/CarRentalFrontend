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
  class?: string;
}

export interface ITableProps {
  columns: ITableColumn[];
  data: ITableData[];
  actions?: (item) => ITableActions[];
}
