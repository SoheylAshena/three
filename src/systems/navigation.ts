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
    this.view = view;
    this.notifyListeners();
  };

  addToListener = (callback: (view: string) => void): void => {
    this.listeners.push(callback);
  };

  private notifyListeners(): void {
    console.log(this.listeners);
    this.listeners.forEach((callback) => callback(this.view));
  }
}
