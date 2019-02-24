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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var registration_service_1 = require("../../services/registration/registration.service");
var login_service_1 = require("../../services/login/login.service");
var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(formBuilder, router, regService, loginService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.regService = regService;
        this.loginService = loginService;
        this.loading = false;
        this.submitted = false;
        this.user = {};
        // redirect to home if already logged in
        if (this.loginService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    Object.defineProperty(RegistrationComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.registerForm.controls; },
        enumerable: true,
        configurable: true
    });
    RegistrationComponent.prototype.onSubmit = function (regForm) {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (regForm.invalid) {
            return;
        }
        this.user.email = regForm.value.email;
        this.user.firstName = regForm.value.firstName;
        this.user.lastName = regForm.value.lastName;
        this.user.password = regForm.value.password;
        this.loading = true;
        this.regService.register(this.user).then(function (result) {
            if (result) {
                alert("ברוך הבא" + _this.user.firstName + ", נרשמת בהצלחה!");
                _this.router.navigate(['/']);
            }
            else {
                window.alert("שגיאה בהרשמה");
            }
        });
    };
    RegistrationComponent = __decorate([
        core_1.Component({
            selector: 'registration',
            templateUrl: './registration.html',
            providers: [registration_service_1.registrationService, login_service_1.LoginService],
            styleUrls: ['./registration.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.Router,
            registration_service_1.registrationService,
            login_service_1.LoginService])
    ], RegistrationComponent);
    return RegistrationComponent;
}());
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map