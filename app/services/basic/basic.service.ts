import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BasicService {

    constructor(public http: HttpClient) { }

    get(url: string) {
        return this.http.get(url);
    }

    post(url: string, data?: any) {
        if (data != null && typeof data == "object") {
            data = JSON.stringify(data);
        }

        return this.http.post(url, data, this.getRequestOptions());
    }

    put(url: string, data?: any) {
        if (data != null && typeof data == "object") {
            data = JSON.stringify(data);
        }
        
        return this.http.put(url, data, this.getRequestOptions());
    }

    delete(url: string) {
        return this.http.delete(url);
    }

    getRequestOptions(): any {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return { headers };
    }

}