export function renderHomeSection() {
  const h1 = document.createElement("h1");
  h1.textContent = "Hello";

  const p1 = document.createElement("p");
  p1.textContent = "Welcome to my website";

  const div = document.createElement("div");
  div.appendChild(h1);
  div.appendChild(p1);
  return div;
}
