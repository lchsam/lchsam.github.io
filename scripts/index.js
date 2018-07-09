let nameAnimation = lottie.loadAnimation({
    container: document.getElementById('name'), // the dom element that will contain the animation
    name: 'nameAnimation',
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'data.json' // the path to the animation json
});

// Play the animation when the json file is completely loaded.
nameAnimation.addEventListener('data_ready', () => lottie.play('nameAnimation'));

// When animation is completed
const whenNameCompleted = () => {
    let buttons = document.getElementsByClassName("button");
    [].forEach.call(buttons, (elem) => elem.classList.remove('inactiveLink'));
    // buttons is not actually an array so it doesn't have forEach
    let animationTimeline = anime.timeline();
    animationTimeline.add({
        targets: '#name',
        scale: '0.8',
        translateY: -50,
        easing: 'easeOutExpo',
    }).add({
        targets: ['.description', '.button'],
        translateY: -50,
        opacity: 1,
        easing: 'easeOutExpo',
        offset: 100,
        delay: (target, index) => index * 80,
    });
};

nameAnimation.addEventListener('complete', whenNameCompleted);