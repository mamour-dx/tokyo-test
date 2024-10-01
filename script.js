document.addEventListener("scroll", () => {
    const element = document.querySelector('.zoom-in1');
    const rect = element.getBoundingClientRect();

    if (
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight
    ) {
        element.classList.add('visible');
    }
});
