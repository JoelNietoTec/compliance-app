import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { SanctionsService } from '../../../shared/services/sanctions.service';
import { ComparisonsService } from '../../../shared/services/comparisons.service';
import { Comparison, Match } from '../../../shared/models/sanctions.model';
import { UtilService } from '../../../shared/services/util.service';

import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

type AOA = Array<Array<any>>;

@Component({
  selector: 'discard-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  data: AOA;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  closeResult: string;
  columns: Array<any>;
  selectedCols: Array<any>;
  _selectedItems: Array<any>;
  _filename: string;
  _comparison: Comparison;
  _matches: any[];
  _searching: Boolean = false;

  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _sanctionServ: SanctionsService,
    private _compService: ComparisonsService,
    private _util: UtilService
  ) {}

  ngOnInit() {}

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('No se permiten múltiples archivos');

    const reader: FileReader = new FileReader();
    this._filename = target.files[0].name;
    reader.onload = (e: any) => {
      const bstr: String = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.columns = [];
      this.selectedCols = [];
      this.data[0].forEach((element, index) => {
        let item: any = {};
        item.column = element;
        item.valid = false;
        item.index = index;
        this.columns.push(item);
      });
      this.toastr.info(`Archivo ${this._filename} cargado exitosamente!`);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  toggleColumn(name: string) {
    let column = this.columns.find(item => item.column === name);
    column.valid = !column.valid;
    this.selectedCols = [];
    this.columns.forEach(element => {
      if (element.valid) {
        let current: any = {};
        current.name = element.column;
        current.index = element.index;
        this.selectedCols.push(current);
      }
    });
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        this.prepareDiscard();
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  prepareDiscard() {
    this._searching = true;
    this._compService.addComparison(this._filename).subscribe(data => {
      this._comparison = data;
      this.runDiscard();
    });
  }

  getMatches(comparisonID: number) {
    this._compService.getMatchesbyComparison(comparisonID).subscribe(data => {});
  }

  runDiscard() {
    this._selectedItems = [];
    this.data.forEach((row, index) => {
      if (index > 0) {
        let item: any = {};
        this.columns.forEach(col => {
          item[col.column] = row[col.index];
        });
        this._selectedItems.push(item);
      }
    });
    this._compService.runComparison(this._comparison.ID, this._selectedItems, this.selectedCols).then(matches => {
      this._matches = matches;
      if (this._matches.length > 0) {
        this.saveMatches(this._matches.shift());
        this.toastr.success(`${matches.length} coincidencias`, 'Comparación ejecutada');
        this._searching = false;
      } else {
        this.toastr.success('0 coincidencias', 'Comparación ejecutada');
        this._searching = false;
      }
    });
  }

  saveMatches(match: any) {
    const current: Match = {};
    current.ComparisonID = this._comparison.ID;
    current.ParticipantID = match.participant.ID;
    current.Term1 = match.match[this.selectedCols[0].name];
    current.Score = match.score;

    this._compService.addMatch(current).subscribe(results => {
      if (this._matches.length) {
        this.saveMatches(this._matches.shift());
      }
    });
  }
}
