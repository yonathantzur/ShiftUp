import {Component, OnInit} from '@angular/core';
import { ConstraintsService } from '../../services/constraints/constraints.service';
import {LoginService} from "../../services/login/login.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'constraints',
    templateUrl: './constraints.html',
    providers: [ConstraintsService],
    styleUrls: ['./constraints.css']
})

export class ConstraintsComponent implements OnInit {
    constraints: any = {};

    constructor(private ConstraintsService: ConstraintsService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.ConstraintsService.getAllConstraints().then((data: any) => {
            this.constraints = data;
        });
    }
}