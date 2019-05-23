import { Component } from '@angular/core';

@Component({
  //selector: 'pm-home', Remove this because selector is only needed when we want to use it as a nested component
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  public pageTitle = 'Welcome';
}
