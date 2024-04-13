import { Inject, Injectable, OnDestroy } from "@angular/core";
import { fromEvent, Observable, take } from "rxjs";

import { SocketioConfig } from "./socketio.interface";
import { SOCKET_IO_CONFIG } from "./socketio.token";
import { HasEventTargetAddRemove } from "rxjs/internal/observable/fromEvent";

import io from "socket.io-client";

@Injectable()
export class Socket implements OnDestroy {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable @typescript-eslint/no-unsafe-return */

    private readonly socket = io;

    public get id(): string {
        return this.socket.id;
    }

    public get connected(): boolean {
        return this.socket.connected;
    }

    public get disconnected(): boolean {
        return this.socket.disconnected;
    }

    public get io(): any {
        return this.socket;
    }

    public get auth(): any {
        return this.socket.auth;
    }

    public set auth(auth: any) {
        this.socket.auth = auth;
    }

    constructor(@Inject(SOCKET_IO_CONFIG) { url, options }: SocketioConfig) {
        this.socket = this.io(url, options);
    }

    public ngOnDestroy(): void {
        // this.socket.offAny();  // function offAny does not exist. commented out temporary
    }

    public connect(): this {
        this.socket.connect();
        return this;
    }

    /**
     * @see {@link Socket.disconnect}
     */
    public disconnect(): this {
        this.socket.disconnect();
        return this;
    }

    public send(...args: any[]): this {
        this.socket.send(...args);
        return this;
    }

    public emit(eventName: string, ...args: any[]): this {
        this.socket.emit(eventName, ...args);
        return this;
    }

    public on<T>(eventName: string): Observable<T> {
        return fromEvent<T>(this.socket as HasEventTargetAddRemove<T>, eventName);
    }

    public once<T>(eventName: string): Observable<T> {
        return this.on<T>(eventName).pipe(take(1));
    }

    public compress(compress: boolean): this {
        this.socket.compress(compress);
        return this;
    }
}
