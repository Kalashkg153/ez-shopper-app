import { Component, Input } from '@angular/core';

@Component({
  selector: 'Loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {

  @Input() isLoading: boolean = false;
}
