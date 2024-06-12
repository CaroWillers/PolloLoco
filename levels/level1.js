const level1 = new Level();
const enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
];

const clouds = [
    new Cloud(),
];

const backgroundObjects = [];  
 

function generateInitialBackgroundObjects(level) {
    const segmentWidth = 719;
    const initialRepeats = 10; // Initial number of times to repeat the background

    for (let i = 0; i < initialRepeats; i++) {
        addBackgroundSegment(level, i * segmentWidth * 2); // *2 to account for two sets of layers
    }
}

function addBackgroundSegment(level, offsetX) {
    const layers1 = [
        'img/5_background/layers/air.png',
        'img/5_background/layers/3_third_layer/1.png',
        'img/5_background/layers/2_second_layer/1.png',
        'img/5_background/layers/1_first_layer/1.png'
    ];

    const layers2 = [
        'img/5_background/layers/air.png',
        'img/5_background/layers/3_third_layer/2.png',
        'img/5_background/layers/2_second_layer/2.png',
        'img/5_background/layers/1_first_layer/2.png'
    ];

    layers1.forEach(layer => {
        level.backgroundObjects.push(new BackgroundObject(layer, offsetX));
    });

    offsetX += 719; // Move to the next segment for the second set of layers

    layers2.forEach(layer => {
        level.backgroundObjects.push(new BackgroundObject(layer, offsetX));
    });
}

// Generate initial background objects for level1
generateInitialBackgroundObjects(level1);

    