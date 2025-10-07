// ╔════════════════════════════════════════════════════════════════════════╗
// |   Current view class
// ╚════════════════════════════════════════════════════════════════════════╝
export class CurrentView {
  private view = "";
  private listeners: Array<(view: string) => void> = [];

  getView(): string {
    return this.view;
  }

  setView = (view: string): void => {
    if (this.view === view) return;
    this.view = view;
    this.notifyListeners();
  };

  onViewChange = (callback: (view: string) => void): void => {
    this.listeners.push(callback);
  };

  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback(this.view));
  }
}
