"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var event_service_1 = require("../../services/event/event.service");
var ExcelComponent = /** @class */ (function () {
    function ExcelComponent(eventService) {
        var _this = this;
        this.eventService = eventService;
        this.eventService.Register("excel", function (exportInfo) {
            _this.excelExport(exportInfo.dataSource, exportInfo.fileName);
        });
    }
    ExcelComponent.prototype.createExportHeader = function (dataSource, separator) {
        var headerRow = "", columns = dataSource.columns, newLine = "\r\n";
        for (var i = 0; i < columns.length; i++) {
            headerRow += (i > 0 ? separator : '') + (columns[i].displayName || '');
        }
        return headerRow + newLine;
    };
    ExcelComponent.prototype.createExportRows = function (dataSource, separator) {
        var content = "", columns = dataSource.columns, data = dataSource.data, newLine = "\r\n", dataField;
        for (var j = 0; j < data.length; j++) {
            for (var i = 0; i < columns.length; i++) {
                dataField = columns[i].dataField || '';
                content += (i > 0 ? separator : '') + (data[j][dataField] || '');
            }
            content += newLine;
        }
        return content;
    };
    ExcelComponent.prototype.excelExport = function (dataSource, fileName) {
        var separator = ',';
        var content = this.createExportHeader(dataSource, separator);
        content += this.createExportRows(dataSource, separator);
        // An anchor html element on the page (or create dynamically one)
        // to use its download attribute to set filename
        var a = document.getElementById('csv');
        a.textContent = 'download';
        a.download = fileName + ".csv";
        a.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(content);
        a.click();
    };
    ExcelComponent = __decorate([
        core_1.Component({
            selector: 'excel',
            templateUrl: './excel.html'
        }),
        __metadata("design:paramtypes", [event_service_1.EventService])
    ], ExcelComponent);
    return ExcelComponent;
}());
exports.ExcelComponent = ExcelComponent;
//# sourceMappingURL=excel.component.js.map