import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastId = 0;
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(message: string, type: ToastType = 'success') {
    const toast: Toast = {
      id: this.toastId++,
      message,
      type,
    };
    this._toasts.update((toasts) => [...toasts, toast]);
    setTimeout(() => {
      this._toasts.update((toasts) => toasts.filter((t) => t.id !== toast.id));
    }, 2500);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }
}
