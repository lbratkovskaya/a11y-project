class BuyForm {
  constructor(formNode, purchaseItem) {
    this.form = formNode;
    this.overlay = formNode.closest('.overlay');
    this.header = formNode.querySelector('h2');
    this.header.textContent = purchaseItem?.itemTitle;
    this.submit = formNode.querySelector('[type="submit"]');

    this.purchaseItem = purchaseItem;

    this.focusableElements = [];
    formNode.querySelectorAll('.focusable').forEach((el) => {
      el.tabIndex = -1;

      this.focusableElements.push(el);
    })
    this.header.tabIndex = 0;
    this.header.focus();
    this.focusedElement = this.header;

    this.form.addEventListener('click', this.handleFormClick.bind(this));
    this.form.addEventListener('keydown', this.handleFormKeydown.bind(this));

    this.submit.addEventListener('click', this.handleClick.bind(this));
    this.submit.addEventListener('keydown', this.handleKeydown.bind(this));

    this.overlay.addEventListener('click', this.handleOverlayClick.bind(this));

    const radioGroup = formNode.querySelector('[role="radiogroup"]');
    new RadioGroup(radioGroup);
  }

  closeForm = () => {
    this.overlay.classList.add('hidden');
  }

  focusPrev = () => {
    if (this.focusedElement === this.header) {
      this.focusElement(this.submit);
    } else {
      const currentIndex = this.focusableElements.indexOf(this.focusedElement);
      this.focusElement(this.focusableElements[currentIndex - 1]);
    }
  }

  focusNext = () => {
    if (this.focusedElement === this.submit) {
      this.focusElement(this.header);
    } else {
      const currentIndex = this.focusableElements.indexOf(this.focusedElement);
      this.focusElement(this.focusableElements[currentIndex + 1]);
    }
  }

  focusElement =(element) => {
    this.focusableElements.forEach((el) => {
      el.tabIndex = -1;
    })
    element.tabIndex = 0;
    element.focus();
    this.focusedElement = element;
  }

  submitForm = () => {
    this.closeForm();
    document.querySelector('#action-alert').textContent = `Вы заказали ${this.purchaseItem.itemTitle}`;
    setTimeout(() => {
      document.querySelector('#action-alert').textContent = null;
    }, 3000);
  }

  /* event handlers */
  handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.submitForm();
  }

  handleFormClick(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  handleFormKeydown(event) {
    switch (event.key) {
      case 'Esc':
        event.stopPropagation();
        event.preventDefault();
        this.closeForm();
        break;
      case 'Tab':
        event.shiftKey ? this.focusPrev() : this.focusNext();
        event.stopPropagation();
        event.preventDefault();
        break;

      default:
        break;
    }
  }

  handleKeydown(event) {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.stopPropagation();
        event.preventDefault();
        this.submitForm();
        break;
      case 'Esc':
        event.stopPropagation();
        event.preventDefault();
        this.closeForm();
        break;
      default:
        break;
    }
  }

  handleOverlayClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.closeForm();
  }
}