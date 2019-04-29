import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { OrderServices } from '../../Services/services';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Order } from './order';
import { Car } from '../car/car';
import { User } from '../user/user';
import { IntlService } from '@progress/kendo-angular-intl';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class orderComponent implements OnInit {
    OrdersList: Order[];
    CarsList: Car[];
    UsersList: User[];
    ObjOrder: Order;
    ObjDet: Order;
    formData: FormGroup;
    formDataEdit: FormGroup;

    constructor(private ordServ: OrderServices, public intl: IntlService) {}
    
    ngOnInit() {
        this.formData = new FormGroup({
            'idUser': new FormControl('', Validators.required),
            'idCar': new FormControl('', Validators.required),
            'dateStart': new FormControl('', Validators.required),
            'dateEnd': new FormControl('', Validators.required),
            'comment': new FormControl(),
        });
        this.formDataEdit = new FormGroup({
            'startEdit': new FormControl('', Validators.required),
            'endEdit': new FormControl('', Validators.required),
            'commentEdit': new FormControl('', Validators.required),
        })

        this.loadOrders();
        this.loadUsers();
        this.loadCars(); 
    }
    loadOrders() {
        this.ordServ.getOrdersList()
            .subscribe(
            (data: any[]) => {
                for (let order of data) {
                    order.dateEnd = new Date(order.dateEnd);
                    order.dateStart = new Date(order.dateStart);
                }                
                this.OrdersList = data;
            }
        );
    }
                  /*this.OrdersList = data;
                    for (let i = 0; i < data.length; i++) {
                    this.OrdersList[i].brand = data[i].brand;
                    this.OrdersList[i].carId = data[i].carId;
                    this.OrdersList[i].comment = data[i].comment;
                    this.OrdersList[i].dateEnd = new Date(data[i].dateEnd);
                    this.OrdersList[i].dateStart = new Date(data[i].dateStart);
                    this.OrdersList[i].firstName = data[i].firstName;
                    this.OrdersList[i].id = data[i].id;
                    this.OrdersList[i].lastName = data[i].lastName;
                    this.OrdersList[i].model = data[i].model;
                    this.OrdersList[i].numb = data[i].numb;
                    this.OrdersList[i].userId = data[i].userId;
                }*/
    loadUsers() {
        this.ordServ.getUsersList()
            .subscribe(
                (data: User[]) => (this.UsersList = data)
            );
    }
    loadCars() {
        this.ordServ.getCarsList()
            .subscribe(
                (data: Car[]) => (this.CarsList = data)
            );
    }

    resetForm() {
        this.formData.reset();
        this.formDataEdit.reset();
    }
    addOrder() {
        const order = {
            CarId: this.formData.value.idCar,
            userId: this.formData.value.idUser,
            dateStart: this.formData.value.dateStart,
            dateEnd: this.formData.value.dateEnd,
            comment: this.formData.value.comment,
        };
        this.ordServ.createOrder(order).subscribe(() => { this.loadOrders(); this.resetForm(); });
    }

    deleteOrder(id:number) {
        this.ordServ.deleteOrder(id).subscribe(() => this.loadOrders());
    }

    updOrder() {
        const ObjUpt = {
            Id: (<HTMLInputElement>document.getElementById('idOrder')).value,
            CarId: (<HTMLSelectElement>document.getElementById('idCarEdit')).value,
            userId: (<HTMLSelectElement>document.getElementById('idUserEdit')).value,
            DateStart: (<HTMLInputElement>document.getElementById('startEdit')).value,
            DateEnd: (<HTMLSelectElement>document.getElementById('endEdit')).value,
            comment: (<HTMLTextAreaElement>document.getElementById('commentEdit')).value,
        }
        this.ordServ.updateOrder(ObjUpt).subscribe(() => { this.loadOrders(); this.resetForm(); });
    }

    detailsOrder(id: number) {
        this.ObjDet = this.OrdersList.find(order => order.id === id);
        var datePipe = new DatePipe('en-US');
        var startDate = datePipe.transform(this.ObjDet.dateStart, 'MM/dd/yyyy');
        var endDate = datePipe.transform(this.ObjDet.dateEnd.toString(), 'MM/dd/yyyy');

        var elem = document.getElementById('detBrand');
        elem.setAttribute('value', this.ObjDet.brand);
        var elem2 = document.getElementById('detModel');
        elem2.setAttribute('value', this.ObjDet.model);
        var elem3 = document.getElementById('detFirstName');
        elem3.setAttribute('value', this.ObjDet.firstName);
        var elem4 = document.getElementById('detLastName');
        elem4.setAttribute('value', this.ObjDet.lastName);
        var elem5 = document.getElementById('detDateStart');
        elem5.setAttribute('value', startDate);
        var elem6 = document.getElementById('detDateEnd');
        elem6.setAttribute('value', endDate);
        var elem7 = document.getElementById('detNumb');
        elem7.setAttribute('value', this.ObjDet.numb);
        var elem8 = document.getElementById('detComment');
        elem8.innerHTML = this.ObjDet.comment;
    }
    editOrderModal(id: number) {
        const idOrder = id;
        this.ObjOrder = this.OrdersList.find(order => order.id === id);
        var datePipe = new DatePipe('en-US');
        var startDate = datePipe.transform(this.ObjOrder.dateStart, 'MM/dd/yyyy');
        var endDate = datePipe.transform(this.ObjOrder.dateEnd.toString(), 'MM/dd/yyyy');
        this.formDataEdit = new FormGroup({
            'startEdit': new FormControl(startDate, Validators.required),
            'endEdit': new FormControl(endDate, Validators.required),
            'commentEdit': new FormControl(this.ObjOrder.comment, Validators.required),
        });
        var form = document.forms['selectForm'];
        var selectCar = form.elements.idCarEdit;
        var selectUser = form.elements.idUserEdit;
        var selIdOrder = form.elements.idOrder;
        selIdOrder.value = idOrder;

        for (var i = 0; i < selectCar.options.length; i++) {
            var option = selectCar.options[i];
            if (option.value == this.ObjOrder.carId) {
                option.selected = true;
            }
        }
        for (var i = 0; i < selectUser.options.length; i++) {
            var option = selectUser.options[i];
            if (option.value == this.ObjOrder.userId) {
                option.selected = true;
            }
        }
    }
}
