window.addEventListener('pageshow', function(event) {
    const fadeInAnim = document.querySelector('.fade-in');
    if (fadeInAnim) {
        if (event.persisted) {
            fadeInAnim.classList.add('fade-in');
        }
        setTimeout(function() {
            fadeInAnim.classList.remove('fade-in');
        }, 0); 
    }
});


window.addEventListener('load', () => {
    const marker = document.querySelector('#marker');
    const items = document.querySelectorAll('.navbar li');
    
    const ANIMATION_DURATION = 400; 
    const CSS_TRANSITION = `transform ${ANIMATION_DURATION / 1000}s ease-in-out, width ${ANIMATION_DURATION / 1000}s ease-in-out`;
    const NO_TRANSITION = 'none';

    let currentActiveItem = document.querySelector('.navbarSelected');

    function moveIndicator(element) {
        marker.style.transform = `translateX(${element.offsetLeft}px)`; 
        marker.style.width = element.offsetWidth + 'px';
    }


    if (currentActiveItem) {
        marker.style.transition = NO_TRANSITION; 
        moveIndicator(currentActiveItem);
        window.getComputedStyle(marker).transform; 
        marker.style.transition = CSS_TRANSITION;
    }

    items.forEach(link => {
        link.addEventListener('click', (e) => {
            
            const linkElement = e.currentTarget.querySelector('a');
  
            e.preventDefault(); 
            
            if (e.currentTarget !== currentActiveItem) {
                if (currentActiveItem) {
                    currentActiveItem.classList.remove('navbarSelected');
                }
                e.currentTarget.classList.add('navbarSelected');
                moveIndicator(e.currentTarget);
   
                currentActiveItem = e.currentTarget;

                if (linkElement && linkElement.href && linkElement.getAttribute('href') !== '#') {
                     setTimeout(() => {
                         window.location.href = linkElement.href;
                     }, ANIMATION_DURATION);
                }
                
            } else {
                 if (linkElement && linkElement.href && linkElement.getAttribute('href') !== '#') {
                      window.location.href = linkElement.href;
                 }
            }
        });
    });
});