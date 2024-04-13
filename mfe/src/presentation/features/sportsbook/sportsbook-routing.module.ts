import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const ROUTES: Routes = [
    {
        path: "",
        loadComponent: () => import("./sportsbook.component").then((component) => component.SportsbookComponent),
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class SportsbookRoutingModule {}
