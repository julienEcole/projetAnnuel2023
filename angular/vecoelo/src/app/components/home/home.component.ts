import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Input() text: string = 'default';
  @Input() color: string = 'grey';
  @Output() buttonClicked = new EventEmitter<void>();

  emitEvent(): void {
    this.buttonClicked.emit();
  }

}
