export class Modal {
    constructor() {
        this.modal = null;
        this.focusSelector = "button, a, input, textarea, select";
        this.focusables = [];
        this.previouslyFocused = null;
    }

    displayModal(html) {
        document.body.insertAdjacentHTML("beforeend", html);
        this.modal = document.getElementById("modal");
        this.modal.style.display = "none";
        function closeModal() {
            this.modal.style.display = "none";
        }
        modal.addEventListener("click", closeModal());
        modal.querySelector(".js-modal-stop").addEventListener("click", this.stopPropagation());
        this.modal.querySelector(".js-modal-close").addEventListener("click", closeModal());
    }
    
    fetchModal(url) {
        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error("Une erreur est survenue lors du chargement de la fenêtre modale.");
            }
            return response.text()
        })
        .then(html => this.displayModal(html));
    }
    
    openModal() {
        this.modal = document.getElementById("modal");
        if (this.modal) {
            this.modal.style.display = "flex";
        }
    }
    stopPropagation(e) {
        e.stopPropagation();
    }
    
    focusInModal(e) {
        e.preventDefault();
        let index = this.focusables.findIndex(f => f === this.modal.querySelector(':focus'));
        if (e.shiftKey === true) {
            index--;
        } else {
            index++;
        }
        if (index >= this.focusables.length) {
            index = 0;
        }
        if (index < 0) {
            index = this.focusables.length -1;
        }
        this.focusables[index].focus();
     }

     handleKeyDown() {
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" || e.key === "Esc") {
                closeModal(e);
            }
            if (e.key === "Tab" && this.modal !== null) {
                this.focusInModal(e);
            }
        })
     }
}