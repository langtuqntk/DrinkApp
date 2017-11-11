webpackJsonpac__name_([5],{

/***/ 1513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AngularEchartsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directive_angular_echarts_directive__ = __webpack_require__(1812);
/* unused harmony namespace reexport */



var AngularEchartsModule = (function () {
    function AngularEchartsModule() {
    }
    return AngularEchartsModule;
}());

AngularEchartsModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                declarations: [
                    __WEBPACK_IMPORTED_MODULE_1__directive_angular_echarts_directive__["a" /* AngularEchartsDirective */]
                ],
                exports: [
                    __WEBPACK_IMPORTED_MODULE_1__directive_angular_echarts_directive__["a" /* AngularEchartsDirective */]
                ]
            },] },
];
AngularEchartsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BanHangComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__(1367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_data_phieuxuat_service__ = __webpack_require__(1841);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_data_phieuxuat__ = __webpack_require__(1842);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(2334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);







var BanHangComponent = (function () {
    function BanHangComponent(router, modalService, service) {
        this.router = router;
        this.modalService = modalService;
        this.service = service;
        this.hangs = [];
        this.hangSelected = [];
        this.isReady = false;
        this.Sophieuxuat = Math.floor((Math.random() * 10000) + 1);
        this.TienTra = 0;
        this.TienDu = 0;
        this.Thanhtoan = 0;
    }
    BanHangComponent.prototype.xuatPhieu = function () {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_5__core_data_phieuxuat__["a" /* PhieuXuat */]();
        data.Sophieuxuat = this.Sophieuxuat;
        data.Ngayxuat = new Date(this.Ngayxuat.month + '/' + this.Ngayxuat.day + '/' + this.Ngayxuat.year);
        data.MaNV = this.MaNV;
        data.LoaiKH = this.LoaiKH;
        data.Maban = this.Maban;
        data.TienTra = this.TienTra;
        data.TienDu = this.TienDu;
        data.Thanhtoan = this.Thanhtoan;
        this.service.create(data).then(function (phieuxuat) {
            var listDataCtiet = [];
            for (var i in _this.hangs) {
                var dataCtiet = new __WEBPACK_IMPORTED_MODULE_5__core_data_phieuxuat__["b" /* PhieuXuatCtiet */]();
                dataCtiet.Sophieuxuat = phieuxuat.Sophieuxuat;
                dataCtiet.Mahang = _this.hangs[i].hang.split('-')[0];
                dataCtiet.Dongia = _this.hangs[i].hang.split('-')[1];
                dataCtiet.Soluong = _this.hangs[i].soluong;
                dataCtiet.Tralai = false;
                listDataCtiet.push(dataCtiet);
            }
            var dataReq = { hangs: listDataCtiet };
            _this.service.createCtiet(dataReq).then(function (phieuxuatCtiet) {
                _this.router.navigateByUrl('/app/pages/hoadon');
            });
        }).catch(function (error) { return console.log(error.json().message); });
    };
    BanHangComponent.prototype.chonHang = function (e) {
        if (e.target.value !== "*") {
            var hangText = e.target.options[e.target.selectedIndex].text;
            var hangValue = e.target.value;
            var soluong = +prompt("Nhập số lượng:", "1");
            if (soluong !== 0) {
                this.Thanhtoan += +hangValue.split('-')[1] * soluong;
                var index = this.hangSelected.indexOf(hangValue);
                if (index > -1) {
                    soluong = this.hangs[index].soluong + soluong;
                    this.hangs[index] = { hang: hangValue, soluong: soluong, text: hangText + (" - " + soluong + " c\u00E1i") };
                }
                else {
                    this.hangs.push({ hang: hangValue, soluong: soluong, text: hangText + (" - " + soluong + " c\u00E1i") });
                    this.hangSelected.push(hangValue);
                }
                setTimeout(function () { return e.target.value = "*"; }, 1000);
            }
            else {
                setTimeout(function () { return e.target.value = "*"; }, 1000);
            }
        }
    };
    BanHangComponent.prototype.xoaHang = function (e) {
        var _this = this;
        console.log(__WEBPACK_IMPORTED_MODULE_6_jquery___default()(e.target).val());
        var listSelected = __WEBPACK_IMPORTED_MODULE_6_jquery___default.a.map(__WEBPACK_IMPORTED_MODULE_6_jquery___default()(e.target).val(), function (item) {
            var arr = item.split('-');
            return arr[0] + '-' + arr[1];
        });
        var arrIndex = __WEBPACK_IMPORTED_MODULE_6_jquery___default.a.map(listSelected, function (index, item) {
            return _this.hangSelected.indexOf(item);
        });
        for (var i = arrIndex.length - 1; i >= 0; i--) {
            this.hangSelected.splice(arrIndex[i], 1);
            this.hangs.splice(arrIndex[i], 1);
            this.Thanhtoan -= +this.hangs[i].hang.split('-')[1] * this.hangs[i].soluong;
        }
    };
    BanHangComponent.prototype.nhapTien = function () {
        if (this.TienTra < this.Thanhtoan) {
            alert('Tiền khách trả chưa đủ.');
        }
        else {
            this.TienDu = this.TienTra - this.Thanhtoan;
            this.isReady = true;
        }
    };
    return BanHangComponent;
}());
BanHangComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-form-layouts',
        providers: [__WEBPACK_IMPORTED_MODULE_4__core_data_phieuxuat_service__["a" /* PhieuXuatService */]],
        styles: [__webpack_require__(2665)],
        template: __webpack_require__(2389),
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */], __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */], __WEBPACK_IMPORTED_MODULE_4__core_data_phieuxuat_service__["a" /* PhieuXuatService */]])
], BanHangComponent);



/***/ }),

/***/ 1540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoaDonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);


var HoaDonComponent = (function () {
    function HoaDonComponent() {
    }
    HoaDonComponent.prototype.print = function () {
        var printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>Print tab</title>\n          <style>\n          //........Customized style.......\n          </style>\n        </head>\n        <body onload=\"window.print();window.close()\">" + printContents + "</body>\n      </html>");
        popupWin.document.close();
    };
    return HoaDonComponent;
}());
HoaDonComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-form-layouts',
        styles: [__webpack_require__(2666)],
        template: __webpack_require__(2390),
    })
], HoaDonComponent);



/***/ }),

/***/ 1541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CapNhatGiaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);


var CapNhatGiaComponent = (function () {
    function CapNhatGiaComponent() {
    }
    return CapNhatGiaComponent;
}());
CapNhatGiaComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-form-layouts',
        styles: [__webpack_require__(2667)],
        template: __webpack_require__(2391),
    })
], CapNhatGiaComponent);



/***/ }),

/***/ 1544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nebular_theme__ = __webpack_require__(1340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_utils_analytics_service__ = __webpack_require__(1374);




var DashboardComponent = (function () {
    function DashboardComponent(themeService, analyticsService) {
        this.themeService = themeService;
        this.analyticsService = analyticsService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.themeService.getJsTheme()
            .subscribe(function (theme) { return _this.theme = theme; });
    };
    DashboardComponent.prototype.toggleTheme = function (theme) {
        var boolTheme = this.boolToTheme(theme);
        this.themeService.changeTheme(boolTheme);
        this.analyticsService.trackEvent('switchTheme');
    };
    DashboardComponent.prototype.boolToTheme = function (theme) {
        return theme ? 'default' : 'cosmic';
    };
    return DashboardComponent;
}());
DashboardComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-dashboard',
        styles: [__webpack_require__(2675)],
        template: __webpack_require__(2400),
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__nebular_theme__["m" /* NbThemeService */], __WEBPACK_IMPORTED_MODULE_3__core_utils_analytics_service__["a" /* AnalyticsService */]])
], DashboardComponent);



/***/ }),

/***/ 1545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NhapHangComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);


var NhapHangComponent = (function () {
    function NhapHangComponent() {
        this.hangs = [];
    }
    NhapHangComponent.prototype.nhapHang = function () {
        var hang = prompt("Nhập hàng:");
        var soluong = prompt("Nhập số lượng:", "1");
        if (hang !== null) {
            this.hangs.push(hang + ("(" + soluong + ")"));
        }
    };
    return NhapHangComponent;
}());
NhapHangComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-form-layouts',
        styles: [__webpack_require__(2694)],
        template: __webpack_require__(2412),
    })
], NhapHangComponent);



/***/ }),

/***/ 1546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_menu__ = __webpack_require__(1931);



var PagesComponent = (function () {
    function PagesComponent() {
        this.menu = __WEBPACK_IMPORTED_MODULE_2__pages_menu__["a" /* MENU_ITEMS */];
    }
    return PagesComponent;
}());
PagesComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-pages',
        template: "\n    <ngx-sample-layout>\n      <nb-menu [items]=\"menu\"></nb-menu>\n      <router-outlet></router-outlet>\n    </ngx-sample-layout>\n  ",
    })
], PagesComponent);



/***/ }),

/***/ 1679:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b7c0827326f8d621b1ed9aa93c8815b8.svg";

/***/ }),

/***/ 1812:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(echarts) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AngularEchartsDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);

var AngularEchartsDirective = (function () {
    function AngularEchartsDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.theme = '';
        this.chartInit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartDblClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartMouseDown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartMouseUp = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartMouseOver = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartMouseOut = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartGlobalOut = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartContextMenu = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartDataZoom = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.myChart = null;
        this.currentWindowWidth = null;
    }
    AngularEchartsDirective.prototype.createChart = function () {
        this.theme = this.theme || '';
        this.currentWindowWidth = window.innerWidth;
        if (this.theme) {
            return echarts.init(this.el.nativeElement, this.theme);
        }
        else {
            return echarts.init(this.el.nativeElement);
        }
    };
    AngularEchartsDirective.prototype.updateChart = function () {
        this.myChart.setOption(this.options);
        this.myChart.resize();
    };
    AngularEchartsDirective.prototype.onWindowResize = function (event) {
        if (event.target.innerWidth !== this.currentWindowWidth) {
            this.currentWindowWidth = event.target.innerWidth;
            if (this.myChart) {
                this.myChart.resize();
            }
        }
    };
    AngularEchartsDirective.prototype.ngOnChanges = function (changes) {
        if (changes['dataset']) {
            this.onDatasetChange(this.dataset);
        }
        if (changes['options']) {
            this.onOptionsChange(this.options);
        }
        if (changes['loading']) {
            this.onLoadingChange(this.loading);
        }
    };
    AngularEchartsDirective.prototype.ngOnDestroy = function () {
        if (this.myChart) {
            this.myChart.dispose();
            this.myChart = null;
        }
    };
    AngularEchartsDirective.prototype.onOptionsChange = function (opt) {
        if (opt) {
            if (!this.myChart) {
                this.myChart = this.createChart();
                this.chartInit.emit(this.myChart);
                this.registerEvents(this.myChart);
            }
            if (this.hasData()) {
                this.updateChart();
            }
            else if (this.dataset && this.dataset.length) {
                this.mergeDataset(this.dataset);
                this.updateChart();
            }
        }
    };
    AngularEchartsDirective.prototype.onDatasetChange = function (dataset) {
        if (this.myChart && this.options) {
            if (!this.options.series) {
                this.options.series = [];
            }
            this.mergeDataset(dataset);
            this.updateChart();
        }
    };
    AngularEchartsDirective.prototype.onLoadingChange = function (loading) {
        if (this.myChart) {
            if (loading) {
                this.myChart.showLoading();
            }
            else {
                this.myChart.hideLoading();
            }
        }
    };
    AngularEchartsDirective.prototype.mergeDataset = function (dataset) {
        for (var i = 0, len = dataset.length; i < len; i++) {
            if (!this.options.series[i]) {
                this.options.series[i] = { data: dataset[i] };
            }
            else {
                this.options.series[i].data = dataset[i];
            }
        }
    };
    AngularEchartsDirective.prototype.hasData = function () {
        if (!this.options.series || !this.options.series.length) {
            return false;
        }
        for (var _i = 0, _a = this.options.series; _i < _a.length; _i++) {
            var serie = _a[_i];
            if (serie.data && serie.data.length > 0) {
                return true;
            }
        }
        return false;
    };
    AngularEchartsDirective.prototype.registerEvents = function (myChart) {
        var _this = this;
        if (myChart) {
            myChart.on('click', function (e) { _this.chartClick.emit(e); });
            myChart.on('dblClick', function (e) { _this.chartDblClick.emit(e); });
            myChart.on('mousedown', function (e) { _this.chartMouseDown.emit(e); });
            myChart.on('mouseup', function (e) { _this.chartMouseUp.emit(e); });
            myChart.on('mouseover', function (e) { _this.chartMouseOver.emit(e); });
            myChart.on('mouseout', function (e) { _this.chartMouseOut.emit(e); });
            myChart.on('globalout', function (e) { _this.chartGlobalOut.emit(e); });
            myChart.on('contextmenu', function (e) { _this.chartContextMenu.emit(e); });
            myChart.on('dataZoom', function (e) { _this.chartDataZoom.emit(e); });
        }
    };
    return AngularEchartsDirective;
}());

AngularEchartsDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: '[echarts]'
            },] },
];
AngularEchartsDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
]; };
AngularEchartsDirective.propDecorators = {
    'options': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'dataset': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'theme': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'loading': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'chartInit': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'chartClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'chartDblClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'chartMouseDown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'chartMouseUp': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'chartMouseOver': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'chartMouseOut': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'chartGlobalOut': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'chartContextMenu': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'chartDataZoom': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'onWindowResize': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"], args: ['window:resize', ['$event'],] },],
};
//# sourceMappingURL=angular-echarts.directive.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(589)))

/***/ }),

/***/ 1833:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2084);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhieuXuatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(1363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);




var PhieuXuatService = (function () {
    function PhieuXuatService(http) {
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        this.PhieuXuatsUrl = "api/phieuxuats";
    }
    PhieuXuatService.prototype.getPhieuXuats = function () {
        return this.http.get(this.PhieuXuatsUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PhieuXuatService.prototype.getPhieuXuat = function (id) {
        var url = this.PhieuXuatsUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PhieuXuatService.prototype.delete = function (id) {
        var url = this.PhieuXuatsUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    PhieuXuatService.prototype.update = function (phieuxuat) {
        var url = this.PhieuXuatsUrl + "/" + phieuxuat._id;
        return this.http
            .put(url, JSON.stringify(phieuxuat), { headers: this.headers })
            .toPromise()
            .then(function () { return phieuxuat; })
            .catch(this.handleError);
    };
    PhieuXuatService.prototype.create = function (phieuxuat) {
        console.log(phieuxuat);
        return this.http
            .post(this.PhieuXuatsUrl, JSON.stringify(phieuxuat), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PhieuXuatService.prototype.createCtiet = function (data) {
        return this.http
            .post(this.PhieuXuatsUrl + '/detail', JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PhieuXuatService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return PhieuXuatService;
}());
PhieuXuatService = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], PhieuXuatService);



/***/ }),

/***/ 1842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhieuXuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PhieuXuatCtiet; });
var PhieuXuat = (function () {
    function PhieuXuat() {
    }
    return PhieuXuat;
}());

var PhieuXuatCtiet = (function () {
    function PhieuXuatCtiet() {
    }
    return PhieuXuatCtiet;
}());



/***/ }),

/***/ 1896:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nebular_theme__ = __webpack_require__(1340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_data_users_service__ = __webpack_require__(1434);




var ContactsComponent = (function () {
    function ContactsComponent(userService, themeService, breakpointService) {
        var _this = this;
        this.userService = userService;
        this.themeService = themeService;
        this.breakpointService = breakpointService;
        this.breakpoints = breakpointService.getBreakpointsMap();
        this.themeSubscription = themeService.onMediaQueryChange()
            .subscribe(function (_a) {
            var oldValue = _a[0], newValue = _a[1];
            _this.breakpoint = newValue;
        });
    }
    ContactsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) {
            _this.contacts = [
                { user: users.nick, type: 'mobile' },
                { user: users.eva, type: 'home' },
                { user: users.jack, type: 'mobile' },
                { user: users.lee, type: 'mobile' },
                { user: users.alan, type: 'home' },
                { user: users.kate, type: 'work' },
            ];
            _this.recent = [
                { user: users.alan, type: 'home', time: '9:12 pm' },
                { user: users.eva, type: 'home', time: '7:45 pm' },
                { user: users.nick, type: 'mobile', time: '5:29 pm' },
                { user: users.lee, type: 'mobile', time: '11:24 am' },
                { user: users.jack, type: 'mobile', time: '10:45 am' },
                { user: users.kate, type: 'work', time: '9:42 am' },
                { user: users.kate, type: 'work', time: '9:31 am' },
                { user: users.jack, type: 'mobile', time: '8:01 am' },
            ];
        });
    };
    ContactsComponent.prototype.ngOnDestroy = function () {
        this.themeSubscription.unsubscribe();
    };
    return ContactsComponent;
}());
ContactsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-contacts',
        styles: [__webpack_require__(2674)],
        template: __webpack_require__(2399),
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__core_data_users_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_2__nebular_theme__["m" /* NbThemeService */],
        __WEBPACK_IMPORTED_MODULE_2__nebular_theme__["n" /* NbMediaBreakpointsService */]])
], ContactsComponent);



/***/ }),

/***/ 1897:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_echarts__ = __webpack_require__(1513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__theme_theme_module__ = __webpack_require__(1346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_component__ = __webpack_require__(1544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__status_card_status_card_component__ = __webpack_require__(1906);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__contacts_contacts_component__ = __webpack_require__(1896);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__rooms_rooms_component__ = __webpack_require__(1903);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__rooms_room_selector_room_selector_component__ = __webpack_require__(1902);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__temperature_temperature_component__ = __webpack_require__(1909);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__temperature_temperature_dragger_temperature_dragger_component__ = __webpack_require__(1908);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__team_team_component__ = __webpack_require__(1907);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__kitten_kitten_component__ = __webpack_require__(1900);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__security_cameras_security_cameras_component__ = __webpack_require__(1904);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__electricity_electricity_component__ = __webpack_require__(1899);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__electricity_electricity_chart_electricity_chart_component__ = __webpack_require__(1898);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__weather_weather_component__ = __webpack_require__(1912);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__solar_solar_component__ = __webpack_require__(1905);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__rooms_player_player_component__ = __webpack_require__(1901);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__traffic_traffic_component__ = __webpack_require__(1911);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__traffic_traffic_chart_component__ = __webpack_require__(1910);





















var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__theme_theme_module__["a" /* ThemeModule */],
            __WEBPACK_IMPORTED_MODULE_2_ngx_echarts__["a" /* AngularEchartsModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_5__status_card_status_card_component__["a" /* StatusCardComponent */],
            __WEBPACK_IMPORTED_MODULE_10__temperature_temperature_dragger_temperature_dragger_component__["a" /* TemperatureDraggerComponent */],
            __WEBPACK_IMPORTED_MODULE_6__contacts_contacts_component__["a" /* ContactsComponent */],
            __WEBPACK_IMPORTED_MODULE_8__rooms_room_selector_room_selector_component__["a" /* RoomSelectorComponent */],
            __WEBPACK_IMPORTED_MODULE_9__temperature_temperature_component__["a" /* TemperatureComponent */],
            __WEBPACK_IMPORTED_MODULE_7__rooms_rooms_component__["a" /* RoomsComponent */],
            __WEBPACK_IMPORTED_MODULE_11__team_team_component__["a" /* TeamComponent */],
            __WEBPACK_IMPORTED_MODULE_12__kitten_kitten_component__["a" /* KittenComponent */],
            __WEBPACK_IMPORTED_MODULE_13__security_cameras_security_cameras_component__["a" /* SecurityCamerasComponent */],
            __WEBPACK_IMPORTED_MODULE_14__electricity_electricity_component__["a" /* ElectricityComponent */],
            __WEBPACK_IMPORTED_MODULE_15__electricity_electricity_chart_electricity_chart_component__["a" /* ElectricityChartComponent */],
            __WEBPACK_IMPORTED_MODULE_16__weather_weather_component__["a" /* WeatherComponent */],
            __WEBPACK_IMPORTED_MODULE_18__rooms_player_player_component__["a" /* PlayerComponent */],
            __WEBPACK_IMPORTED_MODULE_17__solar_solar_component__["a" /* SolarComponent */],
            __WEBPACK_IMPORTED_MODULE_19__traffic_traffic_component__["a" /* TrafficComponent */],
            __WEBPACK_IMPORTED_MODULE_20__traffic_traffic_chart_component__["a" /* TrafficChartComponent */],
        ],
    })
], DashboardModule);



/***/ }),

/***/ 1898:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(echarts) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElectricityChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nebular_theme__ = __webpack_require__(1340);



var ElectricityChartComponent = (function () {
    function ElectricityChartComponent(theme) {
        this.theme = theme;
        var points = [490, 490, 495, 500, 505, 510, 520, 530, 550, 580, 630,
            720, 800, 840, 860, 870, 870, 860, 840, 800, 720, 200, 145, 130, 130,
            145, 200, 570, 635, 660, 670, 670, 660, 630, 580, 460, 380, 350, 340,
            340, 340, 340, 340, 340, 340, 340, 340];
        // const points = [];
        // let pointsCount = 100;
        // let min = -3;
        // let max = 3;
        // let xStep = (max - min) / pointsCount;
        //
        // for(let x = -3; x <= 3; x += xStep) {
        //   let res = x**3 - 5*x + 17;
        //   points.push(Math.round(res * 25));
        // }
        this.data = points.map(function (p, index) { return ({
            label: (index % 5 === 3) ? "" + Math.round(index / 5) : '',
            value: p,
        }); });
    }
    ElectricityChartComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.themeSubscription = this.theme.getJsTheme().delay(1).subscribe(function (config) {
            var eTheme = config.variables.electricity;
            _this.option = {
                grid: {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 80,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            color: eTheme.tooltipLineColor,
                            width: eTheme.tooltipLineWidth,
                        },
                    },
                    textStyle: {
                        color: eTheme.tooltipTextColor,
                        fontSize: 20,
                        fontWeight: eTheme.tooltipFontWeight,
                    },
                    position: 'top',
                    backgroundColor: eTheme.tooltipBg,
                    borderColor: eTheme.tooltipBorderColor,
                    borderWidth: 3,
                    formatter: '{c0} kWh',
                    extraCssText: eTheme.tooltipExtraCss,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    offset: 25,
                    data: _this.data.map(function (i) { return i.label; }),
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {
                            color: eTheme.xAxisTextColor,
                            fontSize: 18,
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: eTheme.axisLineColor,
                            width: '2',
                        },
                    },
                },
                yAxis: {
                    boundaryGap: [0, '5%'],
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: eTheme.yAxisSplitLine,
                            width: '1',
                        },
                    },
                },
                series: [
                    {
                        type: 'line',
                        smooth: true,
                        symbolSize: 20,
                        itemStyle: {
                            normal: {
                                opacity: 0,
                            },
                            emphasis: {
                                color: '#ffffff',
                                borderColor: eTheme.itemBorderColor,
                                borderWidth: 2,
                                opacity: 1,
                            },
                        },
                        lineStyle: {
                            normal: {
                                width: eTheme.lineWidth,
                                type: eTheme.lineStyle,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: eTheme.lineGradFrom,
                                    }, {
                                        offset: 1,
                                        color: eTheme.lineGradTo,
                                    }]),
                                shadowColor: eTheme.lineShadow,
                                shadowBlur: 6,
                                shadowOffsetY: 12,
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: eTheme.areaGradFrom,
                                    }, {
                                        offset: 1,
                                        color: eTheme.areaGradTo,
                                    }]),
                            },
                        },
                        data: _this.data.map(function (i) { return i.value; }),
                    },
                    {
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        lineStyle: {
                            normal: {
                                width: eTheme.lineWidth,
                                type: eTheme.lineStyle,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: eTheme.lineGradFrom,
                                    }, {
                                        offset: 1,
                                        color: eTheme.lineGradTo,
                                    }]),
                                shadowColor: eTheme.shadowLineDarkBg,
                                shadowBlur: 14,
                                opacity: 1,
                            },
                        },
                        data: _this.data.map(function (i) { return i.value; }),
                    },
                ],
            };
        });
    };
    ElectricityChartComponent.prototype.ngOnDestroy = function () {
        this.themeSubscription.unsubscribe();
    };
    return ElectricityChartComponent;
}());
ElectricityChartComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-electricity-chart',
        styles: [__webpack_require__(2676)],
        template: "\n    <div echarts [options]=\"option\" class=\"echart\"></div>\n  ",
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__nebular_theme__["m" /* NbThemeService */]])
], ElectricityChartComponent);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(589)))

/***/ }),

