import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '../../../shared/services/util.service';
import { ParticipantProfilesService } from '../../../shared/services/participant-profiles.service';
import { FinancialDashboard } from '../../../shared/models/profiles.model';
import { Participant } from '../../../shared/models/participants.model';
import { DecimalPipe } from '@angular/common';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-financial-profile',
  templateUrl: './financial-profile.component.html',
  styleUrls: ['./financial-profile.component.css']
})
export class FinancialProfileComponent implements OnInit {
  @Input() participant: Participant;
  _dashboard: FinancialDashboard[];
  _summaryChart: any;
  _monthlyData: any[] = [];
  _chart: any = [];

  constructor(private _util: UtilService, private _financialServ: ParticipantProfilesService, private _pipe: DecimalPipe) {}

  ngOnInit() {
    this._financialServ.getDashboard(this.participant.ID).subscribe(data => {
      this._dashboard = data;
      this.initCharts();
    });
  }

  initCharts() {
    this._util.months.forEach(month => {
      let items = this._dashboard.filter(x => x.Month === month.id);
      let item = { month: month.shortName, income: 0, expense: 0, amount: 0 };
      let amount: number = 0;
      items.forEach(element => {
        if (element.Type === 'Ingresos') {
          item.income = item.income + element.Amount;
        } else {
          item.expense = item.expense + element.Amount;
        }
        amount = amount + element.Amount;
      });
      item.amount = amount;
      this._monthlyData.push(item);
    });

    let labels = this._util.months.map(x => x.shortName);
    let incomes = this._monthlyData.map(x => x.income);
    let expenses = this._monthlyData.map(x => x.expense);

    this._summaryChart = {
      title: { display: false, text: 'Tareas Diarias', fontFamily: 'Roboto', fontSize: 14 },
      tooltips: {
        bodyFontFamily: 'Roboto',
        bodyFontSize: 12
      }
    };

    this._chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ingresos',
            data: incomes,
            backgroundColor: '#90B4D2'
          },
          {
            label: 'Egresos',
            data: expenses,
            backgroundColor: '#db7b7b'
          }
        ]
      }
    });
  }
}
