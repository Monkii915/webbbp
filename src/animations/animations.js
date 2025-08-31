// filepath: /modern-web-app/modern-web-app/src/animations/animations.js

function fadeIn(element, duration) {
    element.style.opacity = 0;
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 1;
}

function slideIn(element, duration) {
    element.style.transform = 'translateX(-100%)';
    element.style.transition = `transform ${duration}ms`;
    element.style.transform = 'translateX(0)';
}

function bounce(element, duration) {
    element.style.animation = `bounce ${duration}ms`;
}

document.addEventListener('DOMContentLoaded', () => {
    const elementsToFadeIn = document.querySelectorAll('.fade-in');
    elementsToFadeIn.forEach(el => fadeIn(el, 1000));

    const elementsToSlideIn = document.querySelectorAll('.slide-in');
    elementsToSlideIn.forEach(el => slideIn(el, 1000));

    const elementsToBounce = document.querySelectorAll('.bounce');
    elementsToBounce.forEach(el => bounce(el, 1000));

    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        el.style.animationDelay = `${Math.random() * 0.5 + 0.2}s`;
    });
});