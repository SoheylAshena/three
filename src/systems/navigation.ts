/*─────────────────────────────────────────────────────────────────────────────
│                                                                             │
│      © 2025 — Soheyl Ashena                                                 │
│      Licensed under the MIT License.                                        │
│      You must retain this notice in any copies or derivative works.         │
│                                                                             │
│      Original Author: Soheyl Ashena                                         │
│      Unauthorized removal of attribution is prohibited.                     │
│                                                                             │
─────────────────────────────────────────────────────────────────────────────*/
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
