export interface TableOptions {
  items?: Array<any>;
  columns?: Array<Column>;
  style?: string;
  title?: string;
  pageable?: boolean;
  searcheable?: boolean;
  editable?: boolean;
  deletable?: boolean;
  creatable?: boolean;
  addMethod?: string;
  detailsURL?: Array<string>;
  newURL?: Array<string>;
  showID?: boolean;
  lookup?: boolean;
  exportToCSV?: boolean;
}

export interface Column {
  name: string;
  title?: string;
  type?: string;
  sortable?: boolean;
  filterable?: boolean;
  pipe?: string;
  hidden?: boolean;
  style?: string;
  readonly?: boolean;
  list?: Array<any>;
  listID?: any;
  listDisplay?: any;
  objectColumn?: string;
  objectID?: string;
  objectText?: string;
}
