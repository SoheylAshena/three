export const renderNavbar = (setView: (view: string) => void) => {
  const navbar = document.getElementById("navbar")!;

  const linkProjects = document.createElement("p");
  linkProjects.textContent = "Projects";
  linkProjects.addEventListener("click", () => {
    setView("projects");
  });
  const linkSkills = document.createElement("p");
  linkSkills.textContent = "Skills";
  linkSkills.addEventListener("click", () => {
    setView("skills");
  });
  const linkContact = document.createElement("p");
  linkContact.textContent = "Contact";
  linkContact.addEventListener("click", () => {
    setView("contact");
  });
  const linkHome = document.createElement("p");
  linkHome.textContent = "About";
  linkHome.addEventListener("click", () => {
    setView("home");
  });

  const btn = document.createElement("p")!;
  btn.textContent = "";
  btn.addEventListener("click", async () => {
    await document.documentElement.requestFullscreen();
  });

  navbar.appendChild(linkHome);
  navbar.appendChild(linkSkills);
  navbar.appendChild(linkProjects);
  navbar.appendChild(linkContact);
  navbar.appendChild(btn);
};
