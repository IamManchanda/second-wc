class HSMTooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Welcome!';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: #2ecc71;
          color: #fefefe;
          padding: .5rem;
          border-radius: .5rem;
          margin-top: .5rem;
          position: absolute;
          z-index: 10;
        }
        span.highlight {
          background-color: #0a0a0a;
          color: #fefefe;
          padding: 0.15rem 0.5rem;
          text-align: center;
          border-radius: 50%;
          cursor: help;
        }
        ::slotted(span.highlight) {
          font-weight: bold;
        }
      </style>
      <slot>Components</slot>
      <span class="highlight">?</span>
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
