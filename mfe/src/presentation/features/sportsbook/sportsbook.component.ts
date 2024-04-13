import {ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CORE_TRANSLATION_KEYS } from "../../core/core-translation-keys";
import { TranslocoPipe } from "@jsverse/transloco";
import {TestPipe} from "./test.pipe";
import {TestService} from "./test.service";

@Component({
    selector: "app-sportsbook",
    templateUrl: "./sportsbook.component.html",
    styleUrls: ["./sportsbook.component.css"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None, // eslint-disable-line @angular-eslint/use-component-view-encapsulation,
    imports: [RouterOutlet, TranslocoPipe, TestPipe],
    providers: [],
})
export class SportsbookComponent implements OnInit {
    public readonly TRANSLATIONS = CORE_TRANSLATION_KEYS.HEADER;
    public readonly testService:TestService = inject(TestService);

    public ngOnInit(): void {
        console.log("SportsbookComponent initialized");

        this.testService.getTranslation().subscribe((translation) => {
            console.log("TRANSLATION MADE FROM A ROOT SERVICE", translation);
        });
    }
}
