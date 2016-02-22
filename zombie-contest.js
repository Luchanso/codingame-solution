/**
 * Save humans, destroy zombies!
 **/

let hero = {};
let humans = [];
let zombies = [];

let lastTarget = null;
let lastHeroSpeedX = 0;
let lastHeroSpeedY = 0;
let isFixation = false;

// game loop
while (true) {
    hero = getHero();
    humans = getHumans();
    zombies = getZombies();

    let danger = getMoreDangerZombie();
    danger = saveAction(danger);

    setTarget({x:danger.x, y: danger.y});
}

function saveAction(danger) {
    if (isFixation) {
        danger = lastTarget;
        return danger;
    }
    if (lastTarget == null) {
        lastTarget = danger;
    }
    let human = danger.target;
    let zombie = danger;

    let zombieTime = dist({x: zombie.x, y: zombie.y}, {x: human.x, y: human.y}) / zombie.speed;
    let heroTime = (dist({x: hero.x, y: hero.y}, {x: human.x, y: human.y}) - hero.radius) / hero.speed;

    if (zombieTime < heroTime) {
        danger = getMoreSaveHuman();
        lastTarget = danger;
    }
    
    return danger;
}

function getMoreSaveHuman() {
    isFixation = true;
    
    for (var i = 0; i < humans.length; i++) {
        let human = humans[i];
        let itsSaveble = true;
        for (var j = 0; j < humans[i].enemys.length; j++) {
            let zombie = humans[i].enemys[j];
            
            let zombieTime = dist({x: zombie.x, y: zombie.y}, {x: human.x, y: human.y}) / zombie.speed;
            let heroTime = (dist({x: hero.x, y: hero.y}, {x: human.x, y: human.y}) - hero.radius) / hero.speed;            
            printErr('zombieTime: ' + zombieTime);
            printErr('heroTime: ' + heroTime);
            
            if (zombieTime < heroTime) {
                itsSaveble = false;
                break;
            }
        };
        if (itsSaveble) {
            return human;
        }
    };

    printErr('Not found saveble human - all DIE :C');
}

function refreshZombie(zombieId) {
    for (var i = 0; i < zombies.length; i++) {
        if (zombies[i].id == zombieId) {
            return zombies[i];
        }
    };
}

function getMoreDangerZombie() {

    let minTarget = null;
    for (var i = 0; i < zombies.length; i++) {
        let zombie = zombies[i];

        if (zombie.target.type == 'human') {
            if (minTarget == null) {
                minTarget = zombies[0];
            }

            if (minTarget.distance > zombie.distance) {
                minTarget = zombie;
            }
        } else {
            if (minTarget == null) {
                minTarget = zombies[0];
            }
        }
    };

    return minTarget;
}

function dist(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function setTarget(point) {
    print(point.x, point.y);
}

function getHero() {
    let hero = { };
    let inputs = readline().split(' ');
    hero.x = parseInt(inputs[0]);
    hero.y = parseInt(inputs[1]);
    hero.type = 'hero';
    hero.speed = 999.19;
    hero.enemys = [];
    hero.radius = 2000;

    return hero;
}

function getHumans() {
    let humans = [ ];
    let humanCount = parseInt(readline());
    for (let i = 0; i < humanCount; i++) {
        let human = { };

        let inputs = readline().split(' ');
        human.id = parseInt(inputs[0]);
        human.x = parseInt(inputs[1]);
        human.y = parseInt(inputs[2]);
        human.type = 'human';
        human.enemys = [];

        humans.push(human);
    }

    return humans;
}

function getZombies() {
    let zombies = [ ];
    let zombieCount = parseInt(readline());
    for (let i = 0; i < zombieCount; i++) {
        let inputs = readline().split(' ');
        let zombie = {};
        zombie.id = parseInt(inputs[0]);
        zombie.x = parseInt(inputs[1]);
        zombie.y = parseInt(inputs[2]);
        zombie.xNext = parseInt(inputs[3]);
        zombie.yNext = parseInt(inputs[4]);
        zombie.target = calcTarget(zombie);
        zombie.target.enemys.push(zombie);
        zombie.distance = dist({
            x: zombie.target.x,
            y: zombie.target.y
        }, {
            x: zombie.x,
            y: zombie.y
        });
        zombie.speed = Math.sqrt(Math.pow(zombie.x - zombie.xNext, 2) + Math.pow(zombie.y - zombie.yNext, 2));

        zombies.push(zombie);
    }

    return zombies;
}

function calcTarget(zombie) {
    let zombiePoint = {
        x: zombie.x,
        y: zombie.y
    };

    let zombiePointNext = {
        x: zombie.xNext,
        y: zombie.yNext
    };

    let heroPoint = {
        x: hero.x,
        y: hero.y
    }

    if (C3POOLn(zombiePoint, zombiePointNext, heroPoint)) {
        return hero;
    } else {
        for (var i = 0; i < humans.length; i++) {
            let humanPoint = {
                x: humans[i].x,
                y: humans[i].y
            };
            if (C3POOLn(zombiePoint, zombiePointNext, humanPoint)) {
                return humans[i];
            }
        };
    }

    /*printErr('h:' + humans[0].x + ':' + humans[0].y);
    printErr('z: ' + zombiePoint.x + ':' + zombiePoint.y);
    printErr('zn: ' + zombiePointNext.x + ':' + zombiePointNext.y);
    printErr('Not found target :c');*/
    return humans[0];
}

function C3POOLn(p1, p2, p3) {
    let calc = (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    // printErr('calc: ' + calc);
    return (Math.abs(calc) < 10000);
}

function getSpeed() {
    let speed = Math.sqrt(Math.pow(hero.x - lastHeroSpeedX, 2) + Math.pow(hero.y - lastHeroSpeedY, 2));
    lastHeroSpeedX = hero.x;
    lastHeroSpeedY = hero.y;
    printErr(speed);
}