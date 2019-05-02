import { Component, OnInit } from '@angular/core';
import { ConstraintsService } from '../../services/constraints/constraints.service';
import { UsersService } from "../../services/users/users.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'constraints',
    templateUrl: './constraints.html',
    providers: [ConstraintsService, UsersService],
    styleUrls: ['./constraints.css']
})

export class ConstraintsComponent implements OnInit {
    constraints: Array<any> = [];
    usernames: any = {};

    constructor(private constraintsService: ConstraintsService,
                private usersService: UsersService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.constraintsService.getAllConstraints().then((data: any) => {
            this.constraints = data;
        });
        this.InitiateAllUsernames();
    }
    
    InitiateAllUsernames() {
        if(this.constraints) {
            for(let con in this.constraints) {
                this.usersService.GetUserByUserId(this.constraints[con].userId).then((data: any) => {
                    this.usernames.firstName.push(data.firstName);
                    this.usernames.lastName.push(data.lastName);
                });
            }
        }
    }

}