export interface TableOptions {
  columns?: Column[];
  style?: string;
  title?: string;
  pageable?: boolean;
  searcheable?: boolean;
  editable?: boolean;
  deletable?: boolean;
  creatable?: boolean;
  addMethod?: 'inline' | 'modal';
  detailsURL?: String[];
  newURL?: String[];
  showID?: boolean;
  lookup?: boolean;
  exportToCSV?: boolean;
  exportToPDF?: boolean;
  reportsOnly?: boolean;
  showTitle?: boolean;
}

export interface Column {
  name?: string;
  title?: string;
  type?: 'date' | 'datetime' | 'decimal' | 'number' | 'money' | 'boolean' | 'checkbox' | 'object' | 'text';
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
  customClasses?: string;
  rateField?: boolean;
}
