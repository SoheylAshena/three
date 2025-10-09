export function renderHomeSection() {
  const elements = [];

  const hello = document.createElement("p");
  hello.classList.add("hello-text");
  hello.textContent = "Hello, Traveler.";
  elements.push(hello);

  const welcome = document.createElement("p");
  welcome.classList.add("welcome-text");
  welcome.textContent = "Welcome to the Orbit of Soheyl.";
  elements.push(welcome);

  const introduction = document.createElement("p");
  introduction.classList.add("introduction-text");
  introduction.textContent = "I am Soheyl,";
  elements.push(introduction);

  const career = document.createElement("p");
  career.classList.add("career-text");
  career.textContent = "A Creative Front-End Developer Exploring the Cosmos.";
  elements.push(career);

  const div = document.createElement("div");
  div.classList.add("home-page");

  elements.forEach((item) => {
    div.appendChild(item);
  });

  return div;
}
