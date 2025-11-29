document.addEventListener('DOMContentLoaded', () => {
    const marker = document.getElementById('marker');
    const tabLinks = document.querySelectorAll('.navbar a');
    const tabContents = document.querySelectorAll('.tab-content');
    const navbarItems = document.querySelectorAll('.navbar li'); 

    const replayAnimation = (contentSection) => {
    const elementsToAnimate = contentSection.querySelectorAll('.fade-in'); 

    elementsToAnimate.forEach((elem, index) => {
        elem.classList.add('no-transition');
        elem.classList.remove('run-fade-in'); 
        
        // Repaint
        void elem.offsetWidth; 
        
        requestAnimationFrame(() => {
            elem.classList.remove('no-transition'); 
            elem.style.transitionDelay = `${index * 0.3}s`; 
            elem.classList.add('run-fade-in');
        });
    });
};

    const runAnimation = (animation) => {
        animation.forEach((elem, index) => {
            elem.classList.remove('run-fade-in'); 
            
            // Repaint
            void elem.offsetWidth; 
            
            requestAnimationFrame(() => {
                elem.style.transitionDelay = `${index * .5}s`; 
                elem.classList.add('run-fade-in');
            });
        });
    };

    // Move marker to selected tab
    const moveMarker = (activeTab) => {
        if (!activeTab) return;

        requestAnimationFrame(() => {
            marker.style.width = `${activeTab.offsetWidth}px`;
            marker.style.transform = `translateX(${activeTab.offsetLeft}px)`;
        });
    };

    // Main
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const clickedLi = e.target.parentElement; 
            const targetId = e.target.getAttribute('href').substring(1); 
            const targetContent = document.getElementById(targetId);

            navbarItems.forEach(li => li.classList.remove('navbarSelected'));
            clickedLi.classList.add('navbarSelected');
            moveMarker(clickedLi); 

   
            tabContents.forEach(content => content.classList.remove('active'));
            if (targetContent) {
                targetContent.classList.add('active');
                replayAnimation(targetContent);
            }
        });
    });
    const initialTab = document.querySelector('.navbarSelected');
    const initialContent = document.querySelector('.tab-content.active');
    
    moveMarker(initialTab);

    if (initialContent) {
        replayAnimation(initialContent);
    }
});