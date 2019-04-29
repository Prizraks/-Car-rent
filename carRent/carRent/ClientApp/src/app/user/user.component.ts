import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { OrderServices } from '../../Services/services';
import { HttpResponse } from '@angular/common/http';
import { User } from './user';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-user-component',
    templateUrl: './user.component.html'
})
export class userComponent implements OnInit {
    UsersList: User[];
    public formData: FormGroup;

    constructor(private OrServ: OrderServices) {}

    ngOnInit() {
        this.formData = new FormGroup({
            'firstName': new FormControl('', Validators.required),
            'lastName': new FormControl('', Validators.required),
            'dob': new FormControl('', Validators.required),
            'numbDL': new FormControl('', Validators.required),
        });
        this.loadUsers();
    }

    loadUsers() {
        this.OrServ.getUsersList()
            .subscribe(
            (data: any[]) => {
                for (let obj of data) {
                    obj.dob=new Date(obj.dob)
                }
                this.UsersList = data;
            });
    }

    resetForm() {
        this.formData.reset();
    }
    addUser() {
        const user = this.formData.value;
        this.OrServ.createUser(user).subscribe(() => { this.loadUsers(); this.resetForm(); });
    }
}