import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-micro-frontend',
  standalone: true,
    imports: [CommonModule, RouterOutlet],
  templateUrl: './micro-frontend.component.html',
  styleUrl: './micro-frontend.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MicroFrontendComponent {

}
