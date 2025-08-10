import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [MatInputModule, MatIconModule, RouterModule],
  templateUrl: './navbar.html',
})
export class Navbar {}
