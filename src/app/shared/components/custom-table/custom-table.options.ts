export interface TableOptions {
  columns?: Array<Column>;
  style?: string;
  title?: string;
  pageable?: boolean;
  searcheable?: boolean;
  editable?: boolean;
  deletable?: boolean;
  creatable?: boolean;
  detailable?: boolean;
}

export interface Column {
  name?: string;
  title?: string;
  type?: string;
  sortable?: boolean;
  filterable?: boolean;
  pipe?: string;
}
