let nameAnimation = lottie.loadAnimation({
    container: document.getElementById('name'), // the dom element that will contain the animation
    name: 'nameAnimation',
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'data.json' // the path to the animation json file
});

const init = () => {
    // Play the animation when the json file is completely loaded.
    // nameAnimation.addEventListener('data_ready', () => lottie.play('nameAnimation'));

    // When animation is completed
    const whenNameCompleted = () => {
        let buttons = document.getElementsByClassName("button");
        [].forEach.call(buttons, (elem) => elem.classList.remove('inactiveLink'));
        // `buttons` is not actually an array so it doesn't have forEach
        /**
         * I wonder if I can just abandon animejs entirely
         * and use css transitions instead, will that be faster/take up less
         * resources?
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