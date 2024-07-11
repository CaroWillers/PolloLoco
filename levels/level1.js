let level1;
let level_end_x = 3500;

function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new Endboss()
        ],
        generateClouds(),
        generateInitialBackgroundObjects(), 
        [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins()
        ],
        [
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles()
        ]
    ); 
}


function generateClouds(world) {
    let clouds = [];
    let segmentWidth = 719;
    let cloudCount = Math.ceil(level_end_x / segmentWidth);

    for (let i = 0; i < cloudCount; i++) {
        const cloud = new Cloud(world);
        cloud.x = i * segmentWidth;  
        clouds.push(cloud);
    }

    return clouds;
}

function generateInitialBackgroundObjects() {
    let segmentWidth = 719;
    let initialRepeats = 5; // Initial number of times to repeat the background
    let backgroundObjects = [];

    for (let i = 0; i < initialRepeats; i++) {
        addBackgroundSegment(backgroundObjects, i * segmentWidth * 2); // *2 to account for two sets of layers
    }

    return backgroundObjects;
}

function addBackgroundSegment(backgroundObjects, offsetX) {
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
        backgroundObjects.push(new BackgroundObject(layer, offsetX));
    });

    offsetX += 719; // Move to the next segment for the second set of layers

    layers2.forEach(layer => {
        backgroundObjects.push(new BackgroundObject(layer, offsetX));
    });
}
 
initLevel();