/***/ 1899:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElectricityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nebular_theme__ = __webpack_require__(1340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_data_electricity_service__ = __webpack_require__(1534);




var ElectricityComponent = (function () {
    function ElectricityComponent(eService, themeService) {
        var _this = this;
        this.eService = eService;
        this.themeService = themeService;
        this.type = 'week';
        this.types = ['week', 'month', 'year'];
        this.data = eService.getData();
        this.themeSubscription = this.themeService.getJsTheme().subscribe(function (theme) {
            _this.currentTheme = theme.name;
        });
    }
    ElectricityComponent.prototype.ngOnDestroy = function () {
        this.themeSubscription.unsubscribe();
    };
    return ElectricityComponent;
}());
ElectricityComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-electricity',
        styles: [__webpack_require__(2677)],
        template: __webpack_require__(2401),
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__core_data_electricity_service__["a" /* ElectricityService */], __WEBPACK_IMPORTED_MODULE_2__nebular_theme__["m" /* NbThemeService */]])
], ElectricityComponent);



/***/ }),

/***/ 1900:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KittenComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nebular_theme__ = __webpack_require__(1340);



var KittenComponent = (function () {
    function KittenComponent(themeService) {
        var _this = this;
        this.themeService = themeService;
        this.themeSubscription = this.themeService.getJsTheme().subscribe(function (theme) {
            _this.currentTheme = theme.name;
        });
    }
    KittenComponent.prototype.ngOnDestroy = function () {
        this.themeSubscription.unsubscribe();
    };
    return KittenComponent;
}());
KittenComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-kitten',
        styles: [__webpack_require__(2678)],
        template: __webpack_require__(2402),
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__nebular_theme__["m" /* NbThemeService */]])
], KittenComponent);



/***/ }),

/***/ 1901:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_data_player_service__ = __webpack_require__(1538);



var PlayerComponent = (function () {
    function PlayerComponent(playerService) {
        this.playerService = playerService;
        this.track = this.playerService.random();
        this.createPlayer();
    }
    PlayerComponent.prototype.ngOnDestroy = function () {
        this.player.pause();
        this.player.src = '';
        this.player.load();
    };
    PlayerComponent.prototype.prev = function () {
        if (!this.player.loop) {
            if (this.shuffle) {
                this.track = this.playerService.random();
            }
            else {
                this.track = this.playerService.prev();
            }
        }
        this.reload();
    };
    PlayerComponent.prototype.next = function () {
        if (!this.player.loop) {
            if (this.shuffle) {
                this.track = this.playerService.random();
            }
            else {
                this.track = this.playerService.next();
            }
        }
        this.reload();
    };
    PlayerComponent.prototype.playPause = function () {
        if (this.player.paused) {
            this.player.play();
        }
        else {
            this.player.pause();
        }
    };
    PlayerComponent.prototype.toggleShuffle = function () {
        this.shuffle = !this.shuffle;
    };
    PlayerComponent.prototype.toggleLoop = function () {
        this.player.loop = !this.player.loop;
    };
    PlayerComponent.prototype.setVolume = function (volume) {
        this.player.volume = volume / 100;
    };
    PlayerComponent.prototype.getVolume = function () {
        return this.player.volume * 100;
    };
    PlayerComponent.prototype.setProgress = function (duration) {
        this.player.currentTime = this.player.duration * duration / 100;
    };
    PlayerComponent.prototype.getProgress = function () {
        return this.player.currentTime / this.player.duration * 100 || 0;
    };
    PlayerComponent.prototype.createPlayer = function () {
        var _this = this;
        this.player = new Audio();
        this.player.onended = function () { return _this.next(); };
        this.setTrack();
    };
    PlayerComponent.prototype.reload = function () {
        this.setTrack();
        this.player.play();
    };
    PlayerComponent.prototype.setTrack = function () {
        this.player.src = this.track.url;
        this.player.load();
    };
    return PlayerComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["HostBinding"])('class.collapsed'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Boolean)
], PlayerComponent.prototype, "collapsed", void 0);
PlayerComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-player',
        styles: [__webpack_require__(2679)],
        template: __webpack_require__(2403),
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core_data_player_service__["a" /* PlayerService */]])
], PlayerComponent);



/***/ }),

/***/ 1902:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomSelectorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);


var RoomSelectorComponent = (function () {
    function RoomSelectorComponent() {
        this.select = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.sortedRooms = [];
        this.viewBox = '-20 -20 618.88 407.99';
        this.isIE = !!(navigator.userAgent.match(/Trident/)
            || navigator.userAgent.match(/MSIE/)
            || navigator.userAgent.match(/Edge/));
        this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') >= 0;
        this.roomSvg = {
            borders: [{
                    d: 'M186.21,130.05H216.37V160H186.21Z',
                }],
            stokedAreas: [
                { d: 'M562.71,225V354h-290V319H418.37a6.09,6.09,0,0,0,6.09-6.09V225Z' },
                { d: 'M8.09,130V347.91A6.09,6.09,0,0,0,14.18,354h54V130Z' },
                { d: 'M216.37,49.82H358.8V92.5H216.37Z' },
            ],
            rooms: [
                {
                    id: '0',
                    name: { text: 'Kitchen', x: 142, y: 240.8 },
                    area: { d: 'M68.18,130V359.9A6.09,6.09,0,0,0,74.27,366h136a6.09,6.09,0,0,0,6.09-6.09V160H186.21V130Z' },
                    border: { d: 'M96,130H68.18V359.9A6.09,6.09,0,0,0,74.27,366h136a6.09,6.09,0,0,0,6.09-6.09V225 M152.71,' +
                            '130H186.21V160H218.5' },
                },
                {
                    id: '1',
                    name: { text: 'Bedroom', x: 109, y: 66 },
                    area: { d: 'M152.71,130h63.66V8.09A6.09,6.09,0,0,0,210.27,2H8.09A6.09,6.09,0,0,0,2,8.09V123.95A6.09,' +
                            '6.09,0,0,0,8.09,130H96Z' },
                    border: { d: 'M152.71,130h63.66V8.09A6.09,6.09,0,0,0,210.27,2H8.09A6.09,6.09,0,0,0,2,8.09V123.95A6.09' +
                            ',6.09,0,0,0,8.09,130H96' },
                },
                {
                    id: '2',
                    name: { text: 'Living Room', x: 468, y: 134 },
                    area: { d: 'M358.8,160V49.82a6.09,6.09,0,0,1,6.09-6.09H570.78a6.09,6.09,0,0,1,6.09,6.09V218.9a6.09' +
                            ',6.09,0,0,1-6.09,6.09h-212Z' },
                    border: { d: 'M358.8,160V49.82a6.09,6.09,0,0,1,6.09-6.09H570.78a6.09,6.09,0,0,1,6.09,6.09V218.9a6.09' +
                            ',6.09,0,0,1-6.09,6.09h-212' },
                },
                {
                    id: '3',
                    name: { text: 'Hallway', x: 320, y: 273 },
                    area: { d: 'M216.37,354V92.5H358.8V225H424.39V319H272.71V354Z' },
                    border: { d: 'M216.37,225V356 M216.21,162V92.5H358.8V160 M358.8,225H424.39V312.91a6.09,' +
                            '6.09,0,0,1,-6.09,6.09H272.71V356' },
                },
            ],
        };
        this.selectRoom('2');
    }
    RoomSelectorComponent.prototype.sortRooms = function () {
        var _this = this;
        this.sortedRooms = this.roomSvg.rooms.slice(0).sort(function (a, b) {
            if (a.id === _this.selectedRoom) {
                return 1;
            }
            if (b.id === _this.selectedRoom) {
                return -1;
            }
            return 0;
        });
    };
    RoomSelectorComponent.prototype.selectRoom = function (roomNumber) {
        this.select.emit(roomNumber);
        this.selectedRoom = roomNumber;
        this.sortRooms();
    };
    return RoomSelectorComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], RoomSelectorComponent.prototype, "select", void 0);
RoomSelectorComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-room-selector',
        template: __webpack_require__(2404),
        styles: [__webpack_require__(2680)],
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [])
], RoomSelectorComponent);



/***/ }),

/***/ 1903:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nebular_theme__ = __webpack_require__(1340);



var RoomsComponent = (function () {
    function RoomsComponent(themeService, breakpointService) {
        var _this = this;
        this.themeService = themeService;
        this.breakpointService = breakpointService;
        this.breakpoints = breakpointService.getBreakpointsMap();
        this.themeSubscription = themeService.onMediaQueryChange()
            .subscribe(function (_a) {
            var oldValue = _a[0], newValue = _a[1];
            _this.breakpoint = newValue;
        });
    }
    RoomsComponent.prototype.select = function (roomNumber) {
        if (this.isSelected(roomNumber)) {
            this.expand();
        }
        else {
            this.collapse();
        }
        this.selected = roomNumber;
    };
    RoomsComponent.prototype.expand = function () {
        this.expanded = true;
    };
    RoomsComponent.prototype.collapse = function () {
        this.expanded = false;
    };
    RoomsComponent.prototype.isCollapsed = function () {
        return !this.expanded;
    };
    RoomsComponent.prototype.isSelected = function (roomNumber) {
        return this.selected === roomNumber;
    };
    RoomsComponent.prototype.ngOnDestroy = function () {
        this.themeSubscription.unsubscribe();
    };
    return RoomsComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["HostBinding"])('class.expanded'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Boolean)
], RoomsComponent.prototype, "expanded", void 0);
RoomsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-rooms',
        styles: [__webpack_require__(2681)],
        template: "\n    <nb-card [size]=\"breakpoint.width >= breakpoints.sm ? 'large' : 'medium'\">\n      <i (click)=\"collapse()\" class=\"nb-arrow-down collapse\" [hidden]=\"isCollapsed()\"></i>\n      <ngx-room-selector (select)=\"select($event)\"></ngx-room-selector>\n      <ngx-player [collapsed]=\"isCollapsed() && breakpoint.width <= breakpoints.md\"></ngx-player>\n    </nb-card>\n  ",
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__nebular_theme__["m" /* NbThemeService */],
        __WEBPACK_IMPORTED_MODULE_2__nebular_theme__["n" /* NbMediaBreakpointsService */]])
], RoomsComponent);



/***/ }),

/***/ 1904:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecurityCamerasComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);


var SecurityCamerasComponent = (function () {
    function SecurityCamerasComponent() {
        this.cameras = [{
                title: 'Camera #1',
                source: 'assets/images/camera1.jpg',
            }, {
                title: 'Camera #2',
                source: 'assets/images/camera2.jpg',
            }, {
                title: 'Camera #3',
                source: 'assets/images/camera3.jpg',
            }, {
                title: 'Camera #4',
                source: 'assets/images/camera4.jpg',
            }];
        this.selectedCamera = this.cameras[0];
        this.userMenu = [{
                title: 'Profile',
            }, {
                title: 'Log out',
            }];
        this.isSingleView = false;
    }
    SecurityCamerasComponent.prototype.selectCamera = function (camera) {
        this.selectedCamera = camera;
        this.isSingleView = true;
    };
    return SecurityCamerasComponent;
}());
SecurityCamerasComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-security-cameras',
        styles: [__webpack_require__(2682)],
        template: __webpack_require__(2405),
    })
], SecurityCamerasComponent);



/***/ }),

/***/ 1905:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(echarts) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SolarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nebular_theme__ = __webpack_require__(1340);



var SolarComponent = (function () {
    function SolarComponent(theme) {
        this.theme = theme;
        this.value = 0;
        this.option = {};
    }
    Object.defineProperty(SolarComponent.prototype, "chartValue", {
        set: function (value) {
            this.value = value;
            if (this.option.series) {
                this.option.series[0].data[0].value = value;
                this.option.series[0].data[1].value = 100 - value;
                this.option.series[1].data[0].value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    SolarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.themeSubscription = this.theme.getJsTheme().delay(1).subscribe(function (config) {
            var solarTheme = config.variables.solar;
            _this.option = Object.assign({}, {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                series: [
                    {
                        name: ' ',
                        clockWise: true,
                        hoverAnimation: false,
                        type: 'pie',
                        center: ['45%', '50%'],
                        radius: solarTheme.radius,
                        data: [
                            {
                                value: _this.value,
                                name: ' ',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '{d}%',
                                        textStyle: {
                                            fontSize: '22',
                                            fontFamily: config.variables.fontSecondary,
                                            fontWeight: '600',
                                            color: config.variables.fgHeading,
                                        },
                                    },
                                },
                                tooltip: {
                                    show: false,
                                },
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: solarTheme.gradientLeft,
                                            },
                                            {
                                                offset: 1,
                                                color: solarTheme.gradientRight,
                                            },
                                        ]),
                                        shadowColor: solarTheme.shadowColor,
                                        shadowBlur: 0,
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 3,
                                    },
                                },
                                hoverAnimation: false,
                            },
                            {
                                value: 100 - _this.value,
                                name: ' ',
                                tooltip: {
                                    show: false,
                                },
                                label: {
                                    normal: {
                                        position: 'inner',
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: config.variables.layoutBg,
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: ' ',
                        clockWise: true,
                        hoverAnimation: false,
                        type: 'pie',
                        center: ['45%', '50%'],
                        radius: solarTheme.radius,
                        data: [
                            {
                                value: _this.value,
                                name: ' ',
                                label: {
                                    normal: {
                                        position: 'inner',
                                        show: false,
                                    },
                                },
                                tooltip: {
                                    show: false,
                                },
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: solarTheme.gradientLeft,
                                            },
                                            {
                                                offset: 1,
                                                color: solarTheme.gradientRight,
                                            },
                                        ]),
                                        shadowColor: solarTheme.shadowColor,
                                        shadowBlur: 7,
                                    },
                                },
                                hoverAnimation: false,
                            },
                            {
                                value: 28,
                                name: ' ',
                                tooltip: {
                                    show: false,
                                },
                                label: {
                                    normal: {
                                        position: 'inner',
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'none',
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });
    };
    SolarComponent.prototype.ngOnDestroy = function () {
        this.themeSubscription.unsubscribe();
    };
    return SolarComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])('chartValue'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Number),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [Number])
], SolarComponent.prototype, "chartValue", null);
SolarComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-solar',
        styles: [__webpack_require__(2683)],
        template: "\n    <nb-card size=\"xsmall\" class=\"solar-card\">\n      <nb-card-header>Solar Energy Consumption</nb-card-header>\n      <nb-card-body>\n        <div echarts [options]=\"option\" class=\"echart\">\n        </div>\n        <div class=\"info\">\n          <div class=\"value\">6. 421 kWh</div>\n          <div class=\"details\"><span>out of</span> 8.421 kWh</div>\n        </div>\n      </nb-card-body>\n    </nb-card>\n  ",
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__nebular_theme__["m" /* NbThemeService */]])
], SolarComponent);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(589)))

/***/ }),

/***/ 1906:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatusCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);


var StatusCardComponent = (function () {
    function StatusCardComponent() {
        this.on = true;
    }
    return StatusCardComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", String)
], StatusCardComponent.prototype, "title", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", String)
], StatusCardComponent.prototype, "type", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Boolean)
], StatusCardComponent.prototype, "on", void 0);
StatusCardComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-status-card',
        styles: [__webpack_require__(2684)],
        template: "\n    <nb-card (click)=\"on = !on\" [ngClass]=\"{'off': !on}\">\n      <div class=\"icon-container\">\n        <div class=\"icon {{ type }}\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n\n      <div class=\"details\">\n        <div class=\"title\">{{ title }}</div>\n        <div class=\"status\">{{ on ? 'ON' : 'OFF' }}</div>\n      </div>\n    </nb-card>\n  ",
    })
], StatusCardComponent);



/***/ }),

/***/ 1907:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);


var TeamComponent = (function () {
    function TeamComponent() {
    }
    return TeamComponent;
}());
TeamComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-team',
        styles: [__webpack_require__(2685)],
        template: __webpack_require__(2406),
    })
], TeamComponent);



/***/ }),

/***/ 1908:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemperatureDraggerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);


var VIEW_BOX_SIZE = 300;
var TemperatureDraggerComponent = TemperatureDraggerComponent_1 = (function () {
    function TemperatureDraggerComponent() {
        this.fillColors = '#2ec6ff';
        this.disableArcColor = '#999999';
        this.bottomAngle = 90;
        this.arcThickness = 18; // CSS pixels
        this.thumbRadius = 16; // CSS pixels
        this.thumbBorder = 3;
        this.maxLeap = 0.4;
        this.value = 50;
        this.valueChange = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.min = 0; // min output value
        this.max = 100; // max output value
        this.step = 0.1;
        this.power = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.off = false;
        this.svgControlId = new Date().getTime();
        this.scaleFactor = 1;
        this.bottomAngleRad = 0;
        this.radius = 100;
        this.translateXValue = 0;
        this.translateYValue = 0;
        this.thickness = 6;
        this.pinRadius = 10;
        this.colors = [];
        this.styles = {
            viewBox: '0 0 300 300',
            arcTranslateStr: 'translate(0, 0)',
            clipPathStr: '',
            gradArcs: [],
            nonSelectedArc: {},
            thumbPosition: { x: 0, y: 0 },
            blurRadius: 15,
        };
        this.isMouseDown = false;
        this.init = false;
        this.oldValue = this.value;
    }
    Object.defineProperty(TemperatureDraggerComponent.prototype, "setValue", {
        set: function (value) {
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    TemperatureDraggerComponent.prototype.onMouseUp = function (event) {
        this.recalculateValue(event);
        this.isMouseDown = false;
    };
    TemperatureDraggerComponent.prototype.onMouseMove = function (event) {
        this.recalculateValue(event);
    };
    TemperatureDraggerComponent.prototype.onResize = function (event) {
        this.invalidate();
    };
    TemperatureDraggerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // IE fix
        setTimeout(function () {
            _this.invalidate();
            _this.init = true;
        });
    };
    TemperatureDraggerComponent.prototype.ngOnChanges = function () {
        if (this.init) {
            this.invalidate();
        }
    };
    TemperatureDraggerComponent.prototype.mouseDown = function (event) {
        this.isMouseDown = true;
        if (!this.off) {
            this.recalculateValue(event, true);
        }
    };
    TemperatureDraggerComponent.prototype.switchPower = function () {
        this.off = !this.off;
        this.power.emit(!this.off);
        if (this.off) {
            this.oldValue = this.value;
            this.value = this.min;
        }
        else {
            this.value = this.oldValue;
        }
        this.invalidatePinPosition();
    };
    TemperatureDraggerComponent.prototype.invalidate = function () {
        this.bottomAngleRad = TemperatureDraggerComponent_1.toRad(this.bottomAngle);
        this.calculateVars();
        this.invalidateClipPathStr();
        this.invalidateGradientArcs();
        this.invalidatePinPosition();
    };
    TemperatureDraggerComponent.prototype.calculateVars = function () {
        this.bottomAngleRad = TemperatureDraggerComponent_1.toRad(this.bottomAngle);
        this.colors = (typeof this.fillColors === 'string') ? [this.fillColors] : this.fillColors;
        var baseRadius = VIEW_BOX_SIZE / 2;
        var halfAngle = this.bottomAngleRad / 2;
        var svgBoundingRect = this.svgRoot.nativeElement.getBoundingClientRect();
        var svgAreaFactor = svgBoundingRect.height && svgBoundingRect.width / svgBoundingRect.height || 1;
        var svgHeight = VIEW_BOX_SIZE / svgAreaFactor;
        var thumbMaxRadius = this.thumbRadius + this.thumbBorder;
        var thumbMargin = 2 * thumbMaxRadius > this.arcThickness
            ? (thumbMaxRadius - this.arcThickness / 2) / this.scaleFactor
            : 0;
        this.scaleFactor = svgBoundingRect.width / VIEW_BOX_SIZE || 1;
        this.styles.viewBox = "0 0 " + VIEW_BOX_SIZE + " " + svgHeight;
        var circleFactor = this.bottomAngleRad <= Math.PI
            ? (2 / (1 + Math.cos(halfAngle)))
            : (2 * Math.sin(halfAngle) / (1 + Math.cos(halfAngle)));
        if (circleFactor > svgAreaFactor) {
            if (this.bottomAngleRad > Math.PI) {
                this.radius = (VIEW_BOX_SIZE - 2 * thumbMargin) / (2 * Math.sin(halfAngle));
            }
            else {
                this.radius = VIEW_BOX_SIZE / 2 - thumbMargin;
            }
        }
        else {
            this.radius = (svgHeight - 2 * thumbMargin) / (1 + Math.cos(halfAngle));
        }
        this.translateXValue = VIEW_BOX_SIZE / 2 - this.radius;
        this.translateYValue = (svgHeight) / 2 - this.radius * (1 + Math.cos(halfAngle)) / 2;
        this.styles.arcTranslateStr = "translate(" + this.translateXValue + ", " + this.translateYValue + ")";
        this.thickness = this.arcThickness / this.scaleFactor;
        this.pinRadius = this.thumbRadius / this.scaleFactor;
    };
    TemperatureDraggerComponent.prototype.calculateClipPathSettings = function () {
        var halfAngle = this.bottomAngleRad / 2;
        var innerRadius = this.radius - this.thickness;
        var xStartMultiplier = 1 - Math.sin(halfAngle);
        var yMultiplier = 1 + Math.cos(halfAngle);
        var xEndMultiplier = 1 + Math.sin(halfAngle);
        return {
            outer: {
                start: {
                    x: xStartMultiplier * this.radius,
                    y: yMultiplier * this.radius,
                },
                end: {
                    x: xEndMultiplier * this.radius,
                    y: yMultiplier * this.radius,
                },
                radius: this.radius,
            },
            inner: {
                start: {
                    x: xStartMultiplier * innerRadius + this.thickness,
                    y: yMultiplier * innerRadius + this.thickness,
                },
                end: {
                    x: xEndMultiplier * innerRadius + this.thickness,
                    y: yMultiplier * innerRadius + this.thickness,
                },
                radius: innerRadius,
            },
            thickness: this.thickness,
            big: this.bottomAngleRad < Math.PI ? '1' : '0',
        };
    };
    TemperatureDraggerComponent.prototype.invalidateClipPathStr = function () {
        var s = this.calculateClipPathSettings();
        var path = "M " + s.outer.start.x + "," + s.outer.start.y; // Start at startangle top
        // Outer arc
        // Draw an arc of radius 'radius'
        // Arc details...
        path += " A " + s.outer.radius + "," + s.outer.radius + "\n       0 " + s.big + " 1\n       " + s.outer.end.x + "," + s.outer.end.y; // Arc goes to top end angle coordinate
        // Outer to inner connector
        path += " A " + s.thickness / 2 + "," + s.thickness / 2 + "\n       0 1 1\n       " + s.inner.end.x + "," + s.inner.end.y;
        // Inner arc
        path += " A " + s.inner.radius + "," + s.inner.radius + "\n       1 " + s.big + " 0\n       " + s.inner.start.x + "," + s.inner.start.y;
        // Outer to inner connector
        path += " A " + s.thickness / 2 + "," + s.thickness / 2 + "\n       0 1 1\n       " + s.outer.start.x + "," + s.outer.start.y;
        // Close path
        path += ' Z';
        this.styles.clipPathStr = path;
    };
    TemperatureDraggerComponent.prototype.calculateGradientConePaths = function (angleStep) {
        var radius = this.radius;
        function calcX(angle) {
            return radius * (1 - 2 * Math.sin(angle));
        }
        function calcY(angle) {
            return radius * (1 + 2 * Math.cos(angle));
        }
        var gradArray = [];
        for (var i = 0, currentAngle = this.bottomAngleRad / 2; i < this.colors.length; i++, currentAngle += angleStep) {
            gradArray.push({
                start: { x: calcX(currentAngle), y: calcY(currentAngle) },
                end: { x: calcX(currentAngle + angleStep), y: calcY(currentAngle + angleStep) },
                big: Math.PI <= angleStep ? 1 : 0,
            });
        }
        return gradArray;
    };
    TemperatureDraggerComponent.prototype.invalidateGradientArcs = function () {
        var radius = this.radius;
        function getArc(des) {
            return "M " + radius + "," + radius + "\n         L " + des.start.x + "," + des.start.y + "\n         A " + 2 * radius + "," + 2 * radius + "\n         0 " + des.big + " 1\n         " + des.end.x + "," + des.end.y + "\n         Z";
        }
        var angleStep = (2 * Math.PI - this.bottomAngleRad) / this.colors.length;
        var s = this.calculateGradientConePaths(angleStep);
        this.styles.gradArcs = [];
        for (var i = 0; i < s.length; i++) {
            var si = s[i];
            var arcValue = getArc(si);
            this.styles.gradArcs.push({
                color: this.colors[i],
                d: arcValue,
            });
        }
        this.styles.blurRadius = 2 * radius * Math.sin(angleStep / 6);
    };
    TemperatureDraggerComponent.prototype.invalidateNonSelectedArc = function () {
        var angle = this.bottomAngleRad / 2 + (1 - this.getValuePercentage()) * (2 * Math.PI - this.bottomAngleRad);
        this.styles.nonSelectedArc = {
            color: this.disableArcColor,
            d: "M " + this.radius + "," + this.radius + "\n       L " + this.radius + "," + 3 * this.radius + "\n       A " + 2 * this.radius + "," + 2 * this.radius + "\n       1 " + (angle > Math.PI ? '1' : '0') + " 0\n       " + (this.radius + this.radius * 2 * Math.sin(angle)) + "," + (this.radius + this.radius * 2 * Math.cos(angle)) + "\n       Z",
        };
    };
    TemperatureDraggerComponent.prototype.invalidatePinPosition = function () {
        var radiusOffset = this.thickness / 2;
        var curveRadius = this.radius - radiusOffset;
        var actualAngle = (2 * Math.PI - this.bottomAngleRad) * this.getValuePercentage() + this.bottomAngleRad / 2;
        this.styles.thumbPosition = {
            x: curveRadius * (1 - Math.sin(actualAngle)) + radiusOffset,
            y: curveRadius * (1 + Math.cos(actualAngle)) + radiusOffset,
        };
        this.invalidateNonSelectedArc();
    };
    TemperatureDraggerComponent.prototype.recalculateValue = function (event, allowJumping) {
        if (allowJumping === void 0) { allowJumping = false; }
        if (this.isMouseDown && !this.off) {
            var rect = this.svgRoot.nativeElement.getBoundingClientRect();
            var center = {
                x: rect.left + VIEW_BOX_SIZE * this.scaleFactor / 2,
                y: rect.top + (this.translateYValue + this.radius) * this.scaleFactor,
            };
            var actualAngle = Math.atan2(center.x - event.clientX, event.clientY - center.y);
            if (actualAngle < 0) {
                actualAngle = actualAngle + 2 * Math.PI;
            }
            var previousRelativeValue = this.getValuePercentage();
            var relativeValue = 0;
            if (actualAngle < this.bottomAngleRad / 2) {
                relativeValue = 0;
            }
            else if (actualAngle > 2 * Math.PI - this.bottomAngleRad / 2) {
                relativeValue = 1;
            }
            else {
                relativeValue = (actualAngle - this.bottomAngleRad / 2) / (2 * Math.PI - this.bottomAngleRad);
            }
            var value = this.toValueNumber(relativeValue);
            if (this.value !== value && (allowJumping || Math.abs(relativeValue - previousRelativeValue) < this.maxLeap)) {
                this.value = value;
                this.valueChange.emit(this.value);
                this.invalidatePinPosition();
            }
        }
    };
    TemperatureDraggerComponent.prototype.getValuePercentage = function () {
        return (this.value - this.min) / (this.max - this.min);
    };
    TemperatureDraggerComponent.prototype.toValueNumber = function (factor) {
        return Math.round(factor * (this.max - this.min) / this.step) * this.step + this.min;
    };
    TemperatureDraggerComponent.toRad = function (angle) {
        return Math.PI * angle / 180;
    };
    return TemperatureDraggerComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('svgRoot'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
], TemperatureDraggerComponent.prototype, "svgRoot", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Object)
], TemperatureDraggerComponent.prototype, "fillColors", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", String)
], TemperatureDraggerComponent.prototype, "disableArcColor", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Number)
], TemperatureDraggerComponent.prototype, "bottomAngle", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Number)
], TemperatureDraggerComponent.prototype, "arcThickness", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Number)
], TemperatureDraggerComponent.prototype, "thumbRadius", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Number)
], TemperatureDraggerComponent.prototype, "thumbBorder", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Number)
], TemperatureDraggerComponent.prototype, "maxLeap", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])('valueChange'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Object)
], TemperatureDraggerComponent.prototype, "valueChange", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])('value'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Object),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [Object])
], TemperatureDraggerComponent.prototype, "setValue", null);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Number)
], TemperatureDraggerComponent.prototype, "min", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Number)
], TemperatureDraggerComponent.prototype, "max", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Object)
], TemperatureDraggerComponent.prototype, "step", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Object)
], TemperatureDraggerComponent.prototype, "power", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["HostListener"])('window:mouseup', ['$event']),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Function),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [Object]),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:returntype", void 0)
], TemperatureDraggerComponent.prototype, "onMouseUp", null);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["HostListener"])('window:mousemove', ['$event']),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Function),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [MouseEvent]),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:returntype", void 0)
], TemperatureDraggerComponent.prototype, "onMouseMove", null);
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["HostListener"])('window:resize', ['$event']),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:type", Function),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [Object]),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:returntype", void 0)
], TemperatureDraggerComponent.prototype, "onResize", null);
TemperatureDraggerComponent = TemperatureDraggerComponent_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-temperature-dragger',
        template: __webpack_require__(2407),
        styles: [__webpack_require__(2686)],
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [])
], TemperatureDraggerComponent);

