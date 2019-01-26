class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Welcome!';
  }

  connectedCallback() {
    if (this.hasAttribute('hsm-text')) {
      this._tooltipText = this.getAttribute('hsm-text');
    }
    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?)';
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.appendChild(tooltipIcon);
    this._tooltipContainer.style.position = 'relative';
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this._tooltipContainer.style.backgroundColor = '#2ecc71';
    this._tooltipContainer.style.color = '#fefefe';
    this._tooltipContainer.style.padding = '.25rem';
    this._tooltipContainer.style.borderRadius = '.25rem';
    this._tooltipContainer.style.marginTop = '.25rem';
    this._tooltipContainer.style.position = 'absolute';
    this._tooltipContainer.style.zIndex = '10';
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define('hsm-tooltip', Tooltip);
