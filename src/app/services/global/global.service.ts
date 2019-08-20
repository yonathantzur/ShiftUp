import { Injectable } from '@angular/core';

declare let io: any;

@Injectable()
export class GlobalService {
    public socket: any;

    constructor() { }

    Initialize() {
        if (!this.socket) {
            this.socket = io();
        }
    }

    ResetSocket() {
        this.socket && this.socket.destroy();
        this.socket = null;
    }
}