var TemperatureDraggerComponent_1;


/***/ }),

/***/ 1909:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemperatureComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nebular_theme__ = __webpack_require__(1340);



var TemperatureComponent = (function () {
    function TemperatureComponent(theme) {
        var _this = this;
        this.theme = theme;
        this.temperature = 24;
        this.temperatureOff = false;
        this.temperatureMode = 'cool';
        this.humidity = 87;
        this.humidityOff = false;
        this.humidityMode = 'heat';
        this.themeSubscription = this.theme.getJsTheme().subscribe(function (config) {
            _this.colors = config.variables;
        });
    }
    TemperatureComponent.prototype.ngOnDestroy = function () {
        this.themeSubscription.unsubscribe();
    };
    return TemperatureComponent;
}());
TemperatureComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-temperature',
        styles: [__webpack_require__(2687)],
        template: __webpack_require__(2408),
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__nebular_theme__["m" /* NbThemeService */]])
], TemperatureComponent);



/***/ }),

/***/ 1910:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(echarts) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrafficChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nebular_theme__ = __webpack_require__(1340);



var points = [300, 520, 435, 530, 730, 620, 660, 860];
var TrafficChartComponent = (function () {
    function TrafficChartComponent(theme) {
        this.theme = theme;
        this.type = 'month';
        this.types = ['week', 'month', 'year'];
        this.option = {};
    }
    TrafficChartComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.themeSubscription = this.theme.getJsTheme().delay(1).subscribe(function (config) {
            var trafficTheme = config.variables.traffic;
            _this.option = Object.assign({}, {
                grid: {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: points,
                },
                yAxis: {
                    boundaryGap: [0, '5%'],
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: trafficTheme.colorBlack,
                            opacity: 0.06,
                            width: '1',
                        },
                    },
                },
                tooltip: {
                    axisPointer: {
                        type: 'shadow',
                    },
                    textStyle: {
                        color: trafficTheme.tooltipTextColor,
                        fontWeight: trafficTheme.tooltipFontWeight,
                        fontSize: 16,
                    },
                    position: 'top',
                    backgroundColor: trafficTheme.tooltipBg,
                    borderColor: trafficTheme.tooltipBorderColor,
                    borderWidth: 3,
                    formatter: '{c0} MB',
                    extraCssText: trafficTheme.tooltipExtraCss,
                },
                series: [
                    {
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 8,
                        sampling: 'average',
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: trafficTheme.shadowLineDarkBg,
                            },
                            emphasis: {
                                color: 'rgba(0,0,0,0)',
                                borderColor: 'rgba(0,0,0,0)',
                                borderWidth: 0,
                            },
                        },
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: trafficTheme.shadowLineDarkBg,
                            },
                        },
                        data: points.map(function (p) { return p - 15; }),
                    },
                    {
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 6,
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: trafficTheme.itemColor,
                                borderColor: trafficTheme.itemBorderColor,
                                borderWidth: 2,
                            },
                            emphasis: {
                                color: 'white',
                                borderColor: trafficTheme.itemEmphasisBorderColor,
                                borderWidth: 2,
                            },
                        },
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: trafficTheme.lineBg,
                                shadowColor: trafficTheme.lineBg,
                                shadowBlur: trafficTheme.lineShadowBlur,
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: trafficTheme.gradFrom,
                                    }, {
                                        offset: 1,
                                        color: trafficTheme.gradTo,
                                    }]),
                                opacity: 1,
                            },
                        },
                        data: points,
                    },
                ],
            });
        });
    };
    TrafficChartComponent.prototype.ngOnDestroy = function () {
        this.themeSubscription.unsubscribe();
    };
    return TrafficChartComponent;
}());
TrafficChartComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-traffic-chart',
        styles: [__webpack_require__(1833)],
        template: "\n    <div echarts [options]=\"option\" class=\"echart\"></div>\n  ",
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__nebular_theme__["m" /* NbThemeService */]])
], TrafficChartComponent);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(589)))

/***/ }),

/***/ 1911:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrafficComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nebular_theme__ = __webpack_require__(1340);



var TrafficComponent = (function () {
    function TrafficComponent(themeService) {
        var _this = this;
        this.themeService = themeService;
        this.type = 'month';
        this.types = ['week', 'month', 'year'];
        this.themeSubscription = this.themeService.getJsTheme().subscribe(function (theme) {
            _this.currentTheme = theme.name;
        });
    }
    TrafficComponent.prototype.ngOnDestroy = function () {
        this.themeSubscription.unsubscribe();
    };
    return TrafficComponent;
}());
TrafficComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-traffic',
        styles: [__webpack_require__(1833)],
        template: "\n    <nb-card size=\"xsmall\">\n      <nb-card-header>\n        <span>Traffic Consumption</span>\n        <div class=\"ghost-dropdown\" ngbDropdown>\n          <button type=\"button\" class=\"btn btn-sm\" ngbDropdownToggle\n                  [ngClass]=\"{ 'btn-success': currentTheme == 'default', 'btn-primary': currentTheme != 'default'}\">\n            {{ type }}\n          </button>\n          <ul class=\"dropdown-menu\">\n            <li class=\"dropdown-item\" *ngFor=\"let t of types\" (click)=\"type = t\">{{ t }}</li>\n          </ul>\n        </div>\n      </nb-card-header>\n      <nb-card-body class=\"p-0\">\n        <ngx-traffic-chart></ngx-traffic-chart>\n      </nb-card-body>\n    </nb-card>\n  ",
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__nebular_theme__["m" /* NbThemeService */]])
], TrafficComponent);



/***/ }),

/***/ 1912:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeatherComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);


var WeatherComponent = (function () {
    function WeatherComponent() {
    }
    return WeatherComponent;
}());
WeatherComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'ngx-weather',
        styles: [__webpack_require__(2688)],
        template: __webpack_require__(2409),
    })
], WeatherComponent);



/***/ }),

/***/ 1924:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_module__ = __webpack_require__(1933);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PagesModule", function() { return __WEBPACK_IMPORTED_MODULE_0__pages_module__["a"]; });



/***/ }),

/***/ 1931:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MENU_ITEMS; });
var MENU_ITEMS = [
    {
        title: 'Dashboard',
        icon: 'nb-home',
        link: '/app/pages/dashboard',
        home: true,
    },
    {
        title: 'BÁN HÀNG',
        link: '/app/pages/banhang',
        home: true,
    },
    {
        title: 'NHẬP HÀNG',
        link: '/app/pages/nhaphang',
        home: true,
    },
    {
        title: 'CẬP NHẬT GIÁ BÁN',
        link: '/app/pages/capnhatgia',
        home: true,
    },
    {
        title: 'QUẢN LÝ DANH MỤC',
        icon: 'nb-tables',
        children: [
            {
                title: 'QUẢN LÝ BÀN',
                link: '/app/pages/tables/bans',
            },
            {
                title: 'QUẢN LÝ KHÁCH',
                link: '/app/pages/tables/khachhangs',
            },
            {
                title: 'QUẢN LÝ HÀNG',
                link: '/app/pages/tables/hangs',
            },
            {
                title: 'QUẢN LÝ PHIẾU NHẬP',
                link: '/app/pages/tables/smart-table',
            },
            {
                title: 'QUẢN LÝ HÀNG BÁN',
                link: '/app/pages/tables/smart-table',
            },
            {
                title: 'QUẢN LÝ NHÂN VIÊN',
                link: '/app/pages/tables/nhanviens',
            },
        ],
    },
    {
        title: 'THỐNG KÊ',
        icon: 'nb-tables',
        children: [
            {
                title: 'THỐNG KÊ BÁN HÀNG',
                link: '/app/pages/charts/thongkebanhang',
            },
            {
                title: 'THỐNG KÊ HÀNG TRONG KHO',
                link: '/app/pages/charts/thongkehangtrongkho',
            },
        ],
    },
    {
        title: 'HỆ THỐNG',
        icon: 'nb-tables',
        children: [
            {
                title: 'QUẢN LÝ TÀI KHOẢN',
                link: '/app/pages/tables/smart-table',
            },
            {
                title: 'THIẾT LẬP',
                link: '/app/pages/tables/smart-table',
            },
            {
                title: 'HƯỚNG DẪN',
                link: '/app/pages/tables/smart-table',
            },
        ],
    },
    {
        title: 'UI Features',
        icon: 'nb-keypad',
        link: '/app/pages/ui-features',
        children: [
            {
                title: 'Buttons',
                link: '/app/pages/ui-features/buttons',
            },
            {
                title: 'Grid',
                link: '/app/pages/ui-features/grid',
            },
            {
                title: 'Icons',
                link: '/app/pages/ui-features/icons',
            },
            {
                title: 'Modals',
                link: '/app/pages/ui-features/modals',
            },
            {
                title: 'Typography',
                link: '/app/pages/ui-features/typography',
            },
            {
                title: 'Animated Searches',
                link: '/app/pages/ui-features/search-fields',
            },
            {
                title: 'Tabs',
                link: '/app/pages/ui-features/tabs',
            },
        ],
    },
    {
        title: 'Forms',
        icon: 'nb-compose',
        children: [
            {
                title: 'Form Inputs',
                link: '/app/pages/forms/inputs',
            },
            {
                title: 'Form Layouts',
                link: '/app/pages/forms/layouts',
            },
        ],
    },
    {
        title: 'Components',
        icon: 'nb-gear',
        children: [
            {
                title: 'Tree',
                link: '/app/pages/components/tree',
            }, {
                title: 'Notifications',
                link: '/app/pages/components/notifications',
            },
        ],
    },
    {
        title: 'Maps',
        icon: 'nb-location',
        children: [
            {
                title: 'Google Maps',
                link: '/app/pages/maps/gmaps',
            },
            {
                title: 'Leaflet Maps',
                link: '/app/pages/maps/leaflet',
            },
            {
                title: 'Bubble Maps',
                link: '/app/pages/maps/bubble',
            },
        ],
    },
    {
        title: 'Charts',
        icon: 'nb-bar-chart',
        children: [
            {
                title: 'Echarts',
                link: '/app/pages/charts/echarts',
            },
            {
                title: 'Charts.js',
                link: '/app/pages/charts/chartjs',
            },
            {
                title: 'D3',
                link: '/app/pages/charts/d3',
            },
        ],
    },
    {
        title: 'Editors',
        icon: 'nb-title',
        children: [
            {
                title: 'TinyMCE',
                link: '/app/pages/editors/tinymce',
            },
            {
                title: 'CKEditor',
                link: '/app/pages/editors/ckeditor',
            },
        ],
    },
    {
        title: 'Tables',
        icon: 'nb-tables',
        children: [
            {
                title: 'Smart Table',
                link: '/app/pages/tables/smart-table',
            },
        ],
    },
    {
        title: 'Auth',
        icon: 'nb-locked',
        children: [
            {
                title: 'Login',
                link: '/app/auth/login',
            },
            {
                title: 'Register',
                link: '/app/auth/register',
            },
            {
                title: 'Request Password',
                link: '/app/auth/request-password',
            },
            {
                title: 'Reset Password',
                link: '/app/auth/reset-password',
            },
        ],
    },
];


/***/ }),

/***/ 1932:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagesRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_component__ = __webpack_require__(1546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard_component__ = __webpack_require__(1544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__banhang_banhang_component__ = __webpack_require__(1539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__banhang_hoadon_hoadon_component__ = __webpack_require__(1540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nhaphang_nhaphang_component__ = __webpack_require__(1545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__capnhatgia_capnhatgia_component__ = __webpack_require__(1541);









var routes = [{
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_3__pages_component__["a" /* PagesComponent */],
        children: [{
                path: 'dashboard',
                component: __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard_component__["a" /* DashboardComponent */],
            }, {
                path: 'banhang',
                component: __WEBPACK_IMPORTED_MODULE_5__banhang_banhang_component__["a" /* BanHangComponent */],
            }, {
                path: 'hoadon',
                component: __WEBPACK_IMPORTED_MODULE_6__banhang_hoadon_hoadon_component__["a" /* HoaDonComponent */],
            }, {
                path: 'nhaphang',
                component: __WEBPACK_IMPORTED_MODULE_7__nhaphang_nhaphang_component__["a" /* NhapHangComponent */],
            }, {
                path: 'capnhatgia',
                component: __WEBPACK_IMPORTED_MODULE_8__capnhatgia_capnhatgia_component__["a" /* CapNhatGiaComponent */],
            }, {
                path: 'ui-features',
                loadChildren: function() { return __webpack_require__.e/* import() */(6).then(__webpack_require__.bind(null, 1954))  .then( function(module) { return module['UiFeaturesModule']; } ); },
            }, {
                path: 'components',
                loadChildren: function() { return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 1893))  .then( function(module) { return module['ComponentsModule']; } ); },
            }, {
                path: 'maps',
                loadChildren: function() { return __webpack_require__.e/* import() */(7).then(__webpack_require__.bind(null, 1930))  .then( function(module) { return module['MapsModule']; } ); },
            }, {
                path: 'charts',
                loadChildren: function() { return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 1875))  .then( function(module) { return module['ChartsModule']; } ); },
            }, {
                path: 'editors',
                loadChildren: function() { return __webpack_require__.e/* import() */(8).then(__webpack_require__.bind(null, 1917))  .then( function(module) { return module['EditorsModule']; } ); },
            }, {
                path: 'forms',
                loadChildren: function() { return __webpack_require__.e/* import() */(9).then(__webpack_require__.bind(null, 1923))  .then( function(module) { return module['FormsModule']; } ); },
            }, {
                path: 'tables',
                loadChildren: function() { return __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, 1941))  .then( function(module) { return module['TablesModule']; } ); },
            }, {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            }],
    }];
var PagesRoutingModule = (function () {
    function PagesRoutingModule() {
    }
    return PagesRoutingModule;
}());
PagesRoutingModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]],
    })
], PagesRoutingModule);



/***/ }),

/***/ 1933:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_component__ = __webpack_require__(1546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard_module__ = __webpack_require__(1897);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_routing_module__ = __webpack_require__(1932);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__theme_theme_module__ = __webpack_require__(1346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap__ = __webpack_require__(1367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__banhang_banhang_component__ = __webpack_require__(1539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__banhang_hoadon_hoadon_component__ = __webpack_require__(1540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nhaphang_nhaphang_component__ = __webpack_require__(1545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__capnhatgia_capnhatgia_component__ = __webpack_require__(1541);











var PAGES_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_2__pages_component__["a" /* PagesComponent */],
    __WEBPACK_IMPORTED_MODULE_7__banhang_banhang_component__["a" /* BanHangComponent */],
    __WEBPACK_IMPORTED_MODULE_8__banhang_hoadon_hoadon_component__["a" /* HoaDonComponent */],
    __WEBPACK_IMPORTED_MODULE_9__nhaphang_nhaphang_component__["a" /* NhapHangComponent */],
    __WEBPACK_IMPORTED_MODULE_10__capnhatgia_capnhatgia_component__["a" /* CapNhatGiaComponent */],
];
var PagesModule = (function () {
    function PagesModule() {
    }
    return PagesModule;
}());
PagesModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__pages_routing_module__["a" /* PagesRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_5__theme_theme_module__["a" /* ThemeModule */],
            __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard_module__["a" /* DashboardModule */],
            __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */],
        ],
        declarations: PAGES_COMPONENTS.slice(),
    })
], PagesModule);



/***/ }),

/***/ 2061:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, ".full-width {\n  flex: 1;\n  min-width: 220px; }\n\nnb-checkbox {\n  margin-bottom: 1rem; }\n\n.form-inline > * {\n  margin: 0 1.5rem 1.5rem 0; }\n\nnb-card.inline-form-card nb-card-body {\n  padding-bottom: 0; }\n", ""]);

// exports


/***/ }),

/***/ 2062:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, ".full-width {\n  flex: 1;\n  min-width: 220px; }\n\nnb-checkbox {\n  margin-bottom: 1rem; }\n\n.form-inline > * {\n  margin: 0 1.5rem 1.5rem 0; }\n\nnb-card.inline-form-card nb-card-body {\n  padding-bottom: 0; }\n", ""]);

// exports


/***/ }),

/***/ 2063:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, ".full-width {\n  flex: 1;\n  min-width: 220px; }\n\nnb-checkbox {\n  margin-bottom: 1rem; }\n\n.form-inline > * {\n  margin: 0 1.5rem 1.5rem 0; }\n\nnb-card.inline-form-card nb-card-body {\n  padding-bottom: 0; }\n", ""]);

// exports


/***/ }),

/***/ 2070:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nb-theme-default) nb-tabset {\n  height: 100%;\n  display: flex;\n  flex-direction: column; }\n\n:host-context(.nb-theme-default) nb-tab {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0; }\n\n:host-context(.nb-theme-default) .contact {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: #a4abb3;\n  padding: 1rem; }\n  :host-context(.nb-theme-default) .contact:not(:last-child) {\n    border-bottom: 1px solid #ebeef2; }\n\n:host-context(.nb-theme-default) .i-contact {\n  font-size: 2rem;\n  cursor: pointer; }\n\n:host-context(.nb-theme-default) .time {\n  font-size: 0.875rem;\n  font-weight: 300;\n  text-transform: uppercase; }\n\n:host-context(.nb-theme-default) nb-user /deep/ .info-container {\n  margin-left: 0.875rem; }\n\n:host-context(.nb-theme-default) nb-user /deep/ .user-name {\n  font-damily: Exo;\n  font-weight: 600;\n  color: #2a2a2a;\n  font-size: 1.25rem; }\n\n:host-context(.nb-theme-default) nb-user /deep/ .user-title {\n  font-size: 0.875rem;\n  font-weight: 300;\n  text-transform: uppercase; }\n\n:host-context(.nb-theme-cosmic) nb-tabset {\n  height: 100%;\n  display: flex;\n  flex-direction: column; }\n\n:host-context(.nb-theme-cosmic) nb-tab {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0; }\n\n:host-context(.nb-theme-cosmic) .contact {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: #a1a1e5;\n  padding: 1rem; }\n  :host-context(.nb-theme-cosmic) .contact:not(:last-child) {\n    border-bottom: 1px solid #342e73; }\n\n:host-context(.nb-theme-cosmic) .i-contact {\n  font-size: 2rem;\n  cursor: pointer; }\n\n:host-context(.nb-theme-cosmic) .time {\n  font-size: 0.875rem;\n  font-weight: 300;\n  text-transform: uppercase; }\n\n:host-context(.nb-theme-cosmic) nb-user /deep/ .info-container {\n  margin-left: 0.875rem; }\n\n:host-context(.nb-theme-cosmic) nb-user /deep/ .user-name {\n  font-damily: Exo;\n  font-weight: 600;\n  color: #ffffff;\n  font-size: 1.25rem;\n  font-weight: 500; }\n\n:host-context(.nb-theme-cosmic) nb-user /deep/ .user-title {\n  font-size: 0.875rem;\n  font-weight: 300;\n  text-transform: uppercase; }\n", ""]);

// exports


/***/ }),

/***/ 2071:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nb-theme-default) .solar-card nb-card-header {\n  border: none;\n  padding-bottom: 0; }\n\n@media (max-width: 767px) {\n  :host-context(.nb-theme-default) ngx-traffic {\n    display: none; } }\n\n@media (max-width: 575px) {\n  :host-context(.nb-theme-default) /deep/ nb-card.large-card {\n    height: 456px; } }\n\n:host-context(.nb-theme-cosmic) .solar-card nb-card-header {\n  border: none;\n  padding-bottom: 0; }\n\n@media (max-width: 767px) {\n  :host-context(.nb-theme-cosmic) ngx-traffic {\n    display: none; } }\n\n@media (max-width: 575px) {\n  :host-context(.nb-theme-cosmic) /deep/ nb-card.large-card {\n    height: 456px; } }\n", ""]);

// exports


/***/ }),

/***/ 2072:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n:host-context(.nb-theme-default) {\n  display: block;\n  flex: 1;\n  position: relative; }\n  :host-context(.nb-theme-default) .echart {\n    position: absolute;\n    width: 100%;\n    height: 100%; }\n\n:host-context(.nb-theme-cosmic) {\n  display: block;\n  flex: 1;\n  position: relative; }\n  :host-context(.nb-theme-cosmic) .echart {\n    position: absolute;\n    width: 100%;\n    height: 100%; }\n", ""]);

// exports


/***/ }),

