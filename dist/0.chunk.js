webpackJsonp([0],{

/***/ "../../../../../src/app/dashboard/settings/document-types/document-types.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/settings/document-types/document-types.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <table class=\"table table-sm table-squared table-bordered table-hover\">\n    <thead>\n      <tr>\n        <th class=\"text-center\">ID</th>\n        <th>Name</th>\n        <th>English Name</th>\n        <th class=\"text-center\">Actions</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let type of _types\">\n        <td class=\"text-center\">{{ type.ID }}</td>\n        <td>{{ type.Name}}</td>\n        <td>{{ type.EnglishName }}</td>\n        <td class=\"text-center\">\n            <div class=\"btn btn-success btn-sm\"><i class=\"typcn typcn-edit\"></i> Edit</div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/settings/document-types/document-types.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_documents_service__ = __webpack_require__("../../../../../src/app/shared/services/documents.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentTypesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DocumentTypesComponent = /** @class */ (function () {
    function DocumentTypesComponent(_docServ) {
        this._docServ = _docServ;
    }
    DocumentTypesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._docServ.getTypes()
            .subscribe(function (data) {
            _this._types = data;
        });
    };
    DocumentTypesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-document-types',
            template: __webpack_require__("../../../../../src/app/dashboard/settings/document-types/document-types.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/settings/document-types/document-types.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_documents_service__["a" /* DocumentsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services_documents_service__["a" /* DocumentsService */]) === "function" && _a || Object])
    ], DocumentTypesComponent);
    return DocumentTypesComponent;
    var _a;
}());

//# sourceMappingURL=document-types.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/settings/relationship-types/relationship-types.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/settings/relationship-types/relationship-types.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <table class=\"table table-sm table-squared table-bordered table-hover\">\n    <thead>\n      <tr>\n        <th class=\"text-center\">ID</th>\n        <th>Name</th>\n        <th>English Name</th>\n        <th class=\"text-center\">Actions</th>\n      </tr>\n    </thead>\n    <tbody>\n      <ng-container *ngFor=\"let type of _types\">\n        <tr>\n          <td class=\"text-center\">{{ type.ID }}</td>\n          <td>{{ type.Name }}</td>\n          <td>{{ type.EnglishName }}</td>\n          <td class=\"text-center\">\n            <div class=\"btn btn-success btn-sm\"><i class=\"typcn typcn-edit\"></i> Edit</div>\n          </td>\n        </tr>\n        <!-- <tr>\n              <td></td>\n              <td><input type=\"text\" [(ngModel)]=\"_selType.Name\" class=\"form-control form-control-sm\" name=\"name\"></td>\n              <td><input type=\"text\" [(ngModel)]=\"_selType.EnglishName\" class=\"form-control form-control-sm\" name=\"english-name\"></td>\n              <td class=\"text-center\">\n                <div class=\"btn btn-primary btn-sm\" (click)=\"addType()\"><i class=\"typcn typcn-plus-outline\"></i> Add</div>\n              </td>\n            </tr> -->\n      </ng-container>\n      <tr class=\"border-primary\">\n        <td></td>\n        <td><input type=\"text\" [(ngModel)]=\"_newType.Name\" class=\"form-control form-control-sm\" name=\"name\"></td>\n        <td><input type=\"text\" [(ngModel)]=\"_newType.EnglishName\" class=\"form-control form-control-sm\" name=\"english-name\"></td>\n        <td class=\"text-center\">\n          <div class=\"btn btn-primary btn-sm\" (click)=\"addType()\"><i class=\"typcn typcn-plus-outline\"></i> Add</div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/settings/relationship-types/relationship-types.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_relationships_service__ = __webpack_require__("../../../../../src/app/shared/services/relationships.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelationshipTypesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RelationshipTypesComponent = /** @class */ (function () {
    function RelationshipTypesComponent(_relService) {
        this._relService = _relService;
        this._newType = {};
        this._selType = {};
    }
    RelationshipTypesComponent.prototype.ngOnInit = function () {
        this.getTypes();
    };
    RelationshipTypesComponent.prototype.getTypes = function () {
        var _this = this;
        this._relService.getTypes()
            .subscribe(function (data) {
            _this._types = data;
        });
    };
    RelationshipTypesComponent.prototype.addType = function () {
        var _this = this;
        this._relService.createType(this._newType)
            .subscribe(function (data) {
            _this._types.push(data);
            _this._newType = {};
        });
    };
    RelationshipTypesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-relationship-types',
            template: __webpack_require__("../../../../../src/app/dashboard/settings/relationship-types/relationship-types.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/settings/relationship-types/relationship-types.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_relationships_service__["a" /* RelationshipsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services_relationships_service__["a" /* RelationshipsService */]) === "function" && _a || Object])
    ], RelationshipTypesComponent);
    return RelationshipTypesComponent;
    var _a;
}());

//# sourceMappingURL=relationship-types.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/settings/settings-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_component__ = __webpack_require__("../../../../../src/app/dashboard/settings/settings.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsRoutingModule; });
/* unused harmony export routedComponents */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__settings_component__["a" /* SettingsComponent */] },
];
var SettingsRoutingModule = /** @class */ (function () {
    function SettingsRoutingModule() {
    }
    SettingsRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]],
        })
    ], SettingsRoutingModule);
    return SettingsRoutingModule;
}());

var routedComponents = [__WEBPACK_IMPORTED_MODULE_2__settings_component__["a" /* SettingsComponent */]];
//# sourceMappingURL=settings-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/settings/settings.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/settings/settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <ngb-tabset type=\"pills\">\n    <ngb-tab title=\"Relationship Types\">\n      <ng-template ngbTabContent>\n        <app-relationship-types></app-relationship-types>\n      </ng-template>\n    </ngb-tab>\n    <ngb-tab title=\"Document Types\">\n      <ng-template ngbTabContent>\n        <app-document-types></app-document-types>\n      </ng-template>\n    </ngb-tab>\n  </ngb-tabset>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/settings/settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettingsComponent = /** @class */ (function () {
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    SettingsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__("../../../../../src/app/dashboard/settings/settings.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/settings/settings.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SettingsComponent);
    return SettingsComponent;
}());

//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/settings/settings.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_component__ = __webpack_require__("../../../../../src/app/dashboard/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__settings_routing_module__ = __webpack_require__("../../../../../src/app/dashboard/settings/settings-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__relationship_types_relationship_types_component__ = __webpack_require__("../../../../../src/app/dashboard/settings/relationship-types/relationship-types.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__document_types_document_types_component__ = __webpack_require__("../../../../../src/app/dashboard/settings/document-types/document-types.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */],
                __WEBPACK_IMPORTED_MODULE_6__settings_routing_module__["a" /* SettingsRoutingModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_5__settings_component__["a" /* SettingsComponent */], __WEBPACK_IMPORTED_MODULE_7__relationship_types_relationship_types_component__["a" /* RelationshipTypesComponent */], __WEBPACK_IMPORTED_MODULE_8__document_types_document_types_component__["a" /* DocumentTypesComponent */]]
        })
    ], SettingsModule);
    return SettingsModule;
}());

//# sourceMappingURL=settings.module.js.map

/***/ })

});
//# sourceMappingURL=0.chunk.js.map