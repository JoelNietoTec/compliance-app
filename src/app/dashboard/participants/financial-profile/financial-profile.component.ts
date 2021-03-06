import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '../../../shared/services/util.service';
import { ParticipantProfilesService } from '../../../shared/services/participant-profiles.service';
import { FinancialDashboard } from '../../../shared/models/profiles.model';
import { Participant } from '../../../shared/models/participants.model';
import { DecimalPipe } from '@angular/common';
import { Chart } from 'chart.js';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-financial-profile',
  templateUrl: './financial-profile.component.html',
  styleUrls: ['./financial-profile.component.css']
})
export class FinancialProfileComponent implements OnInit {
  @Input() participant: Participant;
  _dashboard: FinancialDashboard[];
  _sourceChart: any;
  _sourceData: any[] = [];
  _accountData: any[] = [];
  _productData: any[] = [];
  _accountChart: any;
  _productChart: any;
  _monthlyData: any[] = [];
  _chart: any = [];

  constructor(private _util: UtilService, private _financialServ: ParticipantProfilesService, private _pipe: DecimalPipe) {}

  ngOnInit() {
    this._financialServ.getDashboard(this.participant.id).subscribe(data => {
      this._dashboard = data;
      this.initCharts();
      this.initSourceChart();
      this.initAccountChart();
      this.initProductChart();
    });
  }

  initCharts() {
    this._util.months.forEach(month => {
      let items = this._dashboard.filter(x => x.month === month.id);
      let item = { month: month.shortName, income: 0, expense: 0 };
      let amount: number = 0;
      items.forEach(element => {
        if (element.type === 'Ingreso/Pago') {
          item.income = item.income + element.amount;
        } else {
          item.expense = item.expense + element.amount;
        }
      });
      this._monthlyData.push(item);
    });
    let labels = this._util.months.map(x => x.shortName);
    let incomes = this._monthlyData.map(x => x.income);
    let expenses = this._monthlyData.map(x => x.expense);

    const _options = {
      legend: { labels: { fontFamily: 'Quicksand', boxWidth: 25, fontSize: 14, fontStyle: 'normal' } },
      tooltips: {
        bodyFontFamily: 'Quicksand',
        bodyFontSize: 12,
        callbacks: {
          label: (tooltipItem, data) => {
            return '$ ' + this._pipe.transform(tooltipItem.yLabel, '1.2');
          }
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontStyle: 'bold',
              fontFamily: 'Quicksand',
              callback: (value, index, values) => {
                return '$' + this._pipe.transform(value, '1.0');
              }
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              fontStyle: 'bold',
              fontFamily: 'Quicksand'
            }
          }
        ]
      }
    };

    this._chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ingresos/Pagos',
            data: incomes,
            borderColor: 'rgba(54,162,235,0.6)',
            pointBackgroundColor: 'rgba(54,162,235,0.6)',
            backgroundColor: 'rgba(54,162,235,0.6)',
            fill: false
          },
          {
            label: 'Desembolsos',
            data: expenses,
            borderColor: 'rgba(255,99,132,0.6)',
            pointBackgroundColor: 'rgba(255,99,132,0.6)',
            backgroundColor: 'rgba(255,99,132,0.6)',
            fill: false
          }
        ]
      },
      options: _options
    });
  }

  initSourceChart() {
    const sources = this._util.mapDistinct(this._dashboard, 'source');
    sources.forEach(source => {
      let item = { source: source, amount: 0 };
      let items = this._dashboard.filter(x => x.source === source);
      items.forEach(element => {
        item.amount = item.amount + element.amount;
      });
      this._sourceData.push(item);
    });
    this._sourceChart = {
      legend: { position: 'left', labels: { fontFamily: 'Quicksand', boxWidth: 15, fontSize: 14, fontStyle: 'normal' } },
      tooltips: {
        bodyFontFamily: 'Quicksand',
        bodyFontSize: 14,
        callbacks: {
          label: (tooltipItem, data) => {
            const value = data.datasets[0].data[tooltipItem.index];
            return '$ ' + this._pipe.transform(value, '1.2');
          }
        }
      }
    };
  }
  initAccountChart() {
    const accounts = this._util.mapDistinct(this._dashboard, 'account');
    accounts.forEach(account => {
      let item = { account: account, amount: 0 };
      let items = this._dashboard.filter(x => x.account === account);
      items.forEach(element => {
        item.amount = item.amount + element.amount;
      });
      this._accountData.push(item);
    });
    this._accountChart = {
      legend: { position: 'left', labels: { fontFamily: 'Quicksand', boxWidth: 15, fontSize: 14, fontStyle: 'normal' } },
      tooltips: {
        bodyFontFamily: 'Quicksand',
        bodyFontSize: 14,
        callbacks: {
          label: (tooltipItem, data) => {
            const value = data.datasets[0].data[tooltipItem.index];
            return '$ ' + this._pipe.transform(value, '1.2');
          }
        }
      }
    };
  }
  initProductChart() {
    const products = this._util.mapDistinct(this._dashboard, 'financialProduct');
    products.forEach(product => {
      let item = { product: product, amount: 0 };
      let items = this._dashboard.filter(x => x.financialProduct === product);
      items.forEach(element => {
        item.amount = item.amount + element.amount;
      });
      this._productData.push(item);
    });
    this._productChart = {
      legend: { position: 'left', labels: { fontFamily: 'Quicksand', boxWidth: 15, fontSize: 14, fontStyle: 'normal' } },
      tooltips: {
        bodyFontFamily: 'Quicksand',
        bodyFontSize: 14,
        callbacks: {
          label: (tooltipItem, data) => {
            const value = data.datasets[0].data[tooltipItem.index];
            return '$ ' + this._pipe.transform(value, '1.2');
          }
        }
      }
    };
  }
}
