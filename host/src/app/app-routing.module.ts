import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import {loadRemoteModule} from "@angular-architects/module-federation";
import {environment} from "../environments/environment";
import {MicroFrontendComponent} from "./micro-frontend/micro-frontend.component";

const routes: Routes = [
    {
        path: "",
        component: MicroFrontendComponent,
        children: [
            {
                path: "",
                loadChildren: () =>
                    loadRemoteModule({
                        type: "module",
                        remoteEntry: environment.sportsbookUrl,
                        exposedModule: "./SportsbookModule",
                    }).then((m) => m.SportsbookModule),
            },
        ],
    },
    {
        path: "**",
        redirectTo: "",
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            initialNavigation: "enabledBlocking",
            anchorScrolling: "enabled",
            onSameUrlNavigation: "reload",
            scrollPositionRestoration: "enabled",
            scrollOffset: [0, 100],
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
