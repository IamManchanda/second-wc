class HSMConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      if (!confirm('Do you really want to visit the website of whom link you just clicked?')) {
        event.preventDefault();
      }
    });
  }
}

customElements.define('hsm-confirm-link', HSMConfirmLink, {
  extends: 'a',
});
