"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var basic_service_1 = require("../basic/basic.service");
var ConstraintsService = /** @class */ (function (_super) {
    __extends(ConstraintsService, _super);
    function ConstraintsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "/api/constraints";
        return _this;
    }
    ConstraintsService.prototype.getAllConstraints = function () {
        return _super.prototype.get.call(this, this.prefix + "/getAllConstraints")
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    ConstraintsService.prototype.DeleteConstraint = function (conObjId) {
        return _super.prototype.get.call(this, this.prefix + "/DeleteConstraint?conObjId=" + conObjId)
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    ConstraintsService.prototype.AddConstraint = function (conData) {
        return _super.prototype.post.call(this, this.prefix + "/AddConstraint", conData)
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    ConstraintsService.prototype.getAllConstraintReasons = function () {
        return _super.prototype.get.call(this, this.prefix + "/getAllConstraintReasons")
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    ConstraintsService.prototype.ApproveConstraint = function (conObjId) {
        return _super.prototype.get.call(this, this.prefix + "/ApproveConstraint?conObjId=" + conObjId)
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    ConstraintsService.prototype.RefuseConstraint = function (conObjId) {
        return _super.prototype.get.call(this, this.prefix + "/RefuseConstraint?conObjId=" + conObjId)
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    ConstraintsService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], ConstraintsService);
    return ConstraintsService;
}(basic_service_1.BasicService));
exports.ConstraintsService = ConstraintsService;
//# sourceMappingURL=constraints.service.js.map