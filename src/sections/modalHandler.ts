import gsap from "gsap";

export class ModalHandler {
  private modal: HTMLDivElement;
  private box: HTMLDivElement;
  private sourceBtn: HTMLButtonElement;
  private liveDemoBtn: HTMLButtonElement;
  private cancelBtn: HTMLButtonElement;
  isOpen: boolean = false;

  constructor() {
    // Create modal container (overlay)
    this.modal = document.createElement("div");
    Object.assign(this.modal.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      background: "rgba(0, 0, 0, 0.75)",
      display: "none",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "9999",
      opacity: "0",
    });

    // Inner box with neon styling
    this.box = document.createElement("div");
    Object.assign(this.box.style, {
      background: "#0b0f16",
      padding: "25px",
      borderRadius: "10px",
      textAlign: "center",
      minWidth: "300px",
      boxShadow: "0 0 15px rgba(0, 255, 255, 0.6)",
      border: "1px solid rgba(0, 255, 255, 0.4)",
      opacity: "0",
      transform: "scale(0.9)",
    });

    // Title
    const title = document.createElement("h3");
    title.innerText = "What do you want to see?";
    Object.assign(title.style, {
      color: "#00ffe5",
      marginBottom: "15px",
      fontFamily: "Arial, sans-serif",
    });
    this.box.appendChild(title);

    // Buttons container
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    });

    // Buttons
    this.sourceBtn = document.createElement("button");
    this.sourceBtn.innerText = "Source Code";

    this.liveDemoBtn = document.createElement("button");
    this.liveDemoBtn.innerText = "Live Demo";

    this.cancelBtn = document.createElement("button");
    this.cancelBtn.innerText = "Cancel";

    // Style for all buttons
    [this.sourceBtn, this.liveDemoBtn, this.cancelBtn].forEach((btn) => {
      Object.assign(btn.style, {
        padding: "10px",
        cursor: "pointer",
        background: "transparent",
        border: "1px solid #00ffe5",
        color: "#00ffe5",
        fontFamily: "Arial, sans-serif",
        borderRadius: "5px",
        transition: "all 0.3s ease",
      });

      btn.addEventListener("mouseover", () => {
        btn.style.background = "#00ffe5";
        btn.style.color = "#0b0f16";
        btn.style.boxShadow = "0 0 10px #00ffe5";
      });

      btn.addEventListener("mouseout", () => {
        btn.style.background = "transparent";
        btn.style.color = "#00ffe5";
        btn.style.boxShadow = "none";
      });
    });

    btnContainer.appendChild(this.sourceBtn);
    btnContainer.appendChild(this.liveDemoBtn);
    btnContainer.appendChild(this.cancelBtn);
    this.box.appendChild(btnContainer);

    this.modal.appendChild(this.box);
    document.body.appendChild(this.modal);

    // Prevent clicks inside modal from closing / triggering raycast
    this.modal.addEventListener("click", (e) => e.stopPropagation());
    this.box.addEventListener("click", (e) => e.stopPropagation());
  }

  open(sourceUrl: string, demoUrl: string) {
    this.isOpen = true;
    this.modal.style.display = "flex";

    // Animate in
    gsap.to(this.modal, { opacity: 1, duration: 0.25 });
    gsap.to(this.box, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });

    // Set up event listeners
    this.sourceBtn.onclick = () => {
      window.open(sourceUrl, "_blank");
      this.close();
    };

    this.liveDemoBtn.onclick = () => {
      window.open(demoUrl, "_blank");
      this.close();
    };

    this.cancelBtn.onclick = (e) => {
      e.stopPropagation();
      this.close();
    };
  }

  close() {
    // Animate out
    gsap.to(this.box, {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(this.modal, {
      opacity: 0,
      duration: 0.25,
      onComplete: () => {
        this.modal.style.display = "none";
        this.isOpen = false;
      },
    });
  }
}
