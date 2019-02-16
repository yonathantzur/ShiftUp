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
        this.newWorker = { name: "", id: 0, age: 0, hourSalery: 0, job: "waiter" };
        this.onClose = new core_1.EventEmitter();
        this.onCancel = function () {
            _this.onClose.emit(_this.newWorker);
        };
        this.onSubmit = function () {
            _this.onClose.emit(_this.newWorker);
        };
        this.onChange = function (event) {
            var fieldName = event.target.name;
            var fieldValue = event.target.value;
            if (event.target.type == "number") {
                fieldValue = parseInt(fieldValue.toString());
            }
            _this.newWorker[fieldName] = fieldValue;
        };
        // blurClicked = () => {
        //     if (confirm("האם אתה בטוח שברצונך לצאת?")) {
        //         this.onClose();
        //     }
        // }
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