import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-navbar',
  imports: [MatInputModule, MatIconModule],
  templateUrl: './navbar.html',
})
export class Navbar {}
