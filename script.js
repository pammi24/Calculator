let show = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('btn'));
let cursorPosition = 0;


function updateCursorPosition() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        cursorPosition = range.startOffset;
    } else {
        cursorPosition = show.innerText.length;
    }
}


show.addEventListener('click', function () {
    updateCursorPosition();
});


buttons.map((btn) => {
    btn.addEventListener('click', value);
});

function value(e) {
    let key = e.target.innerText;

    if (key === 'AC') {
        show.innerText = '';
        cursorPosition = 0;
    } else if (key === '=') {
        try {
           
            show.innerText = eval(show.innerText.replace(/\^/g, '**'));
            cursorPosition = show.innerText.length;
        } catch {
            show.innerText = 'Error';
            cursorPosition = 0;
        }
    } else if (key === 'del') {
        updateCursorPosition();
        deleteCharacter();
    } else if (key === 'sqrt') {
        try {
            
            show.innerText = Math.sqrt(eval(show.innerText)).toString();
            cursorPosition = show.innerText.length;
        } catch {
            show.innerText = 'Error';
            cursorPosition = 0;
        }
    } else if (key === '**') {
        
        let currentText = show.innerText;
        if (cursorPosition === currentText.length) {
            show.innerText = currentText + '**';
        } else {
            let leftPart = currentText.slice(0, cursorPosition);
            let rightPart = currentText.slice(cursorPosition);
            show.innerText = leftPart + '**' + rightPart;
        }
        cursorPosition += '**'.length;
    } else {
        
        show.innerText = show.innerText.slice(0, cursorPosition) + key + show.innerText.slice(cursorPosition);
        cursorPosition += key.length;
    }

    adjustFontSize();
}

function deleteCharacter() {
    if (cursorPosition > 0) {
        
        show.innerText = show.innerText.slice(0, cursorPosition - 1) + show.innerText.slice(cursorPosition);
        cursorPosition--;
        
        setCursorPosition(cursorPosition);
    }
}

function setCursorPosition(position) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(show.firstChild, position);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
}

function adjustFontSize() {
    const maxFontSize = 30;
    const minFontSize = 10;
    let fontSize = maxFontSize;

    while (show.scrollHeight > show.clientHeight && fontSize > minFontSize) {
        fontSize--;
        show.style.fontSize = fontSize + 'px';
    }

    if (show.scrollHeight <= show.clientHeight && fontSize < maxFontSize) {
        while (show.scrollHeight <= show.clientHeight && fontSize < maxFontSize) {
            fontSize++;
            show.style.fontSize = fontSize + 'px';
        }
        fontSize--;
        show.style.fontSize = fontSize + 'px';
    }
}


show.addEventListener('input', function () {
    updateCursorPosition();
});