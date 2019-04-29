import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class OrderServices {
    constructor(private http: HttpClient) {

    }
    getUsersList() {
        return this.http.get('http://localhost:9220/api/users/get');
    }

    getCarsList() {
        return this.http.get('http://localhost:9220/api/cars/get');
    }
    getOrdersList() {
        return this.http.get('http://localhost:9220/api/order/get')
    }

    createUser(UsObj: any){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post('http://localhost:9220/api/users/create', JSON.stringify(UsObj), httpOptions);
    }
    createCar(CarObj: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post('http://localhost:9220/api/cars/create', JSON.stringify(CarObj), httpOptions);
    }
    createOrder(OrderObj: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post('http://localhost:9220/api/orders/create', JSON.stringify(OrderObj), httpOptions);
    }
    deleteOrder(Obj: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: Obj };
        return this.http.delete('http://localhost:9220/api/orders/delete', httpOptions);
    }
    updateOrder(updObj: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put('http://localhost:9220/api/orders/update', JSON.stringify(updObj), httpOptions);
    }
}