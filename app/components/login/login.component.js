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
var login_service_1 = require("../../services/login/login.service");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(loginService, 
    // private formBuilder: FormBuilder,
    route, router) {
        this.loginService = loginService;
        this.route = route;
        this.router = router;
        this.user = {};
        this.submitted = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.onSubmit = function (loginForm) {
        var _this = this;
        this.submitted = true;
        if (loginForm.valid) {
            this.user.email = loginForm.value.email;
            this.user.password = loginForm.value.password;
            this.loginService.UserLogin(this.user).then(function (result) {
                if (result) {
                    _this.router.navigate([_this.returnUrl]);
                }
                else {
                    window.alert("שם משתמש או סיסמה לא נכונים");
                }
            });
        }
        else {
            window.alert("נא הכנס אימייל תקין וסיסמה");
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './login.html',
            providers: [login_service_1.LoginService],
            styleUrls: ['./login.css']
        }),
        __metadata("design:paramtypes", [login_service_1.LoginService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map