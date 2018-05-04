import { Component, OnInit } from '@angular/core';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { FinancialProduct, ProductType } from '../../../shared/models/products.model';
import { FinancialProductsService } from '../../../shared/services/financial-products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-financial-products',
  templateUrl: './financial-products.component.html',
  styleUrls: ['./financial-products.component.css']
})
export class FinancialProductsComponent implements OnInit {
  _table: TableOptions = {};
  _products: FinancialProduct[];
  _types: ProductType[] = [{ ID: 1, Name: 'Activo', EnglishName: 'Asset' }, { ID: 2, Name: 'Deuda', EnglishName: 'Debt' }];
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
        name: 'ProductType',
        title: 'Tipo',
        sortable: true,
        type: 'object',
        list: this._types,
        listID: 'ID',
        listDisplay: 'Name',
        objectColumn: 'ProductType.Name',
        objectID: 'ProductTypeID'
      },
      { name: 'Name', title: 'Nombre', filterable: true },
      { name: 'EnglishName', title: 'Nombre Inglés', filterable: true }
    ];

    this._prodServ.getProducts().subscribe(data => {
      this._products = data;
    });
  }

  addProduct(product: FinancialProduct) {
    this._prodServ.createProduct(product).subscribe(
      data => {
        this.toast.success(data.Name, 'Producto creado');
        this._products.push(data);
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  editProduct(product: FinancialProduct) {
    this._prodServ.editProduct(product.ID, product).subscribe(
      data => {
        this.toast.success(product.Name, 'Producto actualizado');
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
