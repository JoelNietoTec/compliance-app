import { Component, OnInit } from '@angular/core';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { FinancialProduct, ProductType } from '../../../shared/models/products.model';
import { FinancialProductsService } from '../../../shared/services/financial-products.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-financial-products',
  templateUrl: './financial-products.component.html',
  styleUrls: ['./financial-products.component.css']
})
export class FinancialProductsComponent implements OnInit {
  _table: TableOptions = {};
  _products: Observable<FinancialProduct[]>;
  _types: ProductType[] = [{ id: 1, name: 'Activo', englishName: 'Asset' }, { id: 2, name: 'Deuda', englishName: 'Debt' }];
  constructor(private _prodServ: FinancialProductsService, private toast: ToastrService) {}

  ngOnInit() {
    this._table.title = 'Productos Financieros';
    this._table.pageable = true;
    this._table.editable = true;
    this._table.addMethod = 'inline';
    this._table.searcheable = true;
    this._table.style = 'table-squared';
    this._table.deletable = true;
    this._table.columns = [
      { name: 'ID', title: '#', hidden: true },
      {
        name: 'type',
        title: 'Tipo',
        sortable: true,
        type: 'object',
        list: this._types,
        listID: 'id',
        listDisplay: 'name',
        objectColumn: 'type.name',
        objectID: 'productTypeId'
      },
      { name: 'name', title: 'Nombre', filterable: true },
      { name: 'englishName', title: 'Nombre Inglés', filterable: true }
    ];

    this._products =  this._prodServ.getProducts();
  }

  addProduct(product: FinancialProduct) {
    this._prodServ.createProduct(product).subscribe(
      data => {
        this.toast.success(data.name, 'Producto creado');
        this._products = this._prodServ.getProducts();
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  editProduct(product: FinancialProduct) {
    this._prodServ.editProduct(product.id, product).subscribe(
      data => {
        this.toast.success(product.name, 'Producto actualizado');
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  deleteProduct(id: number) {
    this._prodServ.deleteProduct(id).subscribe(
      data => {
        this.toast.info('Producto eliminado');
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }
}
