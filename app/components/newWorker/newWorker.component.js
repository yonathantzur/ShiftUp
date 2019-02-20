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
var NewWorkerComponent = /** @class */ (function () {
    function NewWorkerComponent() {
        var _this = this;
        this.newWorker = { name: "", id: 0, age: 0, hourSalery: 0, job: "" };
        this.onClose = new core_1.EventEmitter();
        this.strErrorMessage = "";
        this.blurClicked = function () {
            _this.onClose.emit();
        };
        this.onCancel = function () {
            _this.onClose.emit();
        };
        this.onChange = function (event) {
            var fieldName = event.target.name;
            var fieldValue = event.target.value;
            if (event.target.type == "number") {
                fieldValue = parseInt(fieldValue.toString());
            }
            _this.newWorker[fieldName] = fieldValue;
        };
        this.onSubmit = function () {
            if (_this.validatedWorker(_this.newWorker)) {
                _this.onClose.emit(_this.newWorker);
            }
        };
        this.validatedWorker = function (worker) {
            _this.strErrorMessage = "";
            if (!worker.name.match("[א-ת]{2,} {1}[א-ת]{2,}")) {
                _this.strErrorMessage = "שם חייב להכיל שם פרטי ומשפחה בעלי 2 תווים לפחות";
                return false;
            }
            else if (worker.id.toString().length != 9) {
                _this.strErrorMessage = "מספר תעודת זהות חייב להכיל 9 ספרות";
                return false;
            }
            else if (worker.age < 18) {
                _this.strErrorMessage = "גיל חייב להיות לפחות 18";
                return false;
            }
            else if (worker.age > 60) {
                _this.strErrorMessage = "גיל חייב להיות לכל היותר 60";
                return false;
            }
            else if (worker.hourSalery < 20) {
                _this.strErrorMessage = "שכר לשעה חייב להיות לפחות 20";
                return false;
            }
            else if (worker.hourSalery > 100) {
                _this.strErrorMessage = "שכר לשעה חייב להיות לכל היותר 100";
                return false;
            }
            else if (worker.job == "") {
                _this.strErrorMessage = "לא נבחרה משרה";
                return false;
            }
            return true;
        };
    }
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NewWorkerComponent.prototype, "onClose", void 0);
    NewWorkerComponent = __decorate([
        core_1.Component({
            selector: 'newWorker',
            templateUrl: './newWorker.html',
            providers: [],
            styleUrls: ['./newWorker.css']
        })
    ], NewWorkerComponent);
    return NewWorkerComponent;
}());
exports.NewWorkerComponent = NewWorkerComponent;
//# sourceMappingURL=newWorker.component.js.map