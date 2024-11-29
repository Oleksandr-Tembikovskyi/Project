const svgContent = `
<svg width="350" height="200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <path id="curve" d="M50,100 Q300,150 400,100" />
    </defs>
    
    <path d="M50,90 Q300,140 400,90 L400,110 Q300,160 50,110 Z" fill="#FFFFFF" />

    <text id="curved-text" font-size="15" fill="#000" transform="rotate(-5, 175, 100)">
        <textPath href="#curve">Your email address</textPath>
    </text>
</svg>
`;

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('curved-input-container');
    container.innerHTML = svgContent;

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'text';
    hiddenInput.style.position = 'absolute';
    hiddenInput.style.top = '0';
    hiddenInput.style.left = '0';
    hiddenInput.style.width = '100%';
    hiddenInput.style.height = '100%';
    hiddenInput.style.opacity = '0';
    hiddenInput.style.border = 'none';
    hiddenInput.style.outline = 'none';
    hiddenInput.style.zIndex = '10';
    container.appendChild(hiddenInput);

    const svg = container.querySelector('svg');
    const textPath = svg.querySelector('#curved-text textPath');
    const curvePath = svg.querySelector('#curve');

    let inputText = '';

    container.addEventListener('click', function() {
        hiddenInput.focus();
    });

    hiddenInput.addEventListener('input', function() {
        inputText = hiddenInput.value;
        updateText();
    });

    function updateText() {
        if (inputText === '') {
            textPath.textContent = 'Your email address';
            textPath.setAttribute('fill', '#aaa');
        } else {
            textPath.textContent = inputText;
            textPath.setAttribute('fill', '#000');
        }

        let textLength = textPath.getComputedTextLength();
        const pathLength = curvePath.getTotalLength();

        if (textLength > pathLength) {
            while (textLength > pathLength && inputText.length > 0) {
                inputText = inputText.substring(1);
                hiddenInput.value = inputText;
                textPath.textContent = inputText;
                textLength = textPath.getComputedTextLength();
            }
        }
    }

    hiddenInput.addEventListener('focus', function() {
        svg.querySelector('path').setAttribute('fill', '#d0d0d0');
    });

    hiddenInput.addEventListener('blur', function() {
        svg.querySelector('path').setAttribute('fill', '#e0e0e0');
    });

    svg.style.cursor = 'text';
});