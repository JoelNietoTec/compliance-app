export interface TableOptions {
  columns?: Column[];
  style?: string;
  title?: string;
  pageable?: boolean;
  searcheable?: boolean;
  editable?: boolean;
  deletable?: boolean;
  creatable?: boolean;
  addMethod?: string;
  detailsURL?: String[];
  newURL?: String[];
  showID?: boolean;
  lookup?: boolean;
  exportToCSV?: boolean;
}

export interface Column {
  name?: string;
  title?: string;
  type?: string;
  sortable?: boolean;
  filterable?: boolean;
  pipe?: string;
  hidden?: boolean;
  style?: string;
  readonly?: boolean;
  list?: any[];
  listID?: any;
  listDisplay?: any;
  objectColumn?: string;
  objectID?: string;
  objectText?: string;
  lookup?: boolean;
  lookupValues?: any[];
}
