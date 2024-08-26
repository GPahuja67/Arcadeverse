document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const images = [
        "file:///C:/Users/ASUS/Desktop/college/Subjects/Sem3/FEE/project/images/cardmemorymatch3.jpg",
        "file:///C:/Users/ASUS/Desktop/college/Subjects/Sem3/FEE/project/images/tictactoe5.png",
        "file:///C:/Users/ASUS/Desktop/college/Subjects/Sem3/FEE/project/images/typingmaster5.png"
    ];

    const slideshowImage = document.getElementById('slideshow-image');
    const indicators = document.querySelectorAll('.indicator');

    let currentIndex = 0;
    let isTransitioning = false;
    const fadeDuration = 1000; // Duration of fade transitions in milliseconds

    function changeImage() {
        if (isTransitioning) return;

        isTransitioning = true;
        slideshowImage.classList.add('fade-out');

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            slideshowImage.src = images[currentIndex];
            slideshowImage.classList.remove('fade-out');
            slideshowImage.classList.add('fade-in');

            setTimeout(() => {
                slideshowImage.classList.remove('fade-in');
                isTransitioning = false;
            }, fadeDuration);
        }, fadeDuration);

        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function handleIndicatorClick(event) {
        console.log('Indicator clicked');

        if (isTransitioning) return;

        const clickedIndex = Array.from(indicators).indexOf(event.target);
        if (clickedIndex !== -1 && clickedIndex !== currentIndex) {
            currentIndex = clickedIndex;
            isTransitioning = true;

            slideshowImage.classList.add('fade-out');

            setTimeout(() => {
                slideshowImage.src = images[currentIndex];
                slideshowImage.classList.remove('fade-out');
                slideshowImage.classList.add('fade-in');

                setTimeout(() => {
                    slideshowImage.classList.remove('fade-in');
                    isTransitioning = false;
                }, fadeDuration);
            }, fadeDuration);

            updateIndicators();
        }
    }

    indicators.forEach(indicator => {
        console.log('Adding click listener');
        indicator.addEventListener('click', handleIndicatorClick);
    });

    setInterval(changeImage, 3000); // Change image every 3 seconds

    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });
});
