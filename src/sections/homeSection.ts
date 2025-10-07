export function renderHomeSection(container: HTMLElement) {
  const h1 = document.createElement("h1");
  h1.textContent = "Hello";
  container.appendChild(h1);

  const p1 = document.createElement("p");
  p1.textContent = "Welcome to my website";
  container.appendChild(p1);
}
