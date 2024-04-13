import { InjectionToken } from "@angular/core";
import { SocketioConfig } from "./socketio.interface";

export const SOCKET_IO_CONFIG = new InjectionToken<SocketioConfig>("Socket io Config");