/***/ 2073:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nb-theme-default) nb-card {\n  display: flex;\n  flex-direction: row; }\n\n:host-context(.nb-theme-default) nb-card-body {\n  overflow: hidden; }\n\n:host-context(.nb-theme-default) .consumption-table {\n  display: flex;\n  flex-direction: column;\n  width: 20rem;\n  height: 100%;\n  z-index: 2;\n  box-shadow: 0 2px 12px 0 #dfe3eb; }\n\n:host-context(.nb-theme-default) .table-header {\n  padding: 1.25rem;\n  border-bottom: 1px solid #ebeef2;\n  border-top-left-radius: 0.375rem;\n  border-top-right-radius: 0.375rem;\n  color: #2a2a2a;\n  font-family: Exo;\n  font-size: 1.125rem;\n  font-weight: 600;\n  font-size: 1.25rem; }\n  :host-context(.nb-theme-default) .table-header h1 {\n    margin: 0; }\n  :host-context(.nb-theme-default) .table-header h2 {\n    margin: 0; }\n  :host-context(.nb-theme-default) .table-header h3 {\n    margin: 0; }\n  :host-context(.nb-theme-default) .table-header h4 {\n    margin: 0; }\n  :host-context(.nb-theme-default) .table-header h5 {\n    margin: 0; }\n  :host-context(.nb-theme-default) .table-header h6 {\n    margin: 0; }\n  :host-context(.nb-theme-default) .table-header .subtitle {\n    color: #a4abb3;\n    font-family: Roboto;\n    font-size: 1rem;\n    font-weight: 300; }\n\n:host-context(.nb-theme-default) nb-tabset /deep/ {\n  flex: 1;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column; }\n  :host-context(.nb-theme-default) nb-tabset /deep/ ul {\n    align-items: center;\n    padding: 1rem; }\n  :host-context(.nb-theme-default) nb-tabset /deep/ ul li a {\n    font-weight: 500;\n    padding: 0.75rem 1rem; }\n  :host-context(.nb-theme-default) nb-tabset /deep/ ul li.active {\n    position: relative;\n    background-color: #ebeff5;\n    border-radius: 0.375rem 0.375rem 0 0; }\n    :host-context(.nb-theme-default) nb-tabset /deep/ ul li.active::before {\n      position: absolute;\n      content: '';\n      width: 100%;\n      height: 5px;\n      border-radius: 2.5px;\n      bottom: 0;\n      left: 0;\n      background: #40dc7e; }\n    :host-context(.nb-theme-default) nb-tabset /deep/ ul li.active a {\n      font-size: 1.5rem; }\n    :host-context(.nb-theme-default) nb-tabset /deep/ ul li.active a::before {\n      display: none; }\n  :host-context(.nb-theme-default) nb-tabset /deep/ nb-tab {\n    flex: 1;\n    overflow-y: auto; }\n\n:host-context(.nb-theme-default) .stats-month {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.25rem;\n  color: #a4abb3; }\n  :host-context(.nb-theme-default) .stats-month:not(:first-child) {\n    border-top: 1px solid #ebeef2; }\n  :host-context(.nb-theme-default) .stats-month .month {\n    display: inline-block;\n    width: 2.75rem;\n    font-family: Exo;\n    font-size: 1.25rem;\n    font-weight: 500;\n    color: #2a2a2a; }\n  :host-context(.nb-theme-default) .stats-month .delta {\n    position: relative;\n    display: inline-block;\n    padding-left: 1rem;\n    font-size: 0.75rem;\n    color: #ff6780; }\n    :host-context(.nb-theme-default) .stats-month .delta::before {\n      position: absolute;\n      content: '';\n      bottom: 3px;\n      left: 2px;\n      border-left: 5px solid transparent;\n      border-right: 5px solid transparent;\n      border-bottom: 8px solid #ff6780; }\n    :host-context(.nb-theme-default) .stats-month .delta.down {\n      color: #5de191; }\n      :host-context(.nb-theme-default) .stats-month .delta.down::before {\n        top: 3px;\n        border-top: 8px solid #5de191;\n        border-bottom: none; }\n  :host-context(.nb-theme-default) .stats-month .results {\n    font-size: 0.875rem;\n    font-weight: 300; }\n    :host-context(.nb-theme-default) .stats-month .results b {\n      font-family: Exo;\n      font-size: 1rem;\n      font-weight: 500;\n      color: #2a2a2a; }\n\n:host-context(.nb-theme-default) .chart-container {\n  flex: 1;\n  height: 100%;\n  background-image: none;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden; }\n\n:host-context(.nb-theme-default) .chart-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.75rem 1rem 1rem; }\n\n:host-context(.nb-theme-default) .header-stats {\n  display: flex;\n  align-items: center; }\n\n:host-context(.nb-theme-default) .stats-block {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: #a4abb3;\n  padding: 0 1.5rem;\n  border-right: 1px solid #ebeef2; }\n  :host-context(.nb-theme-default) .stats-block .subtitle {\n    font-size: 1rem;\n    font-weight: 300; }\n  :host-context(.nb-theme-default) .stats-block .value {\n    font-family: Exo;\n    font-size: 1.5rem;\n    font-weight: 600;\n    color: #2a2a2a; }\n  :host-context(.nb-theme-default) .stats-block .unit {\n    font-family: Exo;\n    font-size: 1.25rem;\n    font-weight: 300; }\n\n:host-context(.nb-theme-default) .dropdown {\n  min-width: 130px; }\n\n@media (max-width: 1599px) {\n  :host-context(.nb-theme-default) .stats-block {\n    border: none;\n    padding: 0 1rem; } }\n\n@media (min-width: 768px) and (max-width: 1399px) {\n  :host-context(.nb-theme-default) .consumption-table {\n    display: none; } }\n\n@media (max-width: 991px) {\n  :host-context(.nb-theme-default) .chart-header {\n    padding: 1rem; }\n  :host-context(.nb-theme-default) .dropdown {\n    min-width: 100px; }\n    :host-context(.nb-theme-default) .dropdown button {\n      padding-left: 0.75rem;\n      padding-right: 0.75rem; } }\n\n@media (max-width: 767px) {\n  :host-context(.nb-theme-default) .consumption-table {\n    display: none; } }\n\n@media (max-width: 399px) {\n  :host-context(.nb-theme-default) .stats-block {\n    padding: 0; }\n    :host-context(.nb-theme-default) .stats-block:first-child {\n      padding: 0 0.5rem; }\n    :host-context(.nb-theme-default) .stats-block .subtitle {\n      font-size: 1rem; }\n    :host-context(.nb-theme-default) .stats-block .value {\n      font-size: 1.5rem; }\n    :host-context(.nb-theme-default) .stats-block .unit {\n      display: none; } }\n\n:host-context(.nb-theme-cosmic) nb-card {\n  display: flex;\n  flex-direction: row; }\n\n:host-context(.nb-theme-cosmic) nb-card-body {\n  overflow: hidden; }\n\n:host-context(.nb-theme-cosmic) .consumption-table {\n  display: flex;\n  flex-direction: column;\n  width: 20rem;\n  height: 100%;\n  z-index: 2;\n  box-shadow: 0 8px 20px 0 rgba(40, 37, 89, 0.6); }\n\n:host-context(.nb-theme-cosmic) .table-header {\n  padding: 1.25rem;\n  border-bottom: 1px solid #342e73;\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n  color: #ffffff;\n  font-family: Exo;\n  font-size: 1.125rem;\n  font-weight: 500;\n  font-size: 1.25rem; }\n  :host-context(.nb-theme-cosmic) .table-header h1 {\n    margin: 0; }\n  :host-context(.nb-theme-cosmic) .table-header h2 {\n    margin: 0; }\n  :host-context(.nb-theme-cosmic) .table-header h3 {\n    margin: 0; }\n  :host-context(.nb-theme-cosmic) .table-header h4 {\n    margin: 0; }\n  :host-context(.nb-theme-cosmic) .table-header h5 {\n    margin: 0; }\n  :host-context(.nb-theme-cosmic) .table-header h6 {\n    margin: 0; }\n  :host-context(.nb-theme-cosmic) .table-header .subtitle {\n    color: #a1a1e5;\n    font-family: Roboto;\n    font-size: 1rem;\n    font-weight: 300; }\n\n:host-context(.nb-theme-cosmic) nb-tabset /deep/ {\n  flex: 1;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column; }\n  :host-context(.nb-theme-cosmic) nb-tabset /deep/ ul {\n    align-items: center;\n    padding: 1rem; }\n  :host-context(.nb-theme-cosmic) nb-tabset /deep/ ul li a {\n    font-weight: 500;\n    padding: 0.75rem 1rem; }\n  :host-context(.nb-theme-cosmic) nb-tabset /deep/ ul li.active {\n    position: relative;\n    background-color: #2f296b;\n    border-radius: 0.5rem 0.5rem 0 0; }\n    :host-context(.nb-theme-cosmic) nb-tabset /deep/ ul li.active::before {\n      position: absolute;\n      content: '';\n      width: 100%;\n      height: 5px;\n      border-radius: 2.5px;\n      bottom: 0;\n      left: 0;\n      background: #00d977; }\n    :host-context(.nb-theme-cosmic) nb-tabset /deep/ ul li.active a {\n      font-size: 1.5rem; }\n    :host-context(.nb-theme-cosmic) nb-tabset /deep/ ul li.active a::before {\n      display: none; }\n  :host-context(.nb-theme-cosmic) nb-tabset /deep/ nb-tab {\n    flex: 1;\n    overflow-y: auto; }\n\n:host-context(.nb-theme-cosmic) .stats-month {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.25rem;\n  color: #a1a1e5; }\n  :host-context(.nb-theme-cosmic) .stats-month:not(:first-child) {\n    border-top: 1px solid #342e73; }\n  :host-context(.nb-theme-cosmic) .stats-month .month {\n    display: inline-block;\n    width: 2.75rem;\n    font-family: Exo;\n    font-size: 1.25rem;\n    font-weight: 500;\n    color: #ffffff; }\n  :host-context(.nb-theme-cosmic) .stats-month .delta {\n    position: relative;\n    display: inline-block;\n    padding-left: 1rem;\n    font-size: 0.75rem;\n    color: #ff5680; }\n    :host-context(.nb-theme-cosmic) .stats-month .delta::before {\n      position: absolute;\n      content: '';\n      bottom: 3px;\n      left: 2px;\n      border-left: 5px solid transparent;\n      border-right: 5px solid transparent;\n      border-bottom: 8px solid #ff5680; }\n    :host-context(.nb-theme-cosmic) .stats-month .delta.down {\n      color: #26df8b; }\n      :host-context(.nb-theme-cosmic) .stats-month .delta.down::before {\n        top: 3px;\n        border-top: 8px solid #26df8b;\n        border-bottom: none; }\n  :host-context(.nb-theme-cosmic) .stats-month .results {\n    font-size: 0.875rem;\n    font-weight: 300; }\n    :host-context(.nb-theme-cosmic) .stats-month .results b {\n      font-family: Exo;\n      font-size: 1rem;\n      font-weight: 500;\n      color: #ffffff; }\n\n:host-context(.nb-theme-cosmic) .chart-container {\n  flex: 1;\n  height: 100%;\n  background-image: radial-gradient(circle at 50% 50%, #423f8c, #302c6e);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden; }\n\n:host-context(.nb-theme-cosmic) .chart-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.75rem 1rem 1rem; }\n\n:host-context(.nb-theme-cosmic) .header-stats {\n  display: flex;\n  align-items: center; }\n\n:host-context(.nb-theme-cosmic) .stats-block {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: #a1a1e5;\n  padding: 0 1.5rem;\n  border-right: 1px solid #342e73; }\n  :host-context(.nb-theme-cosmic) .stats-block .subtitle {\n    font-size: 1rem;\n    font-weight: 300; }\n  :host-context(.nb-theme-cosmic) .stats-block .value {\n    font-family: Exo;\n    font-size: 1.5rem;\n    font-weight: 600;\n    color: #ffffff; }\n  :host-context(.nb-theme-cosmic) .stats-block .unit {\n    font-family: Exo;\n    font-size: 1.25rem;\n    font-weight: 300; }\n\n:host-context(.nb-theme-cosmic) .dropdown {\n  min-width: 130px; }\n\n:host-context(.nb-theme-cosmic) nb-tabset /deep/ ul li.active {\n  background-color: #7659ff;\n  border-radius: 0.5rem; }\n  :host-context(.nb-theme-cosmic) nb-tabset /deep/ ul li.active::before {\n    display: none; }\n\n:host-context(.nb-theme-cosmic) .stats-block .value {\n  font-weight: 500; }\n\n@media (max-width: 1599px) {\n  :host-context(.nb-theme-cosmic) .stats-block {\n    border: none;\n    padding: 0 1rem; } }\n\n@media (min-width: 768px) and (max-width: 1399px) {\n  :host-context(.nb-theme-cosmic) .consumption-table {\n    display: none; } }\n\n@media (max-width: 991px) {\n  :host-context(.nb-theme-cosmic) .chart-header {\n    padding: 1rem; }\n  :host-context(.nb-theme-cosmic) .dropdown {\n    min-width: 100px; }\n    :host-context(.nb-theme-cosmic) .dropdown button {\n      padding-left: 0.75rem;\n      padding-right: 0.75rem; } }\n\n@media (max-width: 767px) {\n  :host-context(.nb-theme-cosmic) .consumption-table {\n    display: none; } }\n\n@media (max-width: 399px) {\n  :host-context(.nb-theme-cosmic) .stats-block {\n    padding: 0; }\n    :host-context(.nb-theme-cosmic) .stats-block:first-child {\n      padding: 0 0.5rem; }\n    :host-context(.nb-theme-cosmic) .stats-block .subtitle {\n      font-size: 1rem; }\n    :host-context(.nb-theme-cosmic) .stats-block .value {\n      font-size: 1.5rem; }\n    :host-context(.nb-theme-cosmic) .stats-block .unit {\n      display: none; } }\n", ""]);

// exports


/***/ }),

/***/ 2074:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n:host-context(.nb-theme-default) nb-card-body {\n  display: flex;\n  flex-direction: column;\n  padding: 0; }\n\n:host-context(.nb-theme-default) .picture {\n  background-position: center;\n  background-size: cover;\n  position: relative;\n  border-top-left-radius: 0.375rem;\n  border-top-right-radius: 0.375rem;\n  flex: 1; }\n\n:host-context(.nb-theme-default) .details {\n  padding: 1.25rem 1.25rem 0; }\n  :host-context(.nb-theme-default) .details .title {\n    font-family: Exo;\n    font-weight: 600;\n    color: #2a2a2a;\n    font-size: 1.5rem;\n    margin-bottom: 1rem; }\n  :host-context(.nb-theme-default) .details .description {\n    text-align: justify;\n    color: #4b4b4b;\n    font-weight: 300;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    max-height: calc(1rem * 8 * 1.25); }\n\n:host-context(.nb-theme-default) nb-card-footer {\n  display: flex;\n  justify-content: space-around;\n  padding: 0.75rem 0;\n  border: none; }\n  :host-context(.nb-theme-default) nb-card-footer a {\n    text-decoration: none;\n    color: #a4abb3; }\n    :host-context(.nb-theme-default) nb-card-footer a:hover {\n      color: #2a2a2a; }\n    :host-context(.nb-theme-default) nb-card-footer a i {\n      font-size: 1.75rem; }\n\n:host-context(.nb-theme-cosmic) nb-card-body {\n  display: flex;\n  flex-direction: column;\n  padding: 0; }\n\n:host-context(.nb-theme-cosmic) .picture {\n  background-position: center;\n  background-size: cover;\n  position: relative;\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n  flex: 1; }\n\n:host-context(.nb-theme-cosmic) .details {\n  padding: 1.25rem 1.25rem 0; }\n  :host-context(.nb-theme-cosmic) .details .title {\n    font-family: Exo;\n    font-weight: 600;\n    color: #ffffff;\n    font-size: 1.5rem;\n    margin-bottom: 1rem;\n    font-weight: 500; }\n  :host-context(.nb-theme-cosmic) .details .description {\n    text-align: justify;\n    color: #d1d1ff;\n    font-weight: 300;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    max-height: calc(1rem * 8 * 1.25); }\n\n:host-context(.nb-theme-cosmic) nb-card-footer {\n  display: flex;\n  justify-content: space-around;\n  padding: 0.75rem 0;\n  border: none; }\n  :host-context(.nb-theme-cosmic) nb-card-footer a {\n    text-decoration: none;\n    color: #a1a1e5; }\n    :host-context(.nb-theme-cosmic) nb-card-footer a:hover {\n      color: #ffffff; }\n    :host-context(.nb-theme-cosmic) nb-card-footer a i {\n      font-size: 1.75rem; }\n", ""]);

// exports


/***/ }),

