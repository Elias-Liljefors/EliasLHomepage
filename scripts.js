Promise.all([
    fetch('header.html').then(r => r.text()),
    fetch('footer.html').then(r => r.text())
]).then(([headerHTML, footerHTML]) => {
    document.getElementById('header-placeholder').innerHTML = headerHTML;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
}).then(() => {
    // Keep main content below header
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    if (!header || !main) return;
    
    function update(){
        const headerHeight = header.getBoundingClientRect().height;
        main.style.marginTop = headerHeight + 'px';
    }
    update();
    
    if (window.ResizeObserver) {
        new ResizeObserver(update).observe(header);
    }
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
});

// Scroll to top button
const mybutton = document.getElementById("TopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.classList.add('show');
    } else {
        mybutton.classList.remove('show');
    }
};

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Scroll animation for sections
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Start slightly before element enters viewport
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});