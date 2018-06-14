import { Component, OnInit, Input } from '@angular/core';
import { ParticipantProfile } from '../../../shared/models/profiles.model';
import { FinancialProductsService } from '../../../shared/services/financial-products.service';
import { FinancialProduct, ProfileProduct } from '../../../shared/models/products.model';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-participant-products',
  templateUrl: './participant-products.component.html',
  styleUrls: ['./participant-products.component.css']
})
export class ParticipantProductsComponent implements OnInit {
  @Input() profile: ParticipantProfile;

  _products: Observable<ProfileProduct[]>;
  _types = this._prodServ.getProducts();
  _table: TableOptions = {};

  constructor(private _prodServ: FinancialProductsService, private toast: ToastrService) {}

  ngOnInit() {
    this._products = this._prodServ.getProfileProducts(this.profile.id);
    this._table.title = 'Productos';
    this._table.addMethod = 'modal';
    this._table.creatable = true;
    this._table.pageable = true;
    this._table.style = 'table-sm table-striped table-squared';
    this._table.columns = [
      { name: 'name', title: 'Nombre' },
      {
        name: 'financialProduct',
        title: 'Tipo',
        type: 'object',
        objectColumn: 'financialProduct.name',
        asyncList: this._types,
        listID: 'id',
        listDisplay: 'name',
        objectID: 'financialProductID'
      },
      { name: 'description', title: 'Descripción', type: 'text', hidden: true },
      { name: 'startDate', title: 'Fec.Inicio', type: 'date' },
      { name: 'dueDate', title: 'Fec.Vencimiento', type: 'date' },
      { name: 'monthlyPayment', title: 'Pago Mensual', type: 'money' },
      { name: 'balance', title: 'Saldo', type: 'money' }
    ];
  }

  addProduct(product: ProfileProduct) {
    product.participantProfileID = this.profile.id;
    this._prodServ.addProfileProduct(product).subscribe(
      data => {
        this._products = this._prodServ.getProfileProducts(this.profile.id);
        this.toast.success(data.name, 'Producto agregado');
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  editProduct(product: ProfileProduct) {
    this._prodServ.editProfileProduct(product.id, product).subscribe(
      data => {
        this.toast.success(product.name, 'Producto actualizado');
        this._products = this._prodServ.getProfileProducts(this.profile.id);
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }
}
