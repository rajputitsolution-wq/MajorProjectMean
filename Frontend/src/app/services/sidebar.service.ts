import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _isCollapsed = signal(true);
  isCollapsed = this._isCollapsed;

  toggle() {
    this._isCollapsed.set(!this._isCollapsed());
  }

  collapse() {
    this._isCollapsed.set(true);
  }

  expand() {
    this._isCollapsed.set(false);
  }
}
