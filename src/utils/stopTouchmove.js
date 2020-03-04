export function stopTouchMove(el) {

    document.querySelector(el).addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, false);
}

