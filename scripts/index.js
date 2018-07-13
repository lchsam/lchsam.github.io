const init = () => {
    let nameAnimation = lottie.loadAnimation({
        container: document.getElementById('name'), // the dom element that will contain the animation
        name: 'nameAnimation',
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'data.json' // the path to the animation json file
    });
    // Play the animation when the json file is completely loaded.
    nameAnimation.addEventListener('data_ready', () => lottie.play('nameAnimation'));

    // When animation is completed
    const whenNameCompleted = () => {
        let buttons = document.getElementsByClassName("button");
        [].forEach.call(buttons, (elem) => elem.classList.remove('inactiveLink'));
        // `buttons` is not actually an array so it doesn't have forEach
        /**
         * I can use CSS transitions to do this but
         * AnimeJS makes it really easy. The delays
         * for the transitions would be a bit to deal with 
         * if I use CSS transitions.
         */
        let animationTimeline = anime.timeline();
        animationTimeline.add({
            targets: '#name',
            translateY: [110, 0], // start at 110
            scale: '0.8',
            easing: 'easeOutExpo',
        }).add({
            targets: ['.description', '.button'],
            translateY: [50, 0],
            opacity: 1,
            easing: 'easeOutExpo',
            offset: 80,
            delay: (target, index) => index * 80,
        });
    };
    
    nameAnimation.addEventListener('complete', whenNameCompleted);
};

window.onload = init;