class ToggleSwitch extends HTMLElement {
    constructor() {
        super();

        this.uuid = crypto.randomUUID();
    }

    static get observedAttributes() {
        return ['checked'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'checked':
                const checked = this.hasAttribute('checked')

                this.checked = checked

                if (this.input) this.input.value = checked

                break;
        }
    }

    connectedCallback() {
        this.setAttribute('class', `toggle-switch-${this.uuid} ${this.hasAttribute('class') ? this.getAttribute('class') : ''}`)

        this.checked = this.hasAttribute('checked')
        this.name = this.getAttribute('name')

        this.size = this.hasAttribute('size') ? this.getAttribute('size') : 22.5;

        this.width = this.hasAttribute('width') ? this.getAttribute('width') : this.size * 2;
        this.height = this.hasAttribute('height') ? this.getAttribute('height') : this.size;

        this.padding = this.hasAttribute('padding') ? this.getAttribute('padding') : this.size / 10;

        this.rounded = this.hasAttribute('rounded') ? this.getAttribute('rounded') == 'false' ? false : true : true;

        this.transitionDuration = this.hasAttribute('transition-duration') ? this.getAttribute('transition-duration') : 200;

        this.uncheckedColor = this.getAttribute('unchecked-color') || '#ccc';
        this.checkedColor = this.getAttribute('checked-color') || '#2196F3';
        this.dotColor = this.getAttribute('dot-color') || '#fff';

        this.render()
    }

    disconnectedCallback() {
        if (this.disconnectCallback) this.disconnectCallback()
    }

    render() {
        this.innerHTML = `
            ${this.css()}
            ${this.html()}
        `;
        this.listeners();
    }

    listeners() {
        this.input = this.querySelector('input')

        this.addEventListener('click', () => {
            this.checked = !this.checked

            this.input.value = this.checked

            if (this.checked) this.setAttribute('checked', '')
            else this.removeAttribute('checked')

            this.dispatchEvent(new Event('change'))
        })
    }

    html() {
        return `
            <input
                type='hidden'

                ${this.name ? `name="${this.name}"` : ''}

                value='${this.checked ? 'true' : 'false'}'
            >
            <span></span>
        `
    }

    css() {
        return `
            <style>
                .toggle-switch-${this.uuid} {
                    position: relative;
                    display: inline-block;
                    width: ${this.width}px;
                    height: ${this.height}px;
                }

                .toggle-switch-${this.uuid} span {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    cursor: pointer;
                    background-color: ${this.uncheckedColor};
                    transition: ${this.transitionDuration}ms all ease-in-out;
                }

                .toggle-switch-${this.uuid} span:before {
                    content: '';

                    position: absolute;
                    left: ${this.padding}px;
                    bottom: ${this.padding}px;

                    height: ${this.height - (2 * this.padding)}px;
                    aspect-ratio: 1;

                    background-color: ${this.dotColor};

                    transition: ${this.transitionDuration}ms all ease-in-out;
                }

                .toggle-switch-${this.uuid}[checked] span {
                    background-color: ${this.checkedColor};
                }

                .toggle-switch-${this.uuid}[checked] span:before {
                    translate: ${this.width - this.height}px 0 ;
                }

                ${this.rounded && `
                    .toggle-switch-${this.uuid} span {
                        border-radius: ${this.height}px;
                    }

                    .toggle-switch-${this.uuid} span:before {
                        border-radius: 50%;
                    }
                `}
            </style>
        `;
    }
}

customElements.define('toggle-switch', ToggleSwitch);