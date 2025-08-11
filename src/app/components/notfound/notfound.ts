import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div class="max-w-md w-full text-center">
        <!-- 404 Number -->
        <div class="mb-8">
          <h1 class="text-6xl font-bold text-gray-300 leading-none">404</h1>
        </div>

        <!-- Error Message -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-3">Page Not Found</h2>
          <p class="text-gray-600 text-lg leading-relaxed">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <!-- Action Button -->
        <div class="space-y-4">
          <button
            mat-raised-button
            (click)="goToHome()"
            class="!bg-emerald-600 hover:!bg-emerald-700 !text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <mat-icon class="mr-2">home</mat-icon>
            Go to Home
          </button>

          <div class="mt-6">
            <button
              mat-button
              (click)="goBack()"
              class="text-gray-500 hover:text-gray-700 font-medium"
            >
              <mat-icon class="mr-1">arrow_back</mat-icon>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class NotFound {
  constructor(private router: Router) {}

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goBack(): void {
    window.history.back();
  }
}