/***/ 2075:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n:host-context(.nb-theme-default) {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%; }\n  :host-context(.nb-theme-default) .header {\n    padding: 1.25rem;\n    border-bottom: 1px solid #ebeef2;\n    border-top-left-radius: 0.375rem;\n    border-top-right-radius: 0.375rem;\n    color: #2a2a2a;\n    font-family: Exo;\n    font-size: 1.125rem;\n    font-weight: 600; }\n    :host-context(.nb-theme-default) .header h1 {\n      margin: 0; }\n    :host-context(.nb-theme-default) .header h2 {\n      margin: 0; }\n    :host-context(.nb-theme-default) .header h3 {\n      margin: 0; }\n    :host-context(.nb-theme-default) .header h4 {\n      margin: 0; }\n    :host-context(.nb-theme-default) .header h5 {\n      margin: 0; }\n    :host-context(.nb-theme-default) .header h6 {\n      margin: 0; }\n  :host-context(.nb-theme-default) .body {\n    display: flex;\n    flex-direction: column;\n    flex: 1; }\n  :host-context(.nb-theme-default) .footer {\n    padding: 1.25rem;\n    border-top: 1px solid #ebeef2; }\n  :host-context(.nb-theme-default) .track-info {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-direction: column;\n    flex: 1;\n    padding: 1.25rem; }\n    :host-context(.nb-theme-default) .track-info .cover {\n      border-radius: 0.1875rem;\n      background-size: cover;\n      background-position: center;\n      background-repeat: no-repeat;\n      width: 10rem;\n      height: 10rem; }\n    :host-context(.nb-theme-default) .track-info .details {\n      text-align: center;\n      padding-top: 1.5rem; }\n      :host-context(.nb-theme-default) .track-info .details span {\n        color: #a4abb3; }\n  :host-context(.nb-theme-default) .progress-wrap {\n    position: relative;\n    height: 1rem; }\n    :host-context(.nb-theme-default) .progress-wrap .progress-foreground {\n      background-color: #40dc7e;\n      height: 2px;\n      position: absolute;\n      margin-top: calc(0.75rem - 1px);\n      width: 100px; }\n    :host-context(.nb-theme-default) .progress-wrap .progress {\n      -webkit-appearance: none;\n      width: 100%;\n      background: transparent;\n      height: 1.5rem;\n      outline: none;\n      position: absolute; }\n      :host-context(.nb-theme-default) .progress-wrap .progress::-webkit-slider-thumb {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        width: 1rem;\n        height: 1rem;\n        border-radius: 50%;\n        background: #40dc7e;\n        cursor: pointer;\n        margin-top: calc(-0.5rem + 1px);\n        border: none; }\n      :host-context(.nb-theme-default) .progress-wrap .progress::-moz-range-thumb {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        width: 1rem;\n        height: 1rem;\n        border-radius: 50%;\n        background: #40dc7e;\n        cursor: pointer;\n        margin-top: calc(-0.5rem + 1px);\n        border: none; }\n      :host-context(.nb-theme-default) .progress-wrap .progress::-ms-thumb {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        width: 1rem;\n        height: 1rem;\n        border-radius: 50%;\n        background: #40dc7e;\n        cursor: pointer;\n        margin-top: calc(-0.5rem + 1px);\n        border: none; }\n      :host-context(.nb-theme-default) .progress-wrap .progress::-webkit-slider-runnable-track {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        width: 100%;\n        height: 2px;\n        cursor: pointer;\n        background: #ebeef2; }\n      :host-context(.nb-theme-default) .progress-wrap .progress::-moz-range-track {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        width: 100%;\n        height: 2px;\n        cursor: pointer;\n        background: #ebeef2; }\n      :host-context(.nb-theme-default) .progress-wrap .progress::-ms-track {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        width: 100%;\n        height: 2px;\n        cursor: pointer;\n        background: #ebeef2; }\n  :host-context(.nb-theme-default) .timing {\n    padding-top: 0.5rem;\n    margin: 0 0.5rem;\n    display: flex;\n    justify-content: space-between;\n    color: #a4abb3; }\n  :host-context(.nb-theme-default) .controls {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 0.25rem 2rem 1rem;\n    max-width: 400px;\n    width: 100%;\n    margin: 0 auto; }\n    :host-context(.nb-theme-default) .controls i {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      cursor: pointer; }\n    :host-context(.nb-theme-default) .controls .shuffle, :host-context(.nb-theme-default) .controls .loop {\n      font-size: 1.5rem;\n      color: #a4abb3; }\n      :host-context(.nb-theme-default) .controls .shuffle.active, :host-context(.nb-theme-default) .controls .loop.active {\n        color: #40dc7e; }\n    :host-context(.nb-theme-default) .controls .prev, :host-context(.nb-theme-default) .controls .next {\n      width: 3.5rem;\n      height: 3.5rem;\n      border: 2px solid #ebeef2;\n      border-radius: 50%;\n      font-size: 1.75rem; }\n    :host-context(.nb-theme-default) .controls .play {\n      font-size: 2rem; }\n  :host-context(.nb-theme-default) .volume {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin: 0 auto;\n    position: relative;\n    max-width: 400px; }\n    :host-context(.nb-theme-default) .volume i {\n      font-size: 1.5rem;\n      margin: 0.25rem;\n      color: #a4abb3; }\n    :host-context(.nb-theme-default) .volume .progress-wrap {\n      height: 2.25rem;\n      margin: 0;\n      width: 80%; }\n      :host-context(.nb-theme-default) .volume .progress-wrap .progress-foreground {\n        margin-top: calc(1rem + 1px);\n        z-index: 0; }\n      :host-context(.nb-theme-default) .volume .progress-wrap .progress {\n        height: 2.25rem; }\n        :host-context(.nb-theme-default) .volume .progress-wrap .progress::-webkit-slider-thumb {\n          -webkit-appearance: none;\n          -moz-appearance: none;\n          width: 1.5rem;\n          height: 1.5rem;\n          background-color: #ffffff;\n          box-shadow: 0 0.125rem 0.5rem 0 rgba(164, 171, 179, 0.4);\n          border: solid 1px rgba(164, 171, 179, 0.4);\n          margin-top: calc(-0.875rem + 1px);\n          position: relative;\n          z-index: 10; }\n        :host-context(.nb-theme-default) .volume .progress-wrap .progress::-moz-range-thumb {\n          -webkit-appearance: none;\n          -moz-appearance: none;\n          width: 1.5rem;\n          height: 1.5rem;\n          background-color: #ffffff;\n          box-shadow: 0 0.125rem 0.5rem 0 rgba(164, 171, 179, 0.4);\n          border: solid 1px rgba(164, 171, 179, 0.4);\n          margin-top: calc(-0.875rem + 1px);\n          position: relative;\n          z-index: 10; }\n        :host-context(.nb-theme-default) .volume .progress-wrap .progress::-ms-thumb {\n          -webkit-appearance: none;\n          -moz-appearance: none;\n          width: 1.5rem;\n          height: 1.5rem;\n          background-color: #ffffff;\n          box-shadow: 0 0.125rem 0.5rem 0 rgba(164, 171, 179, 0.4);\n          border: solid 1px rgba(164, 171, 179, 0.4);\n          margin-top: calc(-0.875rem + 1px);\n          position: relative;\n          z-index: 10; }\n  :host-context(.nb-theme-default).collapsed {\n    border: none;\n    height: 4.5rem; }\n    :host-context(.nb-theme-default).collapsed .header {\n      display: none; }\n    :host-context(.nb-theme-default).collapsed .body {\n      display: flex;\n      flex-direction: row;\n      justify-content: space-between;\n      align-items: center;\n      padding: 0; }\n    :host-context(.nb-theme-default).collapsed .footer {\n      display: none; }\n    :host-context(.nb-theme-default).collapsed .track-info {\n      height: 4.5rem;\n      flex-direction: row;\n      padding: 0;\n      flex: none; }\n      :host-context(.nb-theme-default).collapsed .track-info .cover {\n        height: 4.5rem;\n        width: 4.5rem;\n        border-radius: 0 0 0 0.375rem;\n        flex: none; }\n      :host-context(.nb-theme-default).collapsed .track-info .details {\n        margin-left: 0.875rem;\n        text-align: left;\n        padding: 0; }\n        :host-context(.nb-theme-default).collapsed .track-info .details h4 {\n          margin-bottom: 0.125rem; }\n    :host-context(.nb-theme-default).collapsed .progress-wrap {\n      width: calc(100% - 6rem);\n      align-self: flex-start;\n      position: absolute;\n      left: 0;\n      margin-top: calc(-0.75rem + 1px);\n      margin-left: calc(4.5rem + 0.75rem); }\n    :host-context(.nb-theme-default).collapsed .timing {\n      display: none; }\n    :host-context(.nb-theme-default).collapsed .controls {\n      padding: 0 1rem 0 0;\n      max-width: inherit;\n      width: inherit;\n      margin: 0; }\n      :host-context(.nb-theme-default).collapsed .controls i {\n        width: inherit;\n        height: inherit; }\n      :host-context(.nb-theme-default).collapsed .controls .prev, :host-context(.nb-theme-default).collapsed .controls .shuffle, :host-context(.nb-theme-default).collapsed .controls .loop {\n        display: none; }\n      :host-context(.nb-theme-default).collapsed .controls .play, :host-context(.nb-theme-default).collapsed .controls .next {\n        font-size: 2rem;\n        border: none; }\n    :host-context(.nb-theme-default).collapsed .volume {\n      display: none; }\n    @media (max-width: 767px) {\n      :host-context(.nb-theme-default).collapsed .track-info .details h4 {\n        font-size: 1.25rem; }\n      :host-context(.nb-theme-default).collapsed .track-info .details span {\n        font-size: 0.875rem; } }\n    @media (max-width: 575px) {\n      :host-context(.nb-theme-default).collapsed .track-info .details h4 {\n        font-size: 1rem; }\n      :host-context(.nb-theme-default).collapsed .track-info .details span {\n        font-size: 0.75rem;\n        display: inline-block;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        max-height: calc(0.75rem * 1.25); } }\n\n:host-context(.nb-theme-cosmic) {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%; }\n  :host-context(.nb-theme-cosmic) .header {\n    padding: 1.25rem;\n    border-bottom: 1px solid #342e73;\n    border-top-left-radius: 0.5rem;\n    border-top-right-radius: 0.5rem;\n    color: #ffffff;\n    font-family: Exo;\n    font-size: 1.125rem;\n    font-weight: 500; }\n    :host-context(.nb-theme-cosmic) .header h1 {\n      margin: 0; }\n    :host-context(.nb-theme-cosmic) .header h2 {\n      margin: 0; }\n    :host-context(.nb-theme-cosmic) .header h3 {\n      margin: 0; }\n    :host-context(.nb-theme-cosmic) .header h4 {\n      margin: 0; }\n    :host-context(.nb-theme-cosmic) .header h5 {\n      margin: 0; }\n    :host-context(.nb-theme-cosmic) .header h6 {\n      margin: 0; }\n  :host-context(.nb-theme-cosmic) .body {\n    display: flex;\n    flex-direction: column;\n    flex: 1; }\n  :host-context(.nb-theme-cosmic) .footer {\n    padding: 1.25rem;\n    border-top: 1px solid #342e73; }\n  :host-context(.nb-theme-cosmic) .track-info {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-direction: column;\n    flex: 1;\n    padding: 1.25rem; }\n    :host-context(.nb-theme-cosmic) .track-info .cover {\n      border-radius: 0.25rem;\n      background-size: cover;\n      background-position: center;\n      background-repeat: no-repeat;\n      width: 10rem;\n      height: 10rem; }\n    :host-context(.nb-theme-cosmic) .track-info .details {\n      text-align: center;\n      padding-top: 1.5rem; }\n      :host-context(.nb-theme-cosmic) .track-info .details span {\n        color: #a1a1e5; }\n  :host-context(.nb-theme-cosmic) .progress-wrap {\n    position: relative;\n    height: 1rem; }\n    :host-context(.nb-theme-cosmic) .progress-wrap .progress-foreground {\n      background-color: #00d977;\n      height: 2px;\n      position: absolute;\n      margin-top: calc(0.75rem - 1px);\n      width: 100px;\n      background-color: #00f9a6; }\n    :host-context(.nb-theme-cosmic) .progress-wrap .progress {\n      -webkit-appearance: none;\n      width: 100%;\n      background: transparent;\n      height: 1.5rem;\n      outline: none;\n      position: absolute; }\n      :host-context(.nb-theme-cosmic) .progress-wrap .progress::-webkit-slider-thumb {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        width: 1rem;\n        height: 1rem;\n        border-radius: 50%;\n        background: #00d977;\n        cursor: pointer;\n        margin-top: calc(-0.5rem + 1px);\n        border: none; }\n      :host-context(.nb-theme-cosmic) .progress-wrap .progress::-moz-range-thumb {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        width: 1rem;\n        height: 1rem;\n        border-radius: 50%;\n        background: #00d977;\n        cursor: pointer;\n        margin-top: calc(-0.5rem + 1px);\n        border: none; }\n      :host-context(.nb-theme-cosmic) .progress-wrap .progress::-ms-thumb {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        width: 1rem;\n        height: 1rem;\n        border-radius: 50%;\n        background: #00d977;\n        cursor: pointer;\n        margin-top: calc(-0.5rem + 1px);\n        border: none; }\n      :host-context(.nb-theme-cosmic) .progress-wrap .progress::-webkit-slider-runnable-track {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        width: 100%;\n        height: 2px;\n        cursor: pointer;\n        background: #342e73; }\n      :host-context(.nb-theme-cosmic) .progress-wrap .progress::-moz-range-track {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        width: 100%;\n        height: 2px;\n        cursor: pointer;\n        background: #342e73; }\n      :host-context(.nb-theme-cosmic) .progress-wrap .progress::-ms-track {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        width: 100%;\n        height: 2px;\n        cursor: pointer;\n        background: #342e73; }\n      :host-context(.nb-theme-cosmic) .progress-wrap .progress::-webkit-slider-thumb {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        background: #00f9a6; }\n      :host-context(.nb-theme-cosmic) .progress-wrap .progress::-moz-range-thumb {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        background: #00f9a6; }\n      :host-context(.nb-theme-cosmic) .progress-wrap .progress::-ms-thumb {\n        -webkit-appearance: none;\n        -moz-appearance: none;\n        background: #00f9a6; }\n  :host-context(.nb-theme-cosmic) .timing {\n    padding-top: 0.5rem;\n    margin: 0 0.5rem;\n    display: flex;\n    justify-content: space-between;\n    color: #a1a1e5; }\n  :host-context(.nb-theme-cosmic) .controls {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 0.25rem 2rem 1rem;\n    max-width: 400px;\n    width: 100%;\n    margin: 0 auto; }\n    :host-context(.nb-theme-cosmic) .controls i {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      cursor: pointer; }\n    :host-context(.nb-theme-cosmic) .controls .shuffle, :host-context(.nb-theme-cosmic) .controls .loop {\n      font-size: 1.5rem;\n      color: #a1a1e5; }\n      :host-context(.nb-theme-cosmic) .controls .shuffle.active, :host-context(.nb-theme-cosmic) .controls .loop.active {\n        color: #00d977;\n        color: #00f9a6; }\n    :host-context(.nb-theme-cosmic) .controls .prev, :host-context(.nb-theme-cosmic) .controls .next {\n      width: 3.5rem;\n      height: 3.5rem;\n      border: 2px solid #342e73;\n      border-radius: 50%;\n      font-size: 1.75rem; }\n    :host-context(.nb-theme-cosmic) .controls .play {\n      font-size: 2rem; }\n  :host-context(.nb-theme-cosmic) .volume {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin: 0 auto;\n    position: relative;\n    max-width: 400px; }\n    :host-context(.nb-theme-cosmic) .volume i {\n      font-size: 1.5rem;\n      margin: 0.25rem;\n      color: #a1a1e5; }\n    :host-context(.nb-theme-cosmic) .volume .progress-wrap {\n      height: 2.25rem;\n      margin: 0;\n      width: 80%; }\n      :host-context(.nb-theme-cosmic) .volume .progress-wrap .progress-foreground {\n        margin-top: calc(1rem + 1px);\n        z-index: 0; }\n      :host-context(.nb-theme-cosmic) .volume .progress-wrap .progress {\n        height: 2.25rem; }\n        :host-context(.nb-theme-cosmic) .volume .progress-wrap .progress::-webkit-slider-thumb {\n          -webkit-appearance: none;\n          -moz-appearance: none;\n          width: 1.5rem;\n          height: 1.5rem;\n          background-color: #ffffff;\n          box-shadow: 0 0.125rem 0.5rem 0 rgba(161, 161, 229, 0.4);\n          border: solid 1px rgba(161, 161, 229, 0.4);\n          margin-top: calc(-0.875rem + 1px);\n          position: relative;\n          z-index: 10; }\n        :host-context(.nb-theme-cosmic) .volume .progress-wrap .progress::-moz-range-thumb {\n          -webkit-appearance: none;\n          -moz-appearance: none;\n          width: 1.5rem;\n          height: 1.5rem;\n          background-color: #ffffff;\n          box-shadow: 0 0.125rem 0.5rem 0 rgba(161, 161, 229, 0.4);\n          border: solid 1px rgba(161, 161, 229, 0.4);\n          margin-top: calc(-0.875rem + 1px);\n          position: relative;\n          z-index: 10; }\n        :host-context(.nb-theme-cosmic) .volume .progress-wrap .progress::-ms-thumb {\n          -webkit-appearance: none;\n          -moz-appearance: none;\n          width: 1.5rem;\n          height: 1.5rem;\n          background-color: #ffffff;\n          box-shadow: 0 0.125rem 0.5rem 0 rgba(161, 161, 229, 0.4);\n          border: solid 1px rgba(161, 161, 229, 0.4);\n          margin-top: calc(-0.875rem + 1px);\n          position: relative;\n          z-index: 10; }\n  :host-context(.nb-theme-cosmic).collapsed {\n    border: none;\n    height: 4.5rem; }\n    :host-context(.nb-theme-cosmic).collapsed .header {\n      display: none; }\n    :host-context(.nb-theme-cosmic).collapsed .body {\n      display: flex;\n      flex-direction: row;\n      justify-content: space-between;\n      align-items: center;\n      padding: 0; }\n    :host-context(.nb-theme-cosmic).collapsed .footer {\n      display: none; }\n    :host-context(.nb-theme-cosmic).collapsed .track-info {\n      height: 4.5rem;\n      flex-direction: row;\n      padding: 0;\n      flex: none; }\n      :host-context(.nb-theme-cosmic).collapsed .track-info .cover {\n        height: 4.5rem;\n        width: 4.5rem;\n        border-radius: 0 0 0 0.5rem;\n        flex: none; }\n      :host-context(.nb-theme-cosmic).collapsed .track-info .details {\n        margin-left: 0.875rem;\n        text-align: left;\n        padding: 0; }\n        :host-context(.nb-theme-cosmic).collapsed .track-info .details h4 {\n          margin-bottom: 0.125rem; }\n    :host-context(.nb-theme-cosmic).collapsed .progress-wrap {\n      width: calc(100% - 6rem);\n      align-self: flex-start;\n      position: absolute;\n      left: 0;\n      margin-top: calc(-0.75rem + 1px);\n      margin-left: calc(4.5rem + 0.75rem); }\n    :host-context(.nb-theme-cosmic).collapsed .timing {\n      display: none; }\n    :host-context(.nb-theme-cosmic).collapsed .controls {\n      padding: 0 1rem 0 0;\n      max-width: inherit;\n      width: inherit;\n      margin: 0; }\n      :host-context(.nb-theme-cosmic).collapsed .controls i {\n        width: inherit;\n        height: inherit; }\n      :host-context(.nb-theme-cosmic).collapsed .controls .prev, :host-context(.nb-theme-cosmic).collapsed .controls .shuffle, :host-context(.nb-theme-cosmic).collapsed .controls .loop {\n        display: none; }\n      :host-context(.nb-theme-cosmic).collapsed .controls .play, :host-context(.nb-theme-cosmic).collapsed .controls .next {\n        font-size: 2rem;\n        border: none; }\n    :host-context(.nb-theme-cosmic).collapsed .volume {\n      display: none; }\n    @media (max-width: 767px) {\n      :host-context(.nb-theme-cosmic).collapsed .track-info .details h4 {\n        font-size: 1.25rem; }\n      :host-context(.nb-theme-cosmic).collapsed .track-info .details span {\n        font-size: 0.875rem; } }\n    @media (max-width: 575px) {\n      :host-context(.nb-theme-cosmic).collapsed .track-info .details h4 {\n        font-size: 1rem; }\n      :host-context(.nb-theme-cosmic).collapsed .track-info .details span {\n        font-size: 0.75rem;\n        display: inline-block;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        max-height: calc(0.75rem * 1.25); } }\n", ""]);

// exports


/***/ }),

/***/ 2076:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nb-theme-default) svg {\n  width: 100%; }\n\n:host-context(.nb-theme-default) .stroke-pattern {\n  fill: none;\n  stroke: #bdc4cd;\n  stroke-miterlimit: 10;\n  opacity: 0.1;\n  stroke-width: 1px; }\n\n:host-context(.nb-theme-default) .stroked-element {\n  stroke-width: 4px;\n  stroke: #bdc4cd;\n  stroke-miterlimit: 10;\n  fill: url(\"#New_Pattern_Swatch_1\"); }\n\n:host-context(.nb-theme-default) .room-border {\n  stroke-width: 4px;\n  stroke: #bdc4cd;\n  stroke-miterlimit: 10;\n  fill: none; }\n\n:host-context(.nb-theme-default) .room-bg {\n  fill: #ffffff;\n  stroke: transparent;\n  cursor: pointer;\n  stroke-width: 4px; }\n\n:host-context(.nb-theme-default) .room-bg-border-grad {\n  fill: none;\n  stroke: none;\n  stroke-width: 4px; }\n\n:host-context(.nb-theme-default) .room-text {\n  cursor: pointer;\n  user-select: none;\n  pointer-events: none;\n  fill: #a4abb3; }\n\n:host-context(.nb-theme-default) .selected-room {\n  z-index: 40; }\n  :host-context(.nb-theme-default) .selected-room .room-text {\n    fill: #2a2a2a;\n    font-weight: 500; }\n  :host-context(.nb-theme-default) .selected-room .room-border {\n    stroke: #40dc7e; }\n\n:host-context(.nb-theme-default) .header {\n  padding: 1.25rem;\n  border-bottom: 1px solid #ebeef2;\n  border-top-left-radius: 0.375rem;\n  border-top-right-radius: 0.375rem;\n  color: #2a2a2a;\n  font-family: Exo;\n  font-size: 1.125rem;\n  font-weight: 600;\n  border-bottom: none;\n  padding-bottom: 0; }\n  :host-context(.nb-theme-default) .header h1 {\n    margin: 0; }\n  :host-context(.nb-theme-default) .header h2 {\n    margin: 0; }\n  :host-context(.nb-theme-default) .header h3 {\n    margin: 0; }\n  :host-context(.nb-theme-default) .header h4 {\n    margin: 0; }\n  :host-context(.nb-theme-default) .header h5 {\n    margin: 0; }\n  :host-context(.nb-theme-default) .header h6 {\n    margin: 0; }\n\n:host-context(.nb-theme-cosmic) svg {\n  width: 100%; }\n\n:host-context(.nb-theme-cosmic) .stroke-pattern {\n  fill: none;\n  stroke: #bdc4cd;\n  stroke-miterlimit: 10;\n  opacity: 0.1;\n  stroke-width: 1px; }\n\n:host-context(.nb-theme-cosmic) .stroked-element {\n  stroke-width: 4px;\n  stroke: #bdc4cd;\n  stroke-miterlimit: 10;\n  fill: url(\"#New_Pattern_Swatch_1\"); }\n\n:host-context(.nb-theme-cosmic) .room-border {\n  stroke-width: 4px;\n  stroke: #bdc4cd;\n  stroke-miterlimit: 10;\n  fill: none; }\n\n:host-context(.nb-theme-cosmic) .room-bg {\n  fill: #3d3780;\n  stroke: transparent;\n  cursor: pointer;\n  stroke-width: 4px; }\n\n:host-context(.nb-theme-cosmic) .room-bg-border-grad {\n  fill: none;\n  stroke: none;\n  stroke-width: 4px; }\n\n:host-context(.nb-theme-cosmic) .room-text {\n  cursor: pointer;\n  user-select: none;\n  pointer-events: none;\n  fill: #a1a1e5; }\n\n:host-context(.nb-theme-cosmic) .selected-room {\n  z-index: 40; }\n  :host-context(.nb-theme-cosmic) .selected-room .room-text {\n    fill: #ffffff;\n    font-weight: 500; }\n  :host-context(.nb-theme-cosmic) .selected-room .room-border {\n    stroke: #00d977; }\n\n:host-context(.nb-theme-cosmic) .header {\n  padding: 1.25rem;\n  border-bottom: 1px solid #342e73;\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n  color: #ffffff;\n  font-family: Exo;\n  font-size: 1.125rem;\n  font-weight: 500;\n  border-bottom: none;\n  padding-bottom: 0; }\n  :host-context(.nb-theme-cosmic) .header h1 {\n    margin: 0; }\n  :host-context(.nb-theme-cosmic) .header h2 {\n    margin: 0; }\n  :host-context(.nb-theme-cosmic) .header h3 {\n    margin: 0; }\n  :host-context(.nb-theme-cosmic) .header h4 {\n    margin: 0; }\n  :host-context(.nb-theme-cosmic) .header h5 {\n    margin: 0; }\n  :host-context(.nb-theme-cosmic) .header h6 {\n    margin: 0; }\n\n:host-context(.nb-theme-cosmic) .stroke-pattern, :host-context(.nb-theme-cosmic) .stroked-element, :host-context(.nb-theme-cosmic) .room-border {\n  stroke: #a1a1e5; }\n\n:host-context(.nb-theme-cosmic) .room-text {\n  fill: #ffffff; }\n\n:host-context(.nb-theme-cosmic) .selected-room .room-text {\n  font-weight: 400; }\n\n:host-context(.nb-theme-cosmic) .selected-room .room-bg {\n  fill: rgba(0, 255, 170, 0.2);\n  filter: url(\"#f2\"); }\n\n:host-context(.nb-theme-cosmic) .selected-room .room-border {\n  stroke: #00f9a6; }\n\n:host-context(.nb-theme-cosmic) .selected-room .room-border-glow {\n  filter: url(\"#f2\"); }\n", ""]);

// exports


/***/ }),

/***/ 2077:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nb-theme-default) ngx-room-selector {\n  width: 70%;\n  border-right: 2px solid #ebeef2;\n  background: url(" + __webpack_require__(1679) + ") repeat;\n  background-size: 75px; }\n\n:host-context(.nb-theme-default) ngx-player {\n  width: 30%; }\n\n:host-context(.nb-theme-default) nb-card {\n  display: flex;\n  flex-direction: row; }\n\n:host-context(.nb-theme-default) ngx-room-selector {\n  display: flex;\n  flex-direction: column;\n  flex: 1; }\n  :host-context(.nb-theme-default) ngx-room-selector /deep/ .room-selector {\n    display: flex;\n    align-items: center;\n    justify-items: center;\n    flex: 1;\n    margin: 0 auto;\n    width: 90%;\n    max-width: 650px;\n    padding-bottom: 1rem; }\n\n@media (max-width: 991px) {\n  :host-context(.nb-theme-default).expanded ngx-room-selector {\n    display: none; }\n  :host-context(.nb-theme-default) ngx-room-selector, :host-context(.nb-theme-default) ngx-player {\n    width: 100%;\n    border: none; }\n  :host-context(.nb-theme-default) nb-card {\n    flex-direction: column;\n    justify-content: space-between; }\n    :host-context(.nb-theme-default) nb-card .collapse {\n      display: inline-block;\n      position: absolute;\n      top: 0.5rem;\n      left: 50%;\n      transform: translateX(-50%);\n      font-size: 3rem;\n      color: #a4abb3; }\n      :host-context(.nb-theme-default) nb-card .collapse:focus {\n        outline: none; } }\n\n:host-context(.nb-theme-cosmic) ngx-room-selector {\n  width: 70%;\n  border-right: 2px solid #342e73;\n  background: url(" + __webpack_require__(1679) + ") repeat;\n  background-size: 75px;\n  background-image: url(" + __webpack_require__(2333) + "); }\n\n:host-context(.nb-theme-cosmic) ngx-player {\n  width: 30%; }\n\n:host-context(.nb-theme-cosmic) nb-card {\n  display: flex;\n  flex-direction: row; }\n\n:host-context(.nb-theme-cosmic) ngx-room-selector {\n  display: flex;\n  flex-direction: column;\n  flex: 1; }\n  :host-context(.nb-theme-cosmic) ngx-room-selector /deep/ .room-selector {\n    display: flex;\n    align-items: center;\n    justify-items: center;\n    flex: 1;\n    margin: 0 auto;\n    width: 90%;\n    max-width: 650px;\n    padding-bottom: 1rem; }\n\n@media (max-width: 991px) {\n  :host-context(.nb-theme-cosmic).expanded ngx-room-selector {\n    display: none; }\n  :host-context(.nb-theme-cosmic) ngx-room-selector, :host-context(.nb-theme-cosmic) ngx-player {\n    width: 100%;\n    border: none; }\n  :host-context(.nb-theme-cosmic) nb-card {\n    flex-direction: column;\n    justify-content: space-between; }\n    :host-context(.nb-theme-cosmic) nb-card .collapse {\n      display: inline-block;\n      position: absolute;\n      top: 0.5rem;\n      left: 50%;\n      transform: translateX(-50%);\n      font-size: 3rem;\n      color: #a1a1e5; }\n      :host-context(.nb-theme-cosmic) nb-card .collapse:focus {\n        outline: none; } }\n", ""]);

// exports


/***/ }),

