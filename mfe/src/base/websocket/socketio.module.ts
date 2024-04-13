import { ModuleWithProviders, NgModule } from "@angular/core";
import { SocketioConfig } from "./socketio.interface";
import { Socket } from "./socketio.service";
import { SOCKET_IO_CONFIG } from "./socketio.token";

@NgModule()
export class SocketIOModule {
    private static forRoot(
        configFactory: () => SocketioConfig = defaultConfigFactory
    ): ModuleWithProviders<SocketIOModule> {
        return {
            ngModule: SocketIOModule,
            providers: [{ provide: SOCKET_IO_CONFIG, useFactory: configFactory }, Socket],
        };
    }
}

// Define a default configuration factory function
function defaultConfigFactory(): SocketioConfig {
    return { url: "" };
}
