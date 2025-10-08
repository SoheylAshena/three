export function renderProjectsSection() {
  const projectsDesc = document.createElement("h2");
  projectsDesc.textContent = "My Projects";

  const div = document.createElement("div");
  div.appendChild(projectsDesc);

  return div;
}
