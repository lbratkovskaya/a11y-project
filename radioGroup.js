class RadioGroup {
  constructor(groupNode) {
    this.groupNode = groupNode;

    this.radioButtons = [];

    this.firstRadioButton = null;
    this.lastRadioButton = null;

    this.groupNode.addEventListener('keydown', this.handleKeydown.bind(this));
    this.groupNode.addEventListener('keyup', this.handleKeyup.bind(this));
    this.groupNode.addEventListener('mousedown', (event) => {
      event.preventDefault()
    });

    const rbs = this.groupNode.querySelectorAll('[role=radio]');

    for (let i = 0; i < rbs.length; i++) {
      const rb = rbs[i];

      rb.tabIndex = -1;
      rb.setAttribute('aria-checked', 'false');

      // this.groupNode.addEventListener('keydown', this.handleKeydown.bind(this));
      rb.addEventListener('keyup', this.handleKeyup.bind(this));
      rb.addEventListener('click', this.handleClick.bind(this));

      this.radioButtons.push(rb);

      if (!this.firstRadioButton) {
        this.firstRadioButton = rb;
      }
      this.lastRadioButton = rb;
    }

    this.firstRadioButton.tabIndex = 0;
    this.firstRadioButton.setAttribute('aria-checked', 'true');
  }

  setChecked(target) {
    this.radioButtons.forEach((rb) => {
      rb.tabIndex = -1;
      rb.setAttribute('aria-checked', 'false');
    });

    target.tabIndex = 0;
    target.setAttribute('aria-checked', 'true');
    target.focus();
  };

  setFocused = (target) => {
    this.radioButtons.forEach((rb) => {
      rb.tabIndex = -1;
    });
    target.tabIndex = 0;
    target.focus();
  };

  setCheckedToPreviousItem = (target) => {
    if (target === this.firstRadioButton) {
      this.setChecked(this.lastRadioButton)
    } else {
      const currentIndex = this.radioButtons.indexOf(target);
      this.setChecked(this.radioButtons[currentIndex - 1]);
    }
  }

  setCheckedToNextItem = (target) => {
    if (target === this.lastRadioButton) {
      this.setChecked(this.firstRadioButton)
    } else {
      const currentIndex = this.radioButtons.indexOf(target);
      this.setChecked(this.radioButtons[currentIndex + 1]);
    }
  }

  setFocusToPreviousItem = (target) => {
    if (target === this.firstRadioButton) {
      this.setFocused(this.lastRadioButton)
    } else {
      const currentIndex = this.radioButtons.indexOf(target);
      this.setFocused(this.radioButtons[currentIndex - 1]);
    }
  }

  setFocusToNextItem = (target) => {
    if (target === this.lastRadioButton) {
      this.setFocused(this.firstRadioButton)
    } else {
      const currentIndex = this.radioButtons.indexOf(target);
      this.setFocused(this.radioButtons[currentIndex + 1]);
    }
  }

  /* event handlers */

  handleClick(event) {
    this.setChecked(event.currentTarget);
  }

  handleKeydown(event) {
    event.preventDefault();
  }

  handleKeyup(event) {
    const tgt = event.currentTarget;

    switch (event.key) {
      case ' ':
      case 'Enter':
        event.stopPropagation();
        event.preventDefault();
        this.setChecked(tgt);
        break;

      case 'Up':
      case 'ArrowUp':
      case 'Left':
      case 'ArrowLeft':
        event.stopPropagation();
        event.preventDefault();
        this.setFocusToPreviousItem(tgt);
        break;

      case 'Down':
      case 'ArrowDown':
      case 'Right':
      case 'ArrowRight':
        event.stopPropagation();
        event.preventDefault();
        this.setFocusToNextItem(tgt);
        break;

      default:
        break;
    }
  }

}