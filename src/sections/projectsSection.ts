export function renderProjectsSection(container: HTMLElement) {
  const projectsDesc = document.createElement("p");
  projectsDesc.textContent = "These are my projects";
  container.appendChild(projectsDesc);
}
