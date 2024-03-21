import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
export class Technology {
  constructor(name, about) {
      this.name = name;
      this.about = about;
  }

  initializeTitle() {
      try {
          const getTechClass = document.querySelectorAll(`.${this.name}`);
          if (getTechClass.length > 0) {
            getTechClass.forEach((element) => {
                tippy(element, {
                    content: `<div class="tooltip"><img class="tooltip__logo" src="assets/images/${this.name}.svg" ><p class="tooltip__about">${this.about}</p></div>`, 
                    allowHTML: true,
                    placement: 'top',
                    theme: 'custom',
                    animation: 'scale',
                });
            });
          } 
      } catch (error) {
          console.error('Une erreur est survenue lors de l\'initialisation du titre :', error);
      }
  }
}
