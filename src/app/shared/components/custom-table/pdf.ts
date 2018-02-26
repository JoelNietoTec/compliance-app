import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { TableOptions, Column } from './custom-table.options';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function generatePDF(columns: Column[], data: any[], name?: string) {
  let headers: any[] = [];
  let dataRows: any[];

  columns.forEach(col => {
    if (!col.hidden) {
      const header: any = {};
      header.text = col.title;
      header.style = 'tableHeader';
      headers.push(header);
    }
  });

  dataRows = [];
  dataRows.push(headers);
  data.forEach(item => {
    const currentRow: any[] = [];
    headers.forEach(column => {
      currentRow.push(item[column.text]);
    });
    dataRows.push(currentRow);
  });

  const docDefinition = {
    pageOrientation: 'landscape',
    header: { text: 'ProCompliance', margin: [20, 20], style: 'header' },
    pageMargins: [40, 60, 40, 40],
    content: [{ table: { headerRows: 1, body: dataRows } }],
    styles: {
      header: { fontSize: 20, bold: true },
      tableHeader: { bold: true, fillColor: '#287FB9', color: '#fff' },
      anotherStyle: { fontSize: 13, italics: true, alignment: 'right' }
    },
    footer: function(currentPage, pageCount) {
      return { text: `Pág. ${currentPage.toString()} de ${pageCount}`, alignment: 'right', margin: [20, 20] };
    }
  };

  pdfMake.createPdf(docDefinition).open();
}
