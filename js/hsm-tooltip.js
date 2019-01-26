class HSMTooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipIcon;
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
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
          z-index: 10;
          font-size: 1.05rem;
        }
        span.icon {
          background-color: #0a0a0a;
          color: #fefefe;
          padding: 0.15rem 0.5rem;
          text-align: center;
          border-radius: 50%;
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
          cursor: help;
        }
        ::slotted(span.highlight) {
          font-weight: bold;
        }
      </style>
      <slot>Components</slot>
      <span class="icon">?</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('hsm-text')) this._tooltipText = this.getAttribute('hsm-text');
    this._tooltipIcon = this.shadowRoot.querySelector('span.icon');
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === 'hsm-text') this._tooltipText = newValue;
  }

  static get observedAttributes() {
    return ['hsm-text'];
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
