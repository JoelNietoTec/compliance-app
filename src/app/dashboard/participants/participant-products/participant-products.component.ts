import { Component, OnInit, Input } from '@angular/core';
import { ParticipantProfile } from '../../../shared/models/profiles.model';
import { FinancialProductsService } from '../../../shared/services/financial-products.service';
import { FinancialProduct, ProfileProduct } from '../../../shared/models/products.model';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-participant-products',
  templateUrl: './participant-products.component.html',
  styleUrls: ['./participant-products.component.css']
})
export class ParticipantProductsComponent implements OnInit {
  @Input() profile: ParticipantProfile;

  _types = this._prodServ.getProducts();
  _table: TableOptions = {};

  constructor(private _prodServ: FinancialProductsService, private toast: ToastrService) {}

  ngOnInit() {

      this._table.title = 'Productos';
      this._table.addMethod = 'modal';
      this._table.creatable = true;
      this._table.pageable = true;
      this._table.style = 'table-sm table-striped table-squared';
      this._table.columns = [
        { name: 'Name', title: 'Nombre' },
        {
          name: 'FinancialProduct',
          title: 'Tipo',
          type: 'object',
          objectColumn: 'FinancialProduct.Name',
          asyncList: this._types,
          listID: 'ID',
          listDisplay: 'Name',
          objectID: 'FinancialProductID'
        },
        { name: 'Description', title: 'Descripción', type: 'text', hidden: true },
        { name: 'StartDate', title: 'Fec.Inicio', type: 'date' },
        { name: 'DueDate', title: 'Fec.Vencimiento', type: 'date' },
        { name: 'MonthlyPayment', title: 'Pago Mensual', type: 'money' },
        { name: 'Balance', title: 'Saldo', type: 'money' }
      ];
  }

  addProduct(product: ProfileProduct) {
    product.ParticipantProfileID = this.profile.ID;
    this._prodServ.addProfileProduct(product).subscribe(
      data => {
        this.toast.success(data.Name, 'Producto agregado');
        this.profile.Products.push(data);
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  editProduct(product: ProfileProduct) {
    this._prodServ.editProfileProduct(product.ID, product).subscribe(
      data => {
        this.toast.success(product.Name, 'Producto actualizado');
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }
}