/***/ 2078:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nb-theme-default) nb-card-header {\n  padding: 0;\n  border: none; }\n\n:host-context(.nb-theme-default) nb-card-body {\n  padding: 0;\n  position: relative; }\n\n:host-context(.nb-theme-default) nb-card-footer {\n  padding: 1rem 0;\n  border: none; }\n\n:host-context(.nb-theme-default) .cameras-card-header {\n  display: flex; }\n  :host-context(.nb-theme-default) .cameras-card-header .cameras-card-title {\n    flex: 1;\n    padding: 1.25rem; }\n\n:host-context(.nb-theme-default) .cameras-filter {\n  display: flex; }\n  :host-context(.nb-theme-default) .cameras-filter a {\n    font-size: 2.5rem;\n    padding: 0 0.75rem;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    color: #a4abb3; }\n  :host-context(.nb-theme-default) .cameras-filter a:first-child {\n    border-left: 1px solid #ebeef2; }\n  :host-context(.nb-theme-default) .cameras-filter a:last-child {\n    border-top-right-radius: 0.375rem; }\n  :host-context(.nb-theme-default) .cameras-filter a.active {\n    background-color: #e9edf2;\n    color: #2a2a2a;\n    border: none; }\n\n:host-context(.nb-theme-default) .cameras {\n  position: absolute;\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n  height: 100%; }\n\n:host-context(.nb-theme-default) .cameras.single-view .camera {\n  height: 100%;\n  width: 100%; }\n  :host-context(.nb-theme-default) .cameras.single-view .camera::before {\n    height: 100%; }\n\n:host-context(.nb-theme-default) .camera {\n  position: relative;\n  background-position: center;\n  background-size: cover;\n  height: 50%;\n  padding: 0; }\n  :host-context(.nb-theme-default) .camera span {\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    color: white;\n    background: rgba(0, 0, 0, 0.4);\n    font-family: Exo;\n    font-weight: 500;\n    font-size: 1.25rem;\n    padding: 0.5rem 1rem; }\n  :host-context(.nb-theme-default) .camera::before {\n    background-color: rgba(255, 255, 255, 0.1);\n    content: '';\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    opacity: 1; }\n  :host-context(.nb-theme-default) .camera:hover::before {\n    opacity: 0; }\n\n:host-context(.nb-theme-default) nb-action {\n  padding: 0 0.5rem 0 0; }\n  :host-context(.nb-theme-default) nb-action i {\n    color: #a4abb3;\n    font-size: 3rem;\n    margin-right: 0.5rem; }\n  :host-context(.nb-theme-default) nb-action span {\n    font-family: Exo;\n    font-weight: 600;\n    color: #2a2a2a;\n    text-transform: uppercase; }\n\n@media (max-width: 1199px) {\n  :host-context(.nb-theme-default) nb-action {\n    padding: 0; }\n    :host-context(.nb-theme-default) nb-action i {\n      margin: 0; }\n    :host-context(.nb-theme-default) nb-action span {\n      display: none; } }\n\n:host-context(.nb-theme-cosmic) nb-card-header {\n  padding: 0;\n  border: none; }\n\n:host-context(.nb-theme-cosmic) nb-card-body {\n  padding: 0;\n  position: relative; }\n\n:host-context(.nb-theme-cosmic) nb-card-footer {\n  padding: 1rem 0;\n  border: none; }\n\n:host-context(.nb-theme-cosmic) .cameras-card-header {\n  display: flex; }\n  :host-context(.nb-theme-cosmic) .cameras-card-header .cameras-card-title {\n    flex: 1;\n    padding: 1.25rem; }\n\n:host-context(.nb-theme-cosmic) .cameras-filter {\n  display: flex; }\n  :host-context(.nb-theme-cosmic) .cameras-filter a {\n    font-size: 2.5rem;\n    padding: 0 0.75rem;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    color: #a1a1e5; }\n  :host-context(.nb-theme-cosmic) .cameras-filter a:first-child {\n    border-left: 1px solid #342e73; }\n  :host-context(.nb-theme-cosmic) .cameras-filter a:last-child {\n    border-top-right-radius: 0.5rem; }\n  :host-context(.nb-theme-cosmic) .cameras-filter a.active {\n    background-color: #494299;\n    color: #ffffff;\n    border: none; }\n\n:host-context(.nb-theme-cosmic) .cameras {\n  position: absolute;\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n  height: 100%; }\n\n:host-context(.nb-theme-cosmic) .cameras.single-view .camera {\n  height: 100%;\n  width: 100%; }\n  :host-context(.nb-theme-cosmic) .cameras.single-view .camera::before {\n    height: 100%; }\n\n:host-context(.nb-theme-cosmic) .camera {\n  position: relative;\n  background-position: center;\n  background-size: cover;\n  height: 50%;\n  padding: 0; }\n  :host-context(.nb-theme-cosmic) .camera span {\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    color: white;\n    background: rgba(0, 0, 0, 0.4);\n    font-family: Exo;\n    font-weight: 500;\n    font-size: 1.25rem;\n    padding: 0.5rem 1rem; }\n  :host-context(.nb-theme-cosmic) .camera::before {\n    background-color: rgba(255, 255, 255, 0.1);\n    content: '';\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    opacity: 1; }\n  :host-context(.nb-theme-cosmic) .camera:hover::before {\n    opacity: 0; }\n\n:host-context(.nb-theme-cosmic) nb-action {\n  padding: 0 0.5rem 0 0; }\n  :host-context(.nb-theme-cosmic) nb-action i {\n    color: #a1a1e5;\n    font-size: 3rem;\n    margin-right: 0.5rem; }\n  :host-context(.nb-theme-cosmic) nb-action span {\n    font-family: Exo;\n    font-weight: 600;\n    color: #ffffff;\n    text-transform: uppercase; }\n\n:host-context(.nb-theme-cosmic) .cameras-filter a.active {\n  color: #00f9a6; }\n\n:host-context(.nb-theme-cosmic) .camera span {\n  background: rgba(88, 73, 184, 0.5); }\n\n:host-context(.nb-theme-cosmic) .camera::before {\n  background-color: rgba(0, 0, 0, 0.2); }\n\n:host-context(.nb-theme-cosmic) nb-action span {\n  font-weight: 500; }\n\n@media (max-width: 1199px) {\n  :host-context(.nb-theme-cosmic) nb-action {\n    padding: 0; }\n    :host-context(.nb-theme-cosmic) nb-action i {\n      margin: 0; }\n    :host-context(.nb-theme-cosmic) nb-action span {\n      display: none; } }\n", ""]);

// exports


/***/ }),

/***/ 2079:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nb-theme-default) nb-card-body {\n  overflow: hidden;\n  padding: 1rem; }\n\n:host-context(.nb-theme-default) .echart {\n  position: absolute;\n  height: calc(100% - 2 * 1rem);\n  width: 40%; }\n\n:host-context(.nb-theme-default) .info {\n  margin-left: 45%;\n  padding-top: 1.5rem;\n  color: #a4abb3; }\n\n:host-context(.nb-theme-default) .value {\n  font-family: Exo;\n  font-size: 2rem;\n  font-weight: 600;\n  color: #2a2a2a; }\n\n:host-context(.nb-theme-default) .details {\n  font-size: 1.25rem;\n  font-weight: 500;\n  line-height: 1; }\n  :host-context(.nb-theme-default) .details span {\n    font-size: 1rem;\n    font-weight: 300; }\n\n:host-context(.nb-theme-default) .text-hint {\n  font-size: 1rem; }\n\n@media (max-width: 399px) {\n  :host-context(.nb-theme-default) .value {\n    font-size: 1.75rem; } }\n\n:host-context(.nb-theme-cosmic) {\n  color: #ffffff; }\n  :host-context(.nb-theme-cosmic) nb-card-body {\n    overflow: hidden;\n    padding: 1rem; }\n  :host-context(.nb-theme-cosmic) .echart {\n    position: absolute;\n    height: calc(100% - 2 * 1rem);\n    width: 40%; }\n  :host-context(.nb-theme-cosmic) .info {\n    margin-left: 45%;\n    padding-top: 1.5rem;\n    color: #a1a1e5; }\n  :host-context(.nb-theme-cosmic) .value {\n    font-family: Exo;\n    font-size: 2rem;\n    font-weight: 600;\n    color: #ffffff; }\n  :host-context(.nb-theme-cosmic) .details {\n    font-size: 1.25rem;\n    font-weight: 500;\n    line-height: 1; }\n    :host-context(.nb-theme-cosmic) .details span {\n      font-size: 1rem;\n      font-weight: 300; }\n  :host-context(.nb-theme-cosmic) .text-hint {\n    font-size: 1rem; }\n  :host-context(.nb-theme-cosmic) .value {\n    color: #00f9a6; }\n  :host-context(.nb-theme-cosmic) .details span {\n    color: #a1a1e5; }\n  @media (max-width: 399px) {\n    :host-context(.nb-theme-cosmic) .value {\n      font-size: 1.75rem; } }\n", ""]);

// exports


/***/ }),

/***/ 2080:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nb-theme-default) nb-card {\n  flex-direction: row;\n  align-items: center;\n  height: 6rem;\n  overflow: visible;\n  box-shadow: 0 0 0 0 #dbdbdb, none; }\n  :host-context(.nb-theme-default) nb-card .icon-container {\n    height: 100%;\n    padding: 0.625rem; }\n  :host-context(.nb-theme-default) nb-card .icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 5.75rem;\n    height: 4.75rem;\n    font-size: 3.75rem;\n    border-radius: 0.375rem;\n    transition: width 0.4s ease;\n    transform: translate3d(0, 0, 0);\n    -webkit-transform-style: preserve-3d;\n    -webkit-backface-visibility: hidden;\n    color: #ffffff; }\n    :host-context(.nb-theme-default) nb-card .icon.primary {\n      background-image: linear-gradient(to right, #b57fff, #8a7fff);\n      box-shadow: 0 0 0 0 #896ddb, 0 0 0 0 #9f7fff; }\n    :host-context(.nb-theme-default) nb-card .icon.success {\n      background-image: linear-gradient(to right, #40dcb2, #40dc7e);\n      box-shadow: 0 0 0 0 #37bd83, 0 0 0 0 #40dc98; }\n    :host-context(.nb-theme-default) nb-card .icon.info {\n      background-image: linear-gradient(to right, #4cc4ff, #4ca6ff);\n      box-shadow: 0 0 0 0 #419cdb, 0 0 0 0 #4cb5ff; }\n    :host-context(.nb-theme-default) nb-card .icon.warning {\n      background-image: linear-gradient(to right, #ffcc00, #ffa100);\n      box-shadow: 0 0 0 0 #db9d00, 0 0 0 0 #ffb600; }\n  :host-context(.nb-theme-default) nb-card:hover {\n    background: white; }\n    :host-context(.nb-theme-default) nb-card:hover .icon.primary {\n      background-image: linear-gradient(to right, #bf91ff, #9a91ff); }\n    :host-context(.nb-theme-default) nb-card:hover .icon.success {\n      background-image: linear-gradient(to right, #5be1bd, #5be190); }\n    :host-context(.nb-theme-default) nb-card:hover .icon.info {\n      background-image: linear-gradient(to right, #65ccff, #65b2ff); }\n    :host-context(.nb-theme-default) nb-card:hover .icon.warning {\n      background-image: linear-gradient(to right, #ffd324, #ffae24); }\n  :host-context(.nb-theme-default) nb-card.off {\n    color: #a4abb3; }\n    :host-context(.nb-theme-default) nb-card.off .icon {\n      color: #a4abb3; }\n      :host-context(.nb-theme-default) nb-card.off .icon.primary, :host-context(.nb-theme-default) nb-card.off .icon.success, :host-context(.nb-theme-default) nb-card.off .icon.info, :host-context(.nb-theme-default) nb-card.off .icon.warning {\n        box-shadow: none;\n        background-image: linear-gradient(to right, transparent, transparent); }\n    :host-context(.nb-theme-default) nb-card.off .title {\n      color: #a4abb3; }\n  :host-context(.nb-theme-default) nb-card .details {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    height: 100%;\n    padding: 0 0.5rem 0 0.75rem;\n    border-left: 1px solid transparent; }\n  :host-context(.nb-theme-default) nb-card .title {\n    font-family: Exo;\n    font-size: 1.25rem;\n    font-weight: 600;\n    color: #2a2a2a; }\n  :host-context(.nb-theme-default) nb-card .status {\n    font-size: 1rem;\n    font-weight: 300;\n    text-transform: uppercase;\n    color: #a4abb3; }\n\n:host-context(.nb-theme-cosmic) nb-card {\n  flex-direction: row;\n  align-items: center;\n  height: 6rem;\n  overflow: visible;\n  box-shadow: 0 3px 0 0 #342f6e, 0 4px 10px 0 rgba(33, 7, 77, 0.5); }\n  :host-context(.nb-theme-cosmic) nb-card .icon-container {\n    height: 100%;\n    padding: 0.625rem; }\n  :host-context(.nb-theme-cosmic) nb-card .icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 5.75rem;\n    height: 4.75rem;\n    font-size: 3.75rem;\n    border-radius: 0.5rem;\n    transition: width 0.4s ease;\n    transform: translate3d(0, 0, 0);\n    -webkit-transform-style: preserve-3d;\n    -webkit-backface-visibility: hidden;\n    color: #ffffff; }\n    :host-context(.nb-theme-cosmic) nb-card .icon.primary {\n      background-image: linear-gradient(to right, #ad59ff, #7659ff);\n      box-shadow: 0 3px 0 0 #7e4ddb, 0 2px 8px 0 #9259ff, 0 4px 10px 0 rgba(33, 7, 77, 0.5); }\n    :host-context(.nb-theme-cosmic) nb-card .icon.success {\n      background-image: linear-gradient(to right, #00d9bf, #00d977);\n      box-shadow: 0 3px 0 0 #00bb85, 0 2px 8px 0 #00d99b, 0 4px 10px 0 rgba(33, 7, 77, 0.5); }\n    :host-context(.nb-theme-cosmic) nb-card .icon.info {\n      background-image: linear-gradient(to right, #00b3ff, #0088ff);\n      box-shadow: 0 3px 0 0 #0087db, 0 2px 8px 0 #009dff, 0 4px 10px 0 rgba(33, 7, 77, 0.5); }\n    :host-context(.nb-theme-cosmic) nb-card .icon.warning {\n      background-image: linear-gradient(to right, #ffcc00, #ffa100);\n      box-shadow: 0 3px 0 0 #db9d00, 0 2px 8px 0 #ffb600, 0 4px 10px 0 rgba(33, 7, 77, 0.5); }\n  :host-context(.nb-theme-cosmic) nb-card:hover {\n    background: #463f92; }\n    :host-context(.nb-theme-cosmic) nb-card:hover .icon.primary {\n      background-image: linear-gradient(to right, #b970ff, #8970ff); }\n    :host-context(.nb-theme-cosmic) nb-card:hover .icon.success {\n      background-image: linear-gradient(to right, #24dec8, #24de8a); }\n    :host-context(.nb-theme-cosmic) nb-card:hover .icon.info {\n      background-image: linear-gradient(to right, #24bdff, #2499ff); }\n    :host-context(.nb-theme-cosmic) nb-card:hover .icon.warning {\n      background-image: linear-gradient(to right, #ffd324, #ffae24); }\n  :host-context(.nb-theme-cosmic) nb-card.off {\n    color: #a1a1e5; }\n    :host-context(.nb-theme-cosmic) nb-card.off .icon {\n      color: #a1a1e5; }\n      :host-context(.nb-theme-cosmic) nb-card.off .icon.primary, :host-context(.nb-theme-cosmic) nb-card.off .icon.success, :host-context(.nb-theme-cosmic) nb-card.off .icon.info, :host-context(.nb-theme-cosmic) nb-card.off .icon.warning {\n        box-shadow: none;\n        background-image: linear-gradient(to right, transparent, transparent); }\n    :host-context(.nb-theme-cosmic) nb-card.off .title {\n      color: #a1a1e5; }\n  :host-context(.nb-theme-cosmic) nb-card .details {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    height: 100%;\n    padding: 0 0.5rem 0 0.75rem;\n    border-left: 1px solid transparent; }\n  :host-context(.nb-theme-cosmic) nb-card .title {\n    font-family: Exo;\n    font-size: 1.25rem;\n    font-weight: 600;\n    color: #ffffff; }\n  :host-context(.nb-theme-cosmic) nb-card .status {\n    font-size: 1rem;\n    font-weight: 300;\n    text-transform: uppercase;\n    color: #a1a1e5; }\n\n:host-context(.nb-theme-cosmic) nb-card.off .icon-container {\n  border-right: 1px solid #342e73; }\n\n:host-context(.nb-theme-cosmic) nb-card .icon-container {\n  padding: 0; }\n\n:host-context(.nb-theme-cosmic) nb-card .details {\n  padding-left: 1.25rem; }\n\n:host-context(.nb-theme-cosmic) nb-card .icon {\n  width: 7rem;\n  height: 100%;\n  font-size: 4.5rem;\n  border-radius: 0.5rem 0 0 0.5rem; }\n\n:host-context(.nb-theme-cosmic) nb-card .title {\n  font-weight: 500; }\n\n:host-context(.nb-theme-cosmic) nb-card .status {\n  font-weight: 300; }\n", ""]);

// exports


/***/ }),

/***/ 2081:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n:host-context(.nb-theme-default) .team-photo {\n  background-image: url(\"/assets/images/team.png\");\n  background-position: center;\n  background-size: cover;\n  position: relative;\n  border-top-left-radius: 0.375rem;\n  border-top-right-radius: 0.375rem;\n  flex: 1;\n  max-height: 50%; }\n  :host-context(.nb-theme-default) .team-photo .team-link {\n    position: absolute;\n    height: 4rem;\n    width: 4rem;\n    bottom: -2rem;\n    right: 1rem;\n    border-radius: 50%;\n    box-shadow: 0 4px 10px 0 rgba(235, 239, 245, 0.4), 0 0 12px 0 rgba(64, 220, 126, 0.2); }\n\n:host-context(.nb-theme-default) .team-info {\n  padding: 1.5rem 1.5rem 0; }\n  :host-context(.nb-theme-default) .team-info .team-title {\n    color: #2a2a2a;\n    font-family: Exo; }\n    :host-context(.nb-theme-default) .team-info .team-title h2 {\n      margin: 0; }\n  :host-context(.nb-theme-default) .team-info .team-subtitle {\n    margin-bottom: 1rem;\n    color: #a4abb3;\n    font-weight: 300; }\n  :host-context(.nb-theme-default) .team-info .team-bio {\n    text-align: justify;\n    color: #4b4b4b;\n    font-weight: 300; }\n\n:host-context(.nb-theme-default) .links {\n  display: flex;\n  justify-content: space-around;\n  padding: 1rem 0; }\n  :host-context(.nb-theme-default) .links a {\n    text-decoration: none;\n    color: #a4abb3; }\n    :host-context(.nb-theme-default) .links a i {\n      font-size: 1.75rem; }\n\n:host-context(.nb-theme-cosmic) .team-photo {\n  background-image: url(\"/assets/images/team.png\");\n  background-position: center;\n  background-size: cover;\n  position: relative;\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n  flex: 1;\n  max-height: 50%; }\n  :host-context(.nb-theme-cosmic) .team-photo .team-link {\n    position: absolute;\n    height: 4rem;\n    width: 4rem;\n    bottom: -2rem;\n    right: 1rem;\n    border-radius: 50%;\n    box-shadow: 0 4px 10px 0 rgba(47, 41, 107, 0.4), 0 0 12px 0 rgba(0, 249, 166, 0.2); }\n\n:host-context(.nb-theme-cosmic) .team-info {\n  padding: 1.5rem 1.5rem 0; }\n  :host-context(.nb-theme-cosmic) .team-info .team-title {\n    color: #ffffff;\n    font-family: Exo; }\n    :host-context(.nb-theme-cosmic) .team-info .team-title h2 {\n      margin: 0; }\n  :host-context(.nb-theme-cosmic) .team-info .team-subtitle {\n    margin-bottom: 1rem;\n    color: #a1a1e5;\n    font-weight: 300; }\n  :host-context(.nb-theme-cosmic) .team-info .team-bio {\n    text-align: justify;\n    color: #d1d1ff;\n    font-weight: 300; }\n\n:host-context(.nb-theme-cosmic) .links {\n  display: flex;\n  justify-content: space-around;\n  padding: 1rem 0; }\n  :host-context(.nb-theme-cosmic) .links a {\n    text-decoration: none;\n    color: #a1a1e5; }\n    :host-context(.nb-theme-cosmic) .links a i {\n      font-size: 1.75rem; }\n", ""]);

// exports


/***/ }),

/***/ 2082:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nb-theme-default) {\n  position: relative; }\n  :host-context(.nb-theme-default) img {\n    width: 100%;\n    height: auto;\n    visibility: hidden; }\n  :host-context(.nb-theme-default) .svg-container {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 2; }\n  :host-context(.nb-theme-default) .circle {\n    fill: #ffffff;\n    stroke: #40dc7e; }\n  :host-context(.nb-theme-default) .temperature-bg {\n    position: absolute;\n    width: 88%;\n    height: 88%;\n    top: 13%;\n    left: 6%;\n    border-radius: 50%;\n    z-index: 1;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    border: 2px solid #ebeef2; }\n  :host-context(.nb-theme-default) .power-bg {\n    position: absolute;\n    width: 5.25rem;\n    height: 5.25rem;\n    background-color: #ffffff;\n    border-radius: 50%;\n    bottom: 2%;\n    left: 50%;\n    transform: translate(-50%, 50%);\n    z-index: 2;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    font-size: 3rem;\n    color: #2a2a2a;\n    border: 2px solid #ebeef2; }\n    :host-context(.nb-theme-default) .power-bg:hover {\n      background-color: white; }\n    :host-context(.nb-theme-default) .power-bg:active {\n      background-color: #f2f2f2;\n      box-shadow: none; }\n    :host-context(.nb-theme-default) .power-bg.off {\n      color: #a4abb3;\n      text-shadow: none; }\n\n:host-context(.nb-theme-cosmic) {\n  position: relative; }\n  :host-context(.nb-theme-cosmic) img {\n    width: 100%;\n    height: auto;\n    visibility: hidden; }\n  :host-context(.nb-theme-cosmic) .svg-container {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 2; }\n  :host-context(.nb-theme-cosmic) .circle {\n    fill: #3d3780;\n    stroke: #00d977; }\n  :host-context(.nb-theme-cosmic) .temperature-bg {\n    position: absolute;\n    width: 88%;\n    height: 88%;\n    top: 13%;\n    left: 6%;\n    border-radius: 50%;\n    z-index: 1;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    border: 2px solid #342e73;\n    background-color: #322c72;\n    border: none; }\n  :host-context(.nb-theme-cosmic) .power-bg {\n    position: absolute;\n    width: 5.25rem;\n    height: 5.25rem;\n    background-color: #3d3780;\n    border-radius: 50%;\n    bottom: 2%;\n    left: 50%;\n    transform: translate(-50%, 50%);\n    z-index: 2;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    font-size: 3rem;\n    color: #ffffff;\n    border: 2px solid #342e73; }\n    :host-context(.nb-theme-cosmic) .power-bg:hover {\n      background-color: #463f92; }\n    :host-context(.nb-theme-cosmic) .power-bg:active {\n      background-color: #352f6e;\n      box-shadow: none; }\n    :host-context(.nb-theme-cosmic) .power-bg.off {\n      color: #a1a1e5;\n      text-shadow: none; }\n  :host-context(.nb-theme-cosmic) .circle {\n    fill: #ffffff;\n    stroke: #ffffff; }\n  :host-context(.nb-theme-cosmic) .power-bg {\n    border: none;\n    box-shadow: 0 8px 20px 0 rgba(40, 37, 89, 0.6);\n    text-shadow: 0 0 6px rgba(255, 255, 255, 0.5); }\n", ""]);

// exports


/***/ }),

/***/ 2083:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nb-theme-default) nb-tabset {\n  display: flex;\n  flex-direction: column;\n  height: 100%; }\n  :host-context(.nb-theme-default) nb-tabset /deep/ ul {\n    border: none; }\n\n:host-context(.nb-theme-default) nb-tab.content-active {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  position: relative;\n  height: 100%; }\n\n:host-context(.nb-theme-default) .slider-container {\n  display: flex;\n  flex: 1;\n  -ms-flex: 1 1 auto;\n  justify-content: center;\n  align-items: center; }\n\n:host-context(.nb-theme-default) ngx-temperature-dragger {\n  margin-top: -1.5rem;\n  width: 80%;\n  max-width: 300px; }\n\n:host-context(.nb-theme-default) .slider-value-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n  :host-context(.nb-theme-default) .slider-value-container .value {\n    position: relative;\n    color: #2a2a2a;\n    font-family: Exo;\n    font-size: 4rem;\n    font-weight: 500; }\n    :host-context(.nb-theme-default) .slider-value-container .value.temperature::before {\n      position: absolute;\n      content: '\\B0';\n      top: 0;\n      right: -1.25rem; }\n    :host-context(.nb-theme-default) .slider-value-container .value.humidity::before {\n      position: absolute;\n      content: '%';\n      bottom: 0.5rem;\n      right: -2.5rem;\n      color: #a4abb3;\n      font-size: 2.5rem;\n      font-weight: 300; }\n  :host-context(.nb-theme-default) .slider-value-container .desc {\n    color: #a4abb3;\n    font-weight: 300; }\n  :host-context(.nb-theme-default) .slider-value-container.off .value {\n    color: #a4abb3;\n    letter-spacing: 0.25rem;\n    padding-left: 0.5rem; }\n    :host-context(.nb-theme-default) .slider-value-container.off .value::before {\n      display: none; }\n  :host-context(.nb-theme-default) .slider-value-container.off .desc {\n    display: none; }\n\n:host-context(.nb-theme-default) .btn-group {\n  padding: 1.25rem;\n  justify-content: center; }\n\n:host-context(.nb-theme-default) .btn-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 4.5rem;\n  height: 4.5rem;\n  padding: 0;\n  margin-bottom: 0;\n  color: #a4abb3; }\n  :host-context(.nb-theme-default) .btn-icon.active {\n    border-color: #40dc7e;\n    color: #40dc7e; }\n  :host-context(.nb-theme-default) .btn-icon i {\n    font-size: 2.25rem;\n    line-height: 1; }\n\n@media (max-width: 575px) {\n  :host-context(.nb-theme-default) ngx-temperature-dragger {\n    max-width: 250px; }\n    :host-context(.nb-theme-default) ngx-temperature-dragger /deep/ .power-bg {\n      width: 4rem;\n      height: 4rem;\n      font-size: 3rem; }\n  :host-context(.nb-theme-default) .slider-value-container .value {\n    font-size: 3rem; }\n    :host-context(.nb-theme-default) .slider-value-container .value.humidity::before {\n      right: -2rem;\n      font-size: 2rem; } }\n\n@media (max-width: 399px) {\n  :host-context(.nb-theme-default) .btn-icon {\n    width: 3.25rem;\n    height: 3.25rem; }\n    :host-context(.nb-theme-default) .btn-icon i {\n      font-size: 1.75rem; }\n  :host-context(.nb-theme-default) nb-tabset /deep/ ul {\n    padding: 0 0.5rem; }\n    :host-context(.nb-theme-default) nb-tabset /deep/ ul a {\n      padding: 1.25rem 1rem; } }\n\n:host-context(.nb-theme-cosmic) nb-tabset {\n  display: flex;\n  flex-direction: column;\n  height: 100%; }\n  :host-context(.nb-theme-cosmic) nb-tabset /deep/ ul {\n    border: none; }\n\n:host-context(.nb-theme-cosmic) nb-tab.content-active {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  position: relative;\n  height: 100%; }\n\n:host-context(.nb-theme-cosmic) .slider-container {\n  display: flex;\n  flex: 1;\n  -ms-flex: 1 1 auto;\n  justify-content: center;\n  align-items: center; }\n\n:host-context(.nb-theme-cosmic) ngx-temperature-dragger {\n  margin-top: -1.5rem;\n  width: 80%;\n  max-width: 300px; }\n\n:host-context(.nb-theme-cosmic) .slider-value-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n  :host-context(.nb-theme-cosmic) .slider-value-container .value {\n    position: relative;\n    color: #ffffff;\n    font-family: Exo;\n    font-size: 4rem;\n    font-weight: 500; }\n    :host-context(.nb-theme-cosmic) .slider-value-container .value.temperature::before {\n      position: absolute;\n      content: '\\B0';\n      top: 0;\n      right: -1.25rem; }\n    :host-context(.nb-theme-cosmic) .slider-value-container .value.humidity::before {\n      position: absolute;\n      content: '%';\n      bottom: 0.5rem;\n      right: -2.5rem;\n      color: #a1a1e5;\n      font-size: 2.5rem;\n      font-weight: 300; }\n  :host-context(.nb-theme-cosmic) .slider-value-container .desc {\n    color: #a1a1e5;\n    font-weight: 300; }\n  :host-context(.nb-theme-cosmic) .slider-value-container.off .value {\n    color: #a1a1e5;\n    letter-spacing: 0.25rem;\n    padding-left: 0.5rem; }\n    :host-context(.nb-theme-cosmic) .slider-value-container.off .value::before {\n      display: none; }\n  :host-context(.nb-theme-cosmic) .slider-value-container.off .desc {\n    display: none; }\n\n:host-context(.nb-theme-cosmic) .btn-group {\n  padding: 1.25rem;\n  justify-content: center; }\n\n:host-context(.nb-theme-cosmic) .btn-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 4.5rem;\n  height: 4.5rem;\n  padding: 0;\n  margin-bottom: 0;\n  color: #a1a1e5; }\n  :host-context(.nb-theme-cosmic) .btn-icon.active {\n    border-color: #00f9a6;\n    color: #00f9a6; }\n  :host-context(.nb-theme-cosmic) .btn-icon i {\n    font-size: 2.25rem;\n    line-height: 1; }\n\n:host-context(.nb-theme-cosmic) .btn-icon.active {\n  color: #ffffff;\n  border-color: #00f9a6;\n  box-shadow: 0 2px 12px 0 rgba(0, 249, 166, 0.25);\n  background-color: rgba(0, 249, 166, 0.25); }\n\n@media (max-width: 575px) {\n  :host-context(.nb-theme-cosmic) ngx-temperature-dragger {\n    max-width: 250px; }\n    :host-context(.nb-theme-cosmic) ngx-temperature-dragger /deep/ .power-bg {\n      width: 4rem;\n      height: 4rem;\n      font-size: 3rem; }\n  :host-context(.nb-theme-cosmic) .slider-value-container .value {\n    font-size: 3rem; }\n    :host-context(.nb-theme-cosmic) .slider-value-container .value.humidity::before {\n      right: -2rem;\n      font-size: 2rem; } }\n\n@media (max-width: 399px) {\n  :host-context(.nb-theme-cosmic) .btn-icon {\n    width: 3.25rem;\n    height: 3.25rem; }\n    :host-context(.nb-theme-cosmic) .btn-icon i {\n      font-size: 1.75rem; }\n  :host-context(.nb-theme-cosmic) nb-tabset /deep/ ul {\n    padding: 0 0.5rem; }\n    :host-context(.nb-theme-cosmic) nb-tabset /deep/ ul a {\n      padding: 1.25rem 1rem; } }\n", ""]);

// exports


/***/ }),

