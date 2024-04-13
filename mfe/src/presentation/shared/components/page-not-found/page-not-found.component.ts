import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-sport-page-not-found",
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: "./page-not-found.component.html",
    styleUrl: "./page-not-found.component.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}