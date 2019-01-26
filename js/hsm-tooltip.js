class HSMTooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Welcome!';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        span.highlight {
          position: relative;
          font-weight: bold;
        }
        ::slotted(span.highlight) {
          font-weight: bold;
        }
        div {
          background-color: #2ecc71;
          color: #fefefe;
          padding: .25rem;
          border-radius: .25rem;
          margin-top: .5rem;
          position: absolute;
          z-index: 10;
        }
      </style>
      <slot>Components</slot>
      <span class="highlight"> (?)</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('hsm-text')) {
      this._tooltipText = this.getAttribute('hsm-text');
    }
    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('hsm-tooltip', HSMTooltip);