/***/ 2084:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n:host-context(.nb-theme-default) nb-card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.675rem 0.5rem 0.5rem 1.25rem;\n  border: none; }\n\n:host-context(.nb-theme-default) nb-card-body {\n  overflow: hidden;\n  position: relative; }\n\n:host-context(.nb-theme-default) /deep/ canvas {\n  border-bottom-left-radius: 0.375rem;\n  border-bottom-right-radius: 0.375rem; }\n\n:host-context(.nb-theme-default) .echart {\n  position: absolute;\n  height: 100%;\n  width: 100%; }\n\n:host-context(.nb-theme-default) .dropdown {\n  min-width: 120px; }\n\n:host-context(.nb-theme-cosmic) nb-card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.675rem 0.5rem 0.5rem 1.25rem;\n  border: none; }\n\n:host-context(.nb-theme-cosmic) nb-card-body {\n  overflow: hidden;\n  position: relative; }\n\n:host-context(.nb-theme-cosmic) /deep/ canvas {\n  border-bottom-left-radius: 0.5rem;\n  border-bottom-right-radius: 0.5rem; }\n\n:host-context(.nb-theme-cosmic) .echart {\n  position: absolute;\n  height: 100%;\n  width: 100%; }\n\n:host-context(.nb-theme-cosmic) .dropdown {\n  min-width: 120px; }\n", ""]);

// exports


/***/ }),

/***/ 2085:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n:host-context(.nb-theme-default) nb-card {\n  background-image: none; }\n\n:host-context(.nb-theme-default) nb-card-body {\n  height: 100%;\n  padding: 2rem;\n  color: #a4abb3; }\n\n:host-context(.nb-theme-default) .location {\n  font-family: Exo;\n  font-size: 2.5rem;\n  font-weight: 400;\n  color: #2a2a2a; }\n\n:host-context(.nb-theme-default) .date {\n  font-family: Roboto;\n  font-size: 1.25rem;\n  line-height: 1.25rem;\n  font-weight: 300; }\n\n:host-context(.nb-theme-default) .daily-forecast {\n  display: flex;\n  flex-direction: column;\n  margin-top: -1.5rem; }\n  :host-context(.nb-theme-default) .daily-forecast .info {\n    display: flex;\n    justify-content: space-around; }\n    :host-context(.nb-theme-default) .daily-forecast .info .temperature {\n      font-size: 5rem;\n      font-weight: 500;\n      font-family: Exo;\n      color: #2a2a2a;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      margin-top: 2rem; }\n    :host-context(.nb-theme-default) .daily-forecast .info .icon {\n      font-size: 10rem;\n      line-height: 10rem;\n      color: #40dc7e; }\n  :host-context(.nb-theme-default) .daily-forecast .details {\n    display: flex;\n    justify-content: space-around; }\n    :host-context(.nb-theme-default) .daily-forecast .details .parameter {\n      display: flex;\n      flex-direction: column;\n      text-align: center; }\n      :host-context(.nb-theme-default) .daily-forecast .details .parameter .parameter-name {\n        font-family: Roboto;\n        font-size: 1.25rem;\n        font-weight: 300;\n        line-height: 2rem; }\n      :host-context(.nb-theme-default) .daily-forecast .details .parameter .parameter-value {\n        font-family: Exo;\n        color: #2a2a2a;\n        font-weight: 500; }\n\n:host-context(.nb-theme-default) .weekly-forecast {\n  display: flex;\n  justify-content: space-around;\n  margin-top: 2rem; }\n  :host-context(.nb-theme-default) .weekly-forecast .day {\n    display: flex;\n    flex-direction: column;\n    text-align: center; }\n    :host-context(.nb-theme-default) .weekly-forecast .day .caption {\n      text-transform: uppercase;\n      font-family: Exo;\n      color: #2a2a2a;\n      font-weight: 600;\n      font-size: 1.25rem; }\n    :host-context(.nb-theme-default) .weekly-forecast .day i {\n      font-size: 2.5rem;\n      line-height: 2.5rem; }\n    :host-context(.nb-theme-default) .weekly-forecast .day .temperature {\n      color: #2a2a2a;\n      font-family: Exo;\n      font-weight: 600;\n      font-size: 1.25rem; }\n\n@media (max-width: 399px) {\n  :host-context(.nb-theme-default) nb-card-body {\n    padding-left: 1rem;\n    padding-right: 1rem; } }\n\n:host-context(.nb-theme-cosmic) nb-card {\n  background-image: radial-gradient(circle at 50% 50%, #423f8c, #302c6e); }\n\n:host-context(.nb-theme-cosmic) nb-card-body {\n  height: 100%;\n  padding: 2rem;\n  color: #a1a1e5; }\n\n:host-context(.nb-theme-cosmic) .location {\n  font-family: Exo;\n  font-size: 2.5rem;\n  font-weight: 400;\n  color: #ffffff; }\n\n:host-context(.nb-theme-cosmic) .date {\n  font-family: Roboto;\n  font-size: 1.25rem;\n  line-height: 1.25rem;\n  font-weight: 300; }\n\n:host-context(.nb-theme-cosmic) .daily-forecast {\n  display: flex;\n  flex-direction: column;\n  margin-top: -1.5rem; }\n  :host-context(.nb-theme-cosmic) .daily-forecast .info {\n    display: flex;\n    justify-content: space-around; }\n    :host-context(.nb-theme-cosmic) .daily-forecast .info .temperature {\n      font-size: 5rem;\n      font-weight: 500;\n      font-family: Exo;\n      color: #ffffff;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      margin-top: 2rem; }\n    :host-context(.nb-theme-cosmic) .daily-forecast .info .icon {\n      font-size: 10rem;\n      line-height: 10rem;\n      color: #00d977;\n      color: #a1a1e5;\n      text-shadow: 0 3px 0 #665ebd, 0 4px 10px rgba(33, 7, 77, 0.5), 0 2px 10px #928dff; }\n  :host-context(.nb-theme-cosmic) .daily-forecast .details {\n    display: flex;\n    justify-content: space-around; }\n    :host-context(.nb-theme-cosmic) .daily-forecast .details .parameter {\n      display: flex;\n      flex-direction: column;\n      text-align: center; }\n      :host-context(.nb-theme-cosmic) .daily-forecast .details .parameter .parameter-name {\n        font-family: Roboto;\n        font-size: 1.25rem;\n        font-weight: 300;\n        line-height: 2rem; }\n      :host-context(.nb-theme-cosmic) .daily-forecast .details .parameter .parameter-value {\n        font-family: Exo;\n        color: #ffffff;\n        font-weight: 500; }\n\n:host-context(.nb-theme-cosmic) .weekly-forecast {\n  display: flex;\n  justify-content: space-around;\n  margin-top: 2rem; }\n  :host-context(.nb-theme-cosmic) .weekly-forecast .day {\n    display: flex;\n    flex-direction: column;\n    text-align: center; }\n    :host-context(.nb-theme-cosmic) .weekly-forecast .day .caption {\n      text-transform: uppercase;\n      font-family: Exo;\n      color: #ffffff;\n      font-weight: 600;\n      font-size: 1.25rem; }\n    :host-context(.nb-theme-cosmic) .weekly-forecast .day i {\n      font-size: 2.5rem;\n      line-height: 2.5rem; }\n    :host-context(.nb-theme-cosmic) .weekly-forecast .day .temperature {\n      color: #ffffff;\n      font-family: Exo;\n      font-weight: 600;\n      font-size: 1.25rem; }\n\n@media (max-width: 399px) {\n  :host-context(.nb-theme-cosmic) nb-card-body {\n    padding-left: 1rem;\n    padding-right: 1rem; } }\n", ""]);

// exports


/***/ }),

/***/ 2091:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(undefined);
// imports


// module
exports.push([module.i, ".full-width {\n  flex: 1;\n  min-width: 220px; }\n\nnb-checkbox {\n  margin-bottom: 1rem; }\n\n.form-inline > * {\n  margin: 0 1.5rem 1.5rem 0; }\n\nnb-card.inline-form-card nb-card-body {\n  padding-bottom: 0; }\n", ""]);

// exports


/***/ }),

/***/ 2333:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a242954570515ecdde9d2dfd5961e1c7.svg";

/***/ }),

/***/ 2334:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),

/***/ 2389:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-md-6 offset-md-3\">\r\n    <nb-card>\r\n      <nb-card-header>Thông tin phiếu xuất</nb-card-header>\r\n      <nb-card-body>\r\n        <form>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Số phiếu xuất</label>\r\n            <div class=\"col-sm-8\">\r\n              <input type=\"text\" [(ngModel)]=\"Sophieuxuat\" name=\"sophieuxuat\" class=\"form-control\" id=\"inputEmail1\" disabled>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputPassword2\" class=\"col-sm-3 col-form-label\">Ngày xuất</label>\r\n            <div class=\"col-sm-8\">\r\n              <div class=\"form-group\">\r\n                  <div class=\"input-group\">\r\n                    <input class=\"form-control\" placeholder=\"yyyy-mm-dd\"\r\n                          name=\"ngayxuat\" [(ngModel)]=\"Ngayxuat\" ngbDatepicker #d=\"ngbDatepicker\">\r\n                    <button class=\"btn btn-primary btn-icon\" (click)=\"d.toggle()\" type=\"button\">\r\n                      <i class=\"ion-calendar\"></i>\r\n                    </button>\r\n                  </div>\r\n                </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Nhân viên</label>\r\n            <div class=\"col-sm-8\">\r\n              <select [(ngModel)]=\"MaNV\" name=\"manv\" class=\"form-control\">\r\n                <option>Minsk</option>\r\n                <option>Gomel</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Khách hàng</label>\r\n            <div class=\"col-sm-8\">\r\n              <select [(ngModel)]=\"LoaiKH\" name=\"loaikh\" class=\"form-control\">\r\n                <option>Minsk</option>\r\n                <option>Gomel</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Bàn</label>\r\n            <div class=\"col-sm-8\">\r\n              <select [(ngModel)]=\"Maban\" name=\"Maban\" class=\"form-control\">\r\n                <option>Minsk</option>\r\n                <option>Gomel</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <hr>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Hàng</label>\r\n            <div class=\"col-sm-8\">\r\n              <select (change)=\"chonHang($event)\" class=\"form-control\">\r\n                    <option value=\"*\">Chọn mặt hàng</option>\r\n                    <option value=\"Cafe-15000\">Cafe - 15.000 VNĐ</option>\r\n                    <option value=\"Sữa-10000\">Sữa - 10.000 VNĐ</option>\r\n              </select>\r\n              <select multiple class=\"form-control\" (keyup.delete)=\"xoaHang($event)\">\r\n                    <option *ngFor=\"let i of hangs\" value=\"{{i.hang + '-' + i.soluong}}\">{{i.text}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <hr>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Tiền trả</label>\r\n            <div class=\"col-sm-8\">\r\n              <input type=\"number\" (change)=\"nhapTien()\" [(ngModel)]=\"TienTra\" name=\"TienTra\" class=\"form-control\" id=\"inputEmail1\" placeholder=\"Tiền trả\">\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Tiền dư</label>\r\n            <div class=\"col-sm-8\">\r\n              <input type=\"number\" [(ngModel)]=\"TienDu\" name=\"TienDu\" class=\"form-control\" id=\"inputEmail1\" disabled>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Thanh toán</label>\r\n            <div class=\"col-sm-8\">\r\n              <input type=\"text\" [(ngModel)]=\"Thanhtoan\" name=\"thanhtoan\" class=\"form-control\" id=\"inputEmail1\" disabled>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <div class=\"offset-sm-3 col-sm-9\">\r\n              <button class=\"btn btn-primary\" [disabled]=\"!isReady\" (click)=\"xuatPhieu()\">Xuất phiếu</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </nb-card-body>\r\n    </nb-card>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 2390:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" id=\"print-section\">\r\n  <div class=\"col-md-6 offset-md-3\">\r\n    <nb-card>\r\n      <nb-card-header>Chi tiết hóa đơn</nb-card-header>\r\n      <nb-card-body>\r\n        <form>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-5 col-form-label\">Số phiếu xuất:</label>\r\n            <div class=\"col-sm-7\">\r\n              <b>ABCDE</b>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputPassword2\" class=\"col-sm-5 col-form-label\">Ngày xuất:</label>\r\n            <div class=\"col-sm-7\">\r\n              <b>11/12/2017</b>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-5 col-form-label\">Nhân viên:</label>\r\n            <div class=\"col-sm-7\">\r\n              <b>Lê Văn Chương</b>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-5 col-form-label\">Khách hàng:</label>\r\n            <div class=\"col-sm-7\">\r\n              <b>Nguyễn Công Chính</b>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-5 col-form-label\">Bàn:</label>\r\n            <div class=\"col-sm-7\">\r\n              <b>5</b>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-5 col-form-label\">Hàng</label>\r\n            <div class=\"col-sm-7\">\r\n              <table border=\"1\">\r\n                <tr>\r\n                  <td>Hàng</td>\r\n                  <td>Giá</td>\r\n                </tr>\r\n                <tr>\r\n                  <td>Cafe</td>\r\n                  <td>15000 VNĐ</td>\r\n                </tr>\r\n              </table>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-5 col-form-label\">Tiền trả:</label>\r\n            <div class=\"col-sm-7\">\r\n              <b>15.000 VNĐ</b>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-5 col-form-label\">Tiền dư:</label>\r\n            <div class=\"col-sm-7\">\r\n              <b>5.000 VNĐ</b>\r\n            </div>\r\n          </div>\r\n          <hr>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-5 col-form-label\">Thanh toán</label>\r\n            <div class=\"col-sm-7\">\r\n              <b>10.000 VNĐ</b>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <div class=\"offset-sm-5 col-sm-9\">\r\n              <button (click)=\"print()\" class=\"btn btn-hero-secondary btn-demo\"><i class=\"ion-printer\"></i></button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </nb-card-body>\r\n    </nb-card>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 2391:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-md-6 offset-md-3\">\r\n    <nb-card>\r\n      <nb-card-header>Cập nhật giá bán</nb-card-header>\r\n      <nb-card-body>\r\n        <form>\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-sm-3\">Hàng</label>\r\n            <div class=\"col-sm-9\">\r\n              <select class=\"form-control\">\r\n                <option>A</option>\r\n                <option>B</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-sm-3\">Loại khách hàng</label>\r\n            <div class=\"col-sm-9\">\r\n              <select class=\"form-control\">\r\n                <option>A</option>\r\n                <option>B</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Giá bán</label>\r\n            <div class=\"col-sm-9\">\r\n              <input type=\"number\" class=\"form-control\" id=\"inputEmail1\" placeholder=\"Giá bán...\">\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <div class=\"offset-sm-3 col-sm-9\">\r\n              <button type=\"submit\" class=\"btn btn-primary\">Cập nhật</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </nb-card-body>\r\n    </nb-card>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ 2399:
/***/ (function(module, exports) {

module.exports = "<nb-card [size]=\"breakpoint.width >= breakpoints.xxxl || breakpoint.width < breakpoints.md ? 'large' : 'xlarge'\">\r\n  <nb-tabset fullWidth>\r\n    <nb-tab tabTitle=\"Contacts\">\r\n      <div class=\"contact\" *ngFor=\"let c of contacts\">\r\n        <nb-user [picture]=\"c.user.picture\" [name]=\"c.user.name\" [title]=\"c.type\" size=\"large\"></nb-user>\r\n        <i class=\"i-contact nb-phone\"></i>\r\n      </div>\r\n    </nb-tab>\r\n    <nb-tab tabTitle=\"Recent\">\r\n      <div class=\"contact\" *ngFor=\"let c of recent\">\r\n        <nb-user [picture]=\"c.user.picture\" [name]=\"c.user.name\" [title]=\"c.type\" size=\"large\"></nb-user>\r\n        <span class=\"time\">{{ c.time }}</span>\r\n      </div>\r\n    </nb-tab>\r\n  </nb-tabset>\r\n</nb-card>\r\n"

/***/ }),

/***/ 2400:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-xxxl-3 col-md-6\">\r\n    <ngx-status-card title=\"Light\" type=\"primary\" (click)=\"toggleTheme(theme.on)\" #theme>\r\n      <i class=\"nb-lightbulb\"></i>\r\n    </ngx-status-card>\r\n  </div>\r\n\r\n  <div class=\"col-xxxl-3 col-md-6\">\r\n    <ngx-status-card title=\"Roller Shades\" type=\"success\">\r\n      <i class=\"nb-roller-shades\"></i>\r\n    </ngx-status-card>\r\n  </div>\r\n\r\n  <div class=\"col-xxxl-3 col-md-6\">\r\n    <ngx-status-card title=\"Wireless Audio\" type=\"info\">\r\n      <i class=\"nb-audio\"></i>\r\n    </ngx-status-card>\r\n  </div>\r\n\r\n  <div class=\"col-xxxl-3 col-md-6\">\r\n    <ngx-status-card title=\"Coffee Maker\" type=\"warning\">\r\n      <i class=\"nb-coffee-maker\"></i>\r\n    </ngx-status-card>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-xxxl-3 col-xxl-4 col-lg-5 col-md-6\">\r\n    <ngx-temperature></ngx-temperature>\r\n  </div>\r\n\r\n  <div class=\"col-xxxl-9 col-xxl-8 col-lg-7 col-md-6\">\r\n    <ngx-electricity></ngx-electricity>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-xxxl-9 col-xl-12\">\r\n    <ngx-rooms></ngx-rooms>\r\n  </div>\r\n\r\n  <div class=\"col-xxxl-3 col-xxl-4 col-lg-7 col-md-6\">\r\n    <ngx-contacts></ngx-contacts>\r\n  </div>\r\n\r\n  <div class=\"col-xxxl-3 col-xxl-4 col-lg-5 col-md-6\">\r\n    <ngx-solar [chartValue]=\"72\"></ngx-solar>\r\n\r\n    <ngx-kitten></ngx-kitten>\r\n  </div>\r\n\r\n  <div class=\"col-xxxl-3 col-xxl-4 col-md-5\">\r\n    <ngx-traffic></ngx-traffic>\r\n    <ngx-weather></ngx-weather>\r\n  </div>\r\n\r\n  <div class=\"col-xxxl-6 col-xxl-12 col-md-7\">\r\n    <ngx-security-cameras></ngx-security-cameras>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 2401:
/***/ (function(module, exports) {

module.exports = "<nb-card size=\"large\">\r\n  <div class=\"consumption-table\">\r\n    <div class=\"table-header\">\r\n      <div>Electricity</div>\r\n      <div class=\"subtitle\">Consumption</div>\r\n    </div>\r\n\r\n    <nb-tabset fullWidth>\r\n      <nb-tab *ngFor=\"let year of data\" [tabTitle]=\"year.title\" [active]=\"year.active\">\r\n        <div class=\"stats-month\" *ngFor=\"let month of year.months\">\r\n          <div>\r\n            <span class=\"month\">{{ month.month }}</span>\r\n            <span class=\"delta\" [ngClass]=\"{ 'down': month.down }\">{{ month.delta }}</span>\r\n          </div>\r\n          <div class=\"results\">\r\n            <b>{{ month.kWatts }}</b> kWh / <b>{{ month.cost }}</b> USD\r\n          </div>\r\n        </div>\r\n      </nb-tab>\r\n    </nb-tabset>\r\n  </div>\r\n\r\n  <div class=\"chart-container\">\r\n    <div class=\"chart-header\">\r\n      <div class=\"header-stats\">\r\n        <div class=\"stats-block\">\r\n          <div class=\"subtitle\">Consumed</div>\r\n          <div>\r\n            <span class=\"value\">816</span>\r\n            <span class=\"unit\">kWh</span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"stats-block\">\r\n          <div class=\"subtitle\">Spent</div>\r\n          <div>\r\n            <span class=\"value\">291</span>\r\n            <span class=\"unit\">USD</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div ngbDropdown>\r\n        <button type=\"button\" ngbDropdownToggle class=\"btn\"\r\n                [ngClass]=\"{ 'btn-outline-success': currentTheme == 'default', 'btn-primary': currentTheme != 'default'}\">\r\n          {{ type }}\r\n        </button>\r\n        <ul class=\"dropdown-menu\">\r\n          <li class=\"dropdown-item\" *ngFor=\"let t of types\" (click)=\"type = t\">{{ t }}</li>\r\n        </ul>\r\n      </div>\r\n\r\n    </div>\r\n    <ngx-electricity-chart></ngx-electricity-chart>\r\n  </div>\r\n</nb-card>\r\n"

/***/ }),

/***/ 2402:
/***/ (function(module, exports) {

module.exports = "<nb-card size=\"medium\">\r\n  <nb-card-body>\r\n    <div class=\"picture\" style.background-image=\"url('assets/images/kitten-{{currentTheme}}.png')\"></div>\r\n\r\n    <div class=\"details\">\r\n      <div class=\"title\">\r\n        React Native UI Kitten\r\n      </div>\r\n      <div class=\"description\">\r\n        React Native UI Kitten is a framework that contains a set of commonly used UI components styled in a similar way. The most awesome thing: you can change themes on the fly by just passing a different set of variables. 100% native. Give our kitten a try!\r\n      </div>\r\n    </div>\r\n  </nb-card-body>\r\n\r\n\r\n  <nb-card-footer>\r\n    <a href=\"https://akveo.github.io/react-native-ui-kitten\" target=\"_blank\">\r\n      <i class=\"ion-ios-world\"></i>\r\n    </a>\r\n    <a href=\"https://itunes.apple.com/us/app/kitten-tricks/id1246143230\" target=\"_blank\">\r\n      <i class=\"ion-social-apple\"></i>\r\n    </a>\r\n    <a href=\"https://play.google.com/store/apps/details?id=com.akveo.kittenTricks\" target=\"_blank\">\r\n      <i class=\"ion-social-android\"></i>\r\n    </a>\r\n    <a href=\"https://github.com/akveo/react-native-ui-kitten\" target=\"_blank\">\r\n      <i class=\"ion-social-github\"></i>\r\n    </a>\r\n  </nb-card-footer>\r\n</nb-card>\r\n"

/***/ }),

