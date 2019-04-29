import { Component, OnInit, Inject } from '@angular/core';
import { OrderServices } from '../../Services/services'
import { Car } from './car';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html'
})
export class carComponent implements OnInit{
    CarsList: Car[];
    formData: FormGroup;
    curYear: number;
    minDate: Date;
    maxDate: Date;

    constructor (private OrServ: OrderServices) { }

    ngOnInit() {
        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setFullYear(this.minDate.getFullYear() - 60);
        this.maxDate.setFullYear(this.maxDate.getFullYear());
        this.curYear = (new Date()).getFullYear();
        this.formData = new FormGroup({
            'brand': new FormControl('', Validators.required),
            'model': new FormControl('', Validators.required),
            'klas': new FormControl('', Validators.required),
            'year': new FormControl('', Validators.required),
            'numb': new FormControl('', Validators.required),
        });
        this.loadCars();
    }
    loadCars() {
        this.OrServ.getCarsList()
            .subscribe(
                (data: Car[]) => (this.CarsList = data)
            );
    }
    resetForm() {
        this.formData.reset();
    }
    addCar() {
        var datePipe = new DatePipe('en-US');
        const car = {
            brand: this.formData.value.brand,
            model: this.formData.value.model,
            klas: this.formData.value.klas,
            year: datePipe.transform(this.formData.value.year, 'yyyy'),
            numb: this.formData.value.numb
        }
        this.OrServ.createCar(car).subscribe(() => { this.loadCars(); this.resetForm(); });
    }
}
