import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from './connection.service';
import { TransactionSource, Transaction } from '../models/profiles.model';
import { AlertsService } from './alerts.service';
import { Alert } from '../models/alerts.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TransactionsService {
  private _transactionsURL: string;
  private _sourcesURL: string;
  private _profilesURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private _http: HttpClient,
    private _alertServ: AlertsService,
    private _conn: ConnectionService,
    private toast: ToastrService
  ) {
    this._transactionsURL = _conn.APIUrl + 'transactions';
    this._sourcesURL = _conn.APIUrl + 'transactionsources';
    this._profilesURL = _conn.APIUrl + 'participantprofiles';
  }

  getTransactions(): Observable<Transaction[]> {
    return this._http.get<Transaction[]>(this._transactionsURL);
  }

  getTransactionsByProfile(id: number): Observable<Transaction[]> {
    return this._http.get<Transaction[]>(`${this._profilesURL}/${id}/transactions`);
  }

  createTransaction(tran: Transaction): Observable<Transaction> {
    return this._http.post<Transaction>(this._transactionsURL, JSON.stringify(tran), { headers: this._headers });
  }

  updateTransaction(id: number, tran: Transaction) {
    return this._http.put(`${this._transactionsURL}/${id}`, JSON.stringify(tran), { headers: this._headers });
  }

  getSources(): Observable<TransactionSource[]> {
    return this._http.get<TransactionSource[]>(this._sourcesURL);
  }

  createSource(source: TransactionSource): Observable<TransactionSource> {
    return this._http.post(this._sourcesURL, JSON.stringify(source), { headers: this._headers });
  }

  editSource(id: number, source: TransactionSource) {
    return this._http.put(`${this._sourcesURL}/${id}`, JSON.stringify(source), { headers: this._headers });
  }

  deleteSource(id: number) {
    return this._http.delete(`${this._sourcesURL}/${id}`, { headers: this._headers });
  }

  generateAlert(participantID: number, reason: string, message?: string) {
    this._alertServ.getReason(reason).subscribe(data => {
      const alert: Alert = {};
      alert.ParticipantID = participantID;
      alert.AlertReasonID = data.id;
      alert.AlertSourceID = data.alertSourceId;
      alert.Description = message;
      alert.CreateDate = new Date();
      this._alertServ.createAlert(alert).subscribe(datad => {
        this.toast.warning(alert.Description, 'Alerta generada');
      });
    });
  }
}