/***/ 2403:
/***/ (function(module, exports) {

module.exports = "<div class=\"header\">My Playlist</div>\r\n\r\n<div class=\"body\">\r\n\r\n  <div class=\"track-info\">\r\n    <div class=\"cover\" style.background-image=\"url('{{track.cover}}')\"></div>\r\n    <div class=\"details\">\r\n      <h4>{{ track.name }}</h4>\r\n      <span>{{ track.artist }}</span>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"progress-wrap\">\r\n    <input type=\"range\" class=\"progress\" [value]=\"getProgress()\" min=\"0\" max=\"100\" step=\"0.01\"\r\n           (input)=\"setProgress(duration.value)\" #duration>\r\n    <div class=\"progress-foreground\" [style.width.%]=\"getProgress()\"></div>\r\n  </div>\r\n\r\n  <div class=\"timing\">\r\n    <small class=\"current\">{{ player.currentTime | timing }}</small>\r\n    <small class=\"remaining\">- {{ player.duration - player.currentTime | timing }}</small>\r\n  </div>\r\n\r\n  <div class=\"controls\">\r\n    <i class=\"nb-shuffle shuffle\" [class.active]=\"shuffle\" (click)=\"toggleShuffle()\"></i>\r\n    <i class=\"nb-skip-backward prev\" (click)=\"prev()\"></i>\r\n    <i class=\"play\" [class.nb-play]=\"player.paused\" [class.nb-pause]=\"!player.paused\" (click)=\"playPause()\"></i>\r\n    <i class=\"nb-skip-forward next\" (click)=\"next()\"></i>\r\n    <i class=\"nb-loop loop\" [class.active]=\"player.loop\" (click)=\"toggleLoop()\"></i>\r\n  </div>\r\n\r\n</div>\r\n\r\n<div class=\"footer\">\r\n\r\n  <div class=\"volume\">\r\n    <i class=\"nb-volume-mute\"></i>\r\n    <div class=\"progress-wrap\">\r\n      <input type=\"range\" class=\"progress\" [value]=\"getVolume()\" max=\"100\"\r\n             (input)=\"setVolume(volume.value)\" #volume>\r\n      <div class=\"progress-foreground\" [style.width.%]=\"getVolume()\"></div>\r\n    </div>\r\n    <i class=\"nb-volume-high\"></i>\r\n  </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ 2404:
/***/ (function(module, exports) {

module.exports = "<div class=\"header\">Room Management</div>\r\n<div class=\"room-selector\">\r\n  <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\r\n       [attr.viewBox]=\"viewBox\" preserveAspectRatio=\"xMidYMid\">\r\n    <defs>\r\n\r\n      <filter id=\"f2\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\">\r\n        <feGaussianBlur result=\"blurOut\" in=\"StrokePaint\" stdDeviation=\"3\"/>\r\n      </filter>\r\n\r\n      <pattern id=\"New_Pattern_Swatch_1\" data-name=\"New Pattern Swatch 1\" width=\"60\" height=\"60\"\r\n               patternUnits=\"userSpaceOnUse\" viewBox=\"0 0 60 60\">\r\n        <line class=\"stroke-pattern\" x1=\"-113.26\" y1=\"123.26\" x2=\"3.26\" y2=\"6.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-103.26\" y1=\"133.26\" x2=\"13.26\" y2=\"16.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-93.26\" y1=\"143.26\" x2=\"23.26\" y2=\"26.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-83.26\" y1=\"153.26\" x2=\"33.26\" y2=\"36.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-73.26\" y1=\"163.26\" x2=\"43.26\" y2=\"46.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-63.26\" y1=\"173.26\" x2=\"53.26\" y2=\"56.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-53.26\" y1=\"123.26\" x2=\"63.26\" y2=\"6.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-43.26\" y1=\"133.26\" x2=\"73.26\" y2=\"16.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-33.26\" y1=\"143.26\" x2=\"83.26\" y2=\"26.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-23.26\" y1=\"153.26\" x2=\"93.26\" y2=\"36.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-13.26\" y1=\"163.26\" x2=\"103.26\" y2=\"46.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-3.26\" y1=\"173.26\" x2=\"113.26\" y2=\"56.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"6.74\" y1=\"123.26\" x2=\"123.26\" y2=\"6.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"16.74\" y1=\"133.26\" x2=\"133.26\" y2=\"16.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"26.74\" y1=\"143.26\" x2=\"143.26\" y2=\"26.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"36.74\" y1=\"153.26\" x2=\"153.26\" y2=\"36.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"46.74\" y1=\"163.26\" x2=\"163.26\" y2=\"46.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"56.74\" y1=\"173.26\" x2=\"173.26\" y2=\"56.74\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-113.26\" y1=\"63.26\" x2=\"3.26\" y2=\"-53.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-103.26\" y1=\"73.26\" x2=\"13.26\" y2=\"-43.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-93.26\" y1=\"83.26\" x2=\"23.26\" y2=\"-33.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-83.26\" y1=\"93.26\" x2=\"33.26\" y2=\"-23.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-73.26\" y1=\"103.26\" x2=\"43.26\" y2=\"-13.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-63.26\" y1=\"113.26\" x2=\"53.26\" y2=\"-3.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-53.26\" y1=\"63.26\" x2=\"63.26\" y2=\"-53.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-43.26\" y1=\"73.26\" x2=\"73.26\" y2=\"-43.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-33.26\" y1=\"83.26\" x2=\"83.26\" y2=\"-33.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-23.26\" y1=\"93.26\" x2=\"93.26\" y2=\"-23.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-13.26\" y1=\"103.26\" x2=\"103.26\" y2=\"-13.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-3.26\" y1=\"113.26\" x2=\"113.26\" y2=\"-3.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"6.74\" y1=\"63.26\" x2=\"123.26\" y2=\"-53.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"16.74\" y1=\"73.26\" x2=\"133.26\" y2=\"-43.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"26.74\" y1=\"83.26\" x2=\"143.26\" y2=\"-33.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"36.74\" y1=\"93.26\" x2=\"153.26\" y2=\"-23.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"46.74\" y1=\"103.26\" x2=\"163.26\" y2=\"-13.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"56.74\" y1=\"113.26\" x2=\"173.26\" y2=\"-3.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-113.26\" y1=\"3.26\" x2=\"3.26\" y2=\"-113.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-103.26\" y1=\"13.26\" x2=\"13.26\" y2=\"-103.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-93.26\" y1=\"23.26\" x2=\"23.26\" y2=\"-93.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-83.26\" y1=\"33.26\" x2=\"33.26\" y2=\"-83.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-73.26\" y1=\"43.26\" x2=\"43.26\" y2=\"-73.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-63.26\" y1=\"53.26\" x2=\"53.26\" y2=\"-63.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-53.26\" y1=\"3.26\" x2=\"63.26\" y2=\"-113.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-43.26\" y1=\"13.26\" x2=\"73.26\" y2=\"-103.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-33.26\" y1=\"23.26\" x2=\"83.26\" y2=\"-93.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-23.26\" y1=\"33.26\" x2=\"93.26\" y2=\"-83.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-13.26\" y1=\"43.26\" x2=\"103.26\" y2=\"-73.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"-3.26\" y1=\"53.26\" x2=\"113.26\" y2=\"-63.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"6.74\" y1=\"3.26\" x2=\"123.26\" y2=\"-113.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"16.74\" y1=\"13.26\" x2=\"133.26\" y2=\"-103.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"26.74\" y1=\"23.26\" x2=\"143.26\" y2=\"-93.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"36.74\" y1=\"33.26\" x2=\"153.26\" y2=\"-83.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"46.74\" y1=\"43.26\" x2=\"163.26\" y2=\"-73.26\"/>\r\n        <line class=\"stroke-pattern\" x1=\"56.74\" y1=\"53.26\" x2=\"173.26\" y2=\"-63.26\"/>\r\n      </pattern>\r\n    </defs>\r\n\r\n    <g>\r\n      <path class=\"room-border\" [attr.d]=\"border.d\" *ngFor=\"let border of roomSvg.borders\" />\r\n    </g>\r\n\r\n    <g>\r\n      <path class=\"stroked-element\" [attr.d]=\"strokedArea.d\" *ngFor=\"let strokedArea of roomSvg.stokedAreas\"/>\r\n    </g>\r\n\r\n    <g [attr.id]=\"room.id\" [class.selected-room]=\"selectedRoom == room.id\" *ngFor=\"let room of sortedRooms\">\r\n      <path class=\"room-bg\" (click)=\"selectRoom(room.id)\" [attr.d]=\"room.area.d\" [style.filter]=\"isIE || isFirefox ? 'inherit': ''\" />\r\n      <path class=\"room-border\" [attr.d]=\"room.border.d\" />\r\n      <path class=\"room-border room-border-glow\" [attr.d]=\"room.border.d\" [style.filter]=\"isIE || isFirefox ? 'inherit': ''\" />\r\n      <text class=\"room-text\" (click)=\"selectRoom(room.id)\" text-anchor=\"middle\"\r\n            [attr.x]=\"room.name.x\" [attr.y]=\"room.name.y\">{{room.name.text}}</text>\r\n    </g>\r\n  </svg>\r\n</div>\r\n"

/***/ }),

/***/ 2405:
/***/ (function(module, exports) {

module.exports = "<nb-card size=\"xlarge\">\r\n  <nb-card-header>\r\n    <div class=\"cameras-card-header\">\r\n      <span class=\"cameras-card-title\">Security Cameras</span>\r\n      <span class=\"cameras-filter\">\r\n        <a [class.active]=\"isSingleView\" (click)=\"isSingleView = true\">\r\n          <i class=\"nb-square\"></i>\r\n        </a>\r\n        <a [class.active]=\"!isSingleView\" (click)=\"isSingleView = false\">\r\n          <i class=\"nb-grid-a\"></i>\r\n        </a>\r\n      </span>\r\n    </div>\r\n  </nb-card-header>\r\n  <nb-card-body>\r\n    <div class=\"cameras single-view\" *ngIf=\"isSingleView\">\r\n      <div class=\"camera\" [style.background-image]=\"'url(' + selectedCamera.source + ')'\">\r\n        <span>{{ selectedCamera.title }}</span>\r\n      </div>\r\n    </div>\r\n    <div class=\"cameras\" *ngIf=\"!isSingleView\">\r\n      <div class=\"camera col-sm-6\" *ngFor=\"let camera of cameras\" [style.background-image]=\"'url(' + camera.source + ')'\"\r\n           (click)=\"selectCamera(camera)\">\r\n        <span>{{ camera.title }}</span>\r\n      </div>\r\n    </div>\r\n  </nb-card-body>\r\n  <nb-card-footer>\r\n    <nb-actions size=\"medium\" fullWidth>\r\n      <nb-action>\r\n        <i class=\"nb-pause-outline\"></i><span>Pause</span>\r\n      </nb-action>\r\n      <nb-action>\r\n        <i class=\"nb-list\"></i><span>Logs</span>\r\n      </nb-action>\r\n      <nb-action>\r\n        <i class=\"nb-search\"></i><span>Search</span>\r\n      </nb-action>\r\n      <nb-action>\r\n        <i class=\"nb-gear\"></i><span>Setup</span>\r\n      </nb-action>\r\n    </nb-actions>\r\n  </nb-card-footer>\r\n</nb-card>\r\n"

/***/ }),

/***/ 2406:
/***/ (function(module, exports) {

module.exports = "<nb-card size=\"medium\">\r\n  <div class=\"team-photo\">\r\n    <a href=\"mailto:contact@akveo.com\">\r\n      <button type=\"button\" class=\"btn btn-success btn-icon team-link\">\r\n        <i class=\"ion-paper-airplane\"></i>\r\n      </button>\r\n    </a>\r\n  </div>\r\n\r\n  <div class=\"team-info\">\r\n    <div class=\"team-title\">\r\n      <h2>Akveo Team</h2>\r\n    </div>\r\n    <div class=\"team-subtitle\">Design & Development</div>\r\n    <div class=\"team-bio\">\r\n      We're small team of fullstack software experts. We're crazy about creation of modern and secure software. We help to make\r\n      your product amazing.\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"links\">\r\n    <a href=\"https://www.akveo.com\" target=\"_blank\">\r\n      <i class=\"ion-ios-world-outline\"></i>\r\n    </a>\r\n    <a href=\"https://www.facebook.com/akveo\" target=\"_blank\">\r\n      <i class=\"ion-social-facebook\"></i>\r\n    </a>\r\n    <a href=\"https://twitter.com/akveo_inc\" target=\"_blank\">\r\n      <i class=\"ion-social-twitter\"></i>\r\n    </a>\r\n    <a href=\"https://github.com/akveo\" target=\"_blank\">\r\n      <i class=\"ion-social-github\"></i>\r\n    </a>\r\n  </div>\r\n</nb-card>\r\n"

/***/ }),

/***/ 2407:
/***/ (function(module, exports) {

module.exports = "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQMAAABDsxw2AAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAACJJREFUaN7twTEBAAAAwiD7pzbFPmAAAAAAAAAAAAAAAGQOLbQAAU3zwM4AAAAASUVORK5CYII=\">\r\n\r\n<div class=\"svg-container\">\r\n  <svg #svgRoot xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\"\r\n       [attr.viewBox]=\"styles.viewBox\" preserveAspectRatio=\"xMinYMin meet\" (mousedown)=\"mouseDown($event)\">\r\n    <defs>\r\n\r\n      <filter [attr.id]=\"'blurFilter' + svgControlId\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">\r\n        <feGaussianBlur in=\"SourceGraphic\" [attr.stdDeviation]=\"styles.blurRadius\" />\r\n        <feComponentTransfer>\r\n          <feFuncA type=\"discrete\" tableValues=\"1 1\"/>\r\n        </feComponentTransfer>\r\n      </filter>\r\n\r\n      <clipPath [attr.id]=\"'sliderClip' + svgControlId\">\r\n        <path [attr.d]=\"styles.clipPathStr\" stroke=\"black\"></path>\r\n      </clipPath>\r\n\r\n    </defs>\r\n    <g [attr.transform]=\"styles.arcTranslateStr\">\r\n\r\n      <g class=\"toClip\" [attr.clip-path]=\"'url(#sliderClip' + svgControlId +')'\">\r\n        <g class=\"toFilter\" [attr.filter]=\"'url(#blurFilter' + svgControlId +')'\">\r\n          <path [attr.d]=\"arc.d\" [attr.fill]=\"arc.color\" *ngFor=\"let arc of styles.gradArcs\"></path>\r\n        </g>\r\n        <!-- ngFor is a quirk fix for webkit rendering issues -->\r\n        <path [attr.d]=\"styles.nonSelectedArc.d\" [attr.fill]=\"styles.nonSelectedArc.color\" *ngFor=\"let number of [0,1,2,3,4,5]\"></path>\r\n      </g>\r\n\r\n      <circle [attr.cx]=\"styles.thumbPosition.x\" [attr.cy]=\"styles.thumbPosition.y\" [attr.r]=\"pinRadius\"\r\n              [attr.stroke-width]=\"thumbBorder / scaleFactor\" class=\"circle\"></circle>\r\n    </g>\r\n  </svg>\r\n</div>\r\n\r\n<div class=\"temperature-bg\">\r\n  <ng-content></ng-content>\r\n</div>\r\n\r\n<div class=\"power-bg\" [ngClass]=\"{'off': off}\" (click)=\"switchPower()\">\r\n  <i class=\"nb-power-circled\"></i>\r\n</div>\r\n"

/***/ }),

/***/ 2408:
/***/ (function(module, exports) {

module.exports = "<nb-card size=\"large\">\r\n  <nb-tabset fullWidth>\r\n\r\n    <nb-tab tabTitle=\"Temperature\">\r\n\r\n      <div class=\"slider-container\">\r\n        <ngx-temperature-dragger [(value)]=\"temperature\" (power)=\"temperatureOff = !$event\"\r\n                                 [min]=\"12\" [max]=\"30\" [disableArcColor]=\"colors.layoutBg\"\r\n                                 [fillColors]=\"colors.temperature\">\r\n\r\n          <div class=\"slider-value-container\"  [ngClass]=\"{ 'off': temperatureOff }\">\r\n            <div class=\"value temperature\">\r\n              {{ temperatureOff ? '--' : (temperature | ngxRound) }}\r\n            </div>\r\n            <div class=\"desc\">\r\n              Celsius\r\n            </div>\r\n          </div>\r\n        </ngx-temperature-dragger>\r\n      </div>\r\n\r\n      <div [(ngModel)]=\"temperatureMode\" ngbRadioGroup data-toggle=\"buttons\"\r\n           class=\"btn-group btn-divided-group btn-outline-divided-group btn-group-full-width\">\r\n        <label class=\"btn btn-icon\">\r\n          <input type=\"radio\" value=\"cool\"/><i class=\"nb-snowy-circled\"></i>\r\n        </label>\r\n        <label class=\"btn btn-icon\">\r\n          <input type=\"radio\" value=\"warm\"/><i class=\"nb-sunny-circled\"></i>\r\n        </label>\r\n        <label class=\"btn btn-icon\">\r\n          <input type=\"radio\" value=\"heat\"/><i class=\"nb-flame-circled\"></i>\r\n        </label>\r\n        <label class=\"btn btn-icon\">\r\n          <input type=\"radio\" value=\"fan\"/><i class=\"nb-loop-circled\"></i>\r\n        </label>\r\n      </div>\r\n    </nb-tab>\r\n\r\n    <nb-tab tabTitle=\"Humidity\">\r\n\r\n      <div class=\"slider-container\">\r\n        <ngx-temperature-dragger [(value)]=\"humidity\" (power)=\"humidityOff = !$event\"\r\n                                 [min]=\"0\" [max]=\"100\" [disableArcColor]=\"colors.layoutBg\"\r\n                                 [fillColors]=\"colors.temperature\">\r\n\r\n          <div class=\"slider-value-container\"  [ngClass]=\"{ 'off': humidityOff }\">\r\n            <div class=\"value humidity\">\r\n              {{ humidityOff ? '--' : (humidity | ngxRound) }}\r\n            </div>\r\n          </div>\r\n        </ngx-temperature-dragger>\r\n      </div>\r\n\r\n      <div [(ngModel)]=\"humidityMode\" ngbRadioGroup data-toggle=\"buttons\"\r\n           class=\"btn-group btn-divided-group btn-outline-divided-group btn-group-full-width\">\r\n        <label class=\"btn btn-icon\">\r\n          <input type=\"radio\" value=\"cool\"/><i class=\"nb-snowy-circled\"></i>\r\n        </label>\r\n        <label class=\"btn btn-icon\">\r\n          <input type=\"radio\" value=\"warm\"/><i class=\"nb-sunny-circled\"></i>\r\n        </label>\r\n        <label class=\"btn btn-icon\">\r\n          <input type=\"radio\" value=\"heat\"/><i class=\"nb-flame-circled\"></i>\r\n        </label>\r\n        <label class=\"btn btn-icon\">\r\n          <input type=\"radio\" value=\"fan\"/><i class=\"nb-loop-circled\"></i>\r\n        </label>\r\n      </div>\r\n    </nb-tab>\r\n  </nb-tabset>\r\n</nb-card>\r\n"

/***/ }),

/***/ 2409:
/***/ (function(module, exports) {

module.exports = "<nb-card size=\"medium\">\r\n  <nb-card-body>\r\n    <div class=\"location\">\r\n      <span>New York</span>\r\n    </div>\r\n    <div class=\"date\">\r\n      <span>Mon 29 May</span>\r\n    </div>\r\n    <div class=\"daily-forecast\">\r\n      <div class=\"info\">\r\n        <div class=\"temperature\">\r\n          <span>20&deg;</span>\r\n        </div>\r\n        <div class=\"icon\">\r\n          <i class=\"ion-ios-sunny-outline\"></i>\r\n        </div>\r\n      </div>\r\n      <div class=\"details\">\r\n        <div class=\"parameter\">\r\n          <span class=\"parameter-name\">max</span>\r\n          <span class=\"parameter-value\">23&deg;</span>\r\n        </div>\r\n        <div class=\"parameter\">\r\n          <span class=\"parameter-name\">min</span>\r\n          <span class=\"parameter-value\">19&deg;</span>\r\n        </div>\r\n        <div class=\"parameter\">\r\n          <span class=\"parameter-name\">wind</span>\r\n          <span class=\"parameter-value\">4 km/h</span>\r\n        </div>\r\n        <div class=\"parameter\">\r\n          <span class=\"parameter-name\">hum</span>\r\n          <span class=\"parameter-value\">87%</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"weekly-forecast\">\r\n      <div class=\"day\">\r\n        <span class=\"caption\">Sun</span>\r\n        <i class=\"ion-ios-cloudy-outline\"></i>\r\n        <span class=\"temperature\">17&deg;</span>\r\n      </div>\r\n      <div class=\"day\">\r\n        <span class=\"caption\">Mon</span>\r\n        <i class=\"ion-ios-sunny-outline\"></i>\r\n        <span class=\"temperature\">19&deg;</span>\r\n      </div>\r\n      <div class=\"day\">\r\n        <span class=\"caption\">Tue</span>\r\n        <i class=\"ion-ios-rainy-outline\"></i>\r\n        <span class=\"temperature\">22&deg;</span>\r\n      </div>\r\n      <div class=\"day\">\r\n        <span class=\"caption\">Wed</span>\r\n        <i class=\"ion-ios-partlysunny-outline\"></i>\r\n        <span class=\"temperature\">21&deg;</span>\r\n      </div>\r\n    </div>\r\n  </nb-card-body>\r\n</nb-card>\r\n"

/***/ }),

/***/ 2412:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-md-6 offset-md-3\">\r\n    <nb-card>\r\n      <nb-card-header>Phiếu nhập hàng</nb-card-header>\r\n      <nb-card-body>\r\n        <form>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputEmail1\" class=\"col-sm-3 col-form-label\">Số phiếu nhập</label>\r\n            <div class=\"col-sm-9\">\r\n              <input type=\"email\" class=\"form-control\" id=\"inputEmail1\" placeholder=\"Email\">\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label for=\"inputPassword2\" class=\"col-sm-3 col-form-label\">Ngày nhập</label>\r\n            <div class=\"col-sm-9\">\r\n              <form class=\"form-inline\">\r\n                <div class=\"form-group\">\r\n                  <div class=\"input-group\">\r\n                    <input class=\"form-control\" placeholder=\"yyyy-mm-dd\"\r\n                           name=\"dp\" [(ngModel)]=\"model\" ngbDatepicker #d=\"ngbDatepicker\">\r\n                    <button class=\"input-group-addon btn btn-primary btn-icon\" (click)=\"d.toggle()\" type=\"button\">\r\n                      <i style=\"color:#ffffff;\" class=\"ion-calendar\"></i>\r\n                    </button>\r\n                  </div>\r\n                </div>\r\n              </form>              \r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-sm-3\">Mã nhân viên</label>\r\n            <div class=\"col-sm-9\">\r\n              <select class=\"form-control\">\r\n                <option>A</option>\r\n                <option>B</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-sm-3\">Hàng</label>\r\n            <div class=\"col-sm-9\">\r\n              <button (click)=\"nhapHang()\" class=\"btn btn-info\"><i class=\"ion-plus-round\"></i></button>\r\n              <select multiple class=\"form-control\">\r\n                <option *ngFor=\"let i of hangs\">{{i}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <label class=\"col-sm-3\">Ghi chú</label>\r\n            <div class=\"col-sm-9\">\r\n              <textarea class=\"form-control\" placeholder=\"Text Area\" rows=\"5\"></textarea>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group row\">\r\n            <div class=\"offset-sm-3 col-sm-9\">\r\n              <button type=\"submit\" class=\"btn btn-primary\">Nhập kho</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </nb-card-body>\r\n    </nb-card>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ 2665:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2061);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2666:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2062);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2667:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2063);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2674:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2070);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2675:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2071);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2676:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2072);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2677:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2073);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2678:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2074);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2679:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2075);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2680:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2076);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2681:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2077);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2682:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2078);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2683:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2079);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2684:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2080);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2685:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2081);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2686:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2082);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2687:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2083);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2688:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2085);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 2694:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(2091);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ })

});
//# sourceMappingURL=5.chunk.js.map