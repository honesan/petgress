/* ==========================================================
   Petgress
   script.js
   Part 1 / 4

   - DOM setup
   - Pet stats
   - Game variables
   - Helper functions
========================================================== */


/* ==========================
   DOM Elements
========================== */


const dog = document.getElementById("dog");

const gameArea = document.getElementById("gameArea");


// Progress bars

const foodBar = document.getElementById("foodBar");
const waterBar = document.getElementById("waterBar");
const energyBar = document.getElementById("energyBar");


// Text

const foodText = document.getElementById("foodText");
const waterText = document.getElementById("waterText");
const energyText = document.getElementById("energyText");

const currentActionText =
    document.getElementById("currentAction");

const lowestNeedText =
    document.getElementById("lowestNeed");


// Stations

const foodStation =
    document.getElementById("foodStation");

const waterStation =
    document.getElementById("waterStation");

const bedStation =
    document.getElementById("bedStation");


// Buttons

const feedBtn =
    document.getElementById("feedBtn");

const waterBtn =
    document.getElementById("waterBtn");

const sleepBtn =
    document.getElementById("sleepBtn");

const resetBtn =
    document.getElementById("resetBtn");




/* ==========================
   Pet Stats
========================== */


let pet = {

    food: 100,

    water: 100,

    energy: 100

};




/* ==========================
   Game State
========================== */


let state = "following";

let busy = false;


/*

following = follows mouse

walking = moving to station

eating = eating

drinking = drinking

sleeping = sleeping

*/




/* ==========================
   Dog Position
========================== */


let dogPosition = {

    x: 300,

    y: 250

};


let targetPosition = {

    x: 300,

    y: 250

};



const dogSpeed = 3;


let gameBounds;




function updateBounds(){

    gameBounds =
        gameArea.getBoundingClientRect();

}



updateBounds();


window.addEventListener(
    "resize",
    updateBounds
);




/* ==========================
   Helper Functions
========================== */


function clamp(
    value,
    min,
    max
){

    return Math.max(
        min,
        Math.min(
            value,
            max
        )
    );

}





function setAction(text){

    currentActionText.textContent =
        text;

}





function updateStats(){


    pet.food =
        clamp(
            pet.food,
            0,
            100
        );


    pet.water =
        clamp(
            pet.water,
            0,
            100
        );


    pet.energy =
        clamp(
            pet.energy,
            0,
            100
        );



    foodBar.style.width =
        pet.food + "%";


    waterBar.style.width =
        pet.water + "%";


    energyBar.style.width =
        pet.energy + "%";



    foodText.textContent =
        Math.round(pet.food) + "%";


    waterText.textContent =
        Math.round(pet.water) + "%";


    energyText.textContent =
        Math.round(pet.energy) + "%";


}





/* ==========================
   Start
========================== */


dog.style.left =
    dogPosition.x + "px";


dog.style.top =
    dogPosition.y + "px";


updateStats();


setAction(
    "Following Cursor"
);


/* ==========================
   End Part 1
========================== */
/* ==========================================================
   Petgress
   script.js
   Part 2 / 4

   - Mouse follow
   - Touch follow
   - Dog movement
   - Station movement
========================================================== */


/* ==========================
   Mouse Follow
========================== */


gameArea.addEventListener(
    "mousemove",
    (event)=>{


        if(
            busy ||
            state !== "following"
        ){

            return;

        }


        targetPosition.x =
            event.clientX -
            gameBounds.left;


        targetPosition.y =
            event.clientY -
            gameBounds.top;


    }
);





/* ==========================
   Touch Follow
========================== */


gameArea.addEventListener(
    "touchmove",
    (event)=>{


        if(
            busy ||
            state !== "following"
        ){

            return;

        }


        event.preventDefault();


        const touch =
            event.touches[0];


        targetPosition.x =
            touch.clientX -
            gameBounds.left;


        targetPosition.y =
            touch.clientY -
            gameBounds.top;


    },
    {
        passive:false
    }
);





/* ==========================
   Move Dog
========================== */


function moveDog(){


    const dx =
        targetPosition.x -
        dogPosition.x;


    const dy =
        targetPosition.y -
        dogPosition.y;



    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );



    if(
        distance > 2
    ){


        dogPosition.x +=
            (dx / distance) *
            dogSpeed;


        dogPosition.y +=
            (dy / distance) *
            dogSpeed;



        dog.classList.add(
            "walk"
        );


    }
    else{


        dog.classList.remove(
            "walk"
        );


    }



    // Keep dog inside game area

    dogPosition.x =
        clamp(
            dogPosition.x,
            40,
            gameArea.clientWidth - 40
        );


    dogPosition.y =
        clamp(
            dogPosition.y,
            40,
            gameArea.clientHeight - 40
        );



    dog.style.left =
        dogPosition.x + "px";


    dog.style.top =
        dogPosition.y + "px";


}





/* ==========================
   Get Station Location
========================== */


function getStationPosition(
    station
){


    const rect =
        station.getBoundingClientRect();



    return {

        x:
            rect.left -
            gameBounds.left +
            rect.width / 2,


        y:
            rect.top -
            gameBounds.top +
            rect.height / 2

    };


}





/* ==========================
   Walk To Station
========================== */


function walkToStation(
    station
){


    return new Promise(
        resolve=>{


            const position =
                getStationPosition(
                    station
                );



            targetPosition.x =
                position.x;


            targetPosition.y =
                position.y;



            state =
                "walking";



            const check =
                setInterval(
                    ()=>{


                        const dx =
                            position.x -
                            dogPosition.x;


                        const dy =
                            position.y -
                            dogPosition.y;



                        const distance =
                            Math.sqrt(
                                dx * dx +
                                dy * dy
                            );



                        if(
                            distance < 20
                        ){


                            clearInterval(
                                check
                            );


                            dog.classList.remove(
                                "walk"
                            );


                            resolve();

                        }


                    },
                    50
                );


        }
    );

}





/* ==========================
   Game Loop
========================== */


function gameLoop(){


    if(
        state === "following" ||
        state === "walking"
    ){

        moveDog();

    }



    requestAnimationFrame(
        gameLoop
    );


}



gameLoop();



/* ==========================
   End Part 2
========================== */
/* ==========================================================
   Petgress
   script.js
   Part 3 / 4

   - Eating
   - Drinking
   - Sleeping
   - Automatic needs AI
========================================================== */


/* ==========================
   Wait
========================== */


function wait(ms){

    return new Promise(
        resolve =>
            setTimeout(resolve, ms)
    );

}





/* ==========================
   Eat
========================== */


async function eat(){


    if(busy) return;


    busy = true;


    setAction(
        "Walking to Food"
    );


    await walkToStation(
        foodStation
    );



    state =
        "eating";



    setAction(
        "Eating"
    );



    dog.textContent =
        "🐶🍖";



    while(
        pet.food < 100
    ){


        pet.food += 2;


        updateStats();


        await wait(100);


    }



    dog.textContent =
        "🐕";



    busy = false;


    state =
        "following";


    setAction(
        "Following Cursor"
    );


}






/* ==========================
   Drink
========================== */


async function drink(){


    if(busy) return;


    busy = true;


    setAction(
        "Walking to Water"
    );


    await walkToStation(
        waterStation
    );



    state =
        "drinking";



    setAction(
        "Drinking"
    );



    dog.textContent =
        "🐶💧";



    while(
        pet.water < 100
    ){


        pet.water += 2;


        updateStats();


        await wait(100);


    }



    dog.textContent =
        "🐕";



    busy = false;


    state =
        "following";


    setAction(
        "Following Cursor"
    );


}







/* ==========================
   Sleep
========================== */


async function sleepPet(){


    if(busy) return;


    busy = true;


    setAction(
        "Walking to Bed"
    );


    await walkToStation(
        bedStation
    );



    state =
        "sleeping";



    setAction(
        "Sleeping"
    );



    dog.textContent =
        "🐶💤";



    while(
        pet.energy < 100
    ){


        pet.energy += 2;


        updateStats();


        await wait(100);


    }



    dog.textContent =
        "🐕";



    busy = false;


    state =
        "following";


    setAction(
        "Following Cursor"
    );


}






/* ==========================
   Slowly Decrease Stats
========================== */


setInterval(
    ()=>{


        if(
            state !== "eating"
        ){

            pet.food -= 0.03;

        }



        if(
            state !== "drinking"
        ){

            pet.water -= 0.03;

        }



        if(
            state !== "sleeping"
        ){

            pet.energy -= 0.02;

        }



        updateStats();


    },
    1000
);







/* ==========================
   Lowest Need
========================== */


function getLowestNeed(){


    const needs = {

        Food: pet.food,

        Water: pet.water,

        Energy: pet.energy

    };



    let lowest =
        "Food";



    for(
        let item in needs
    ){


        if(
            needs[item] <
            needs[lowest]
        ){

            lowest = item;

        }


    }



    lowestNeedText.textContent =
        lowest;



    return lowest;


}







/* ==========================
   Automatic Pet AI
========================== */


function checkAI(){


    if(
        busy
    ){

        return;

    }



    const need =
        getLowestNeed();




    if(
        need === "Food" &&
        pet.food < 35
    ){

        eat();

    }



    else if(
        need === "Water" &&
        pet.water < 35
    ){

        drink();

    }



    else if(
        need === "Energy" &&
        pet.energy < 35
    ){

        sleepPet();

    }


}



setInterval(
    checkAI,
    1000
);





/* ==========================
   End Part 3
========================== */

/* ==========================================================
   Petgress
   script.js
   Part 4 / 4

   - Buttons
   - Reset
   - Final setup
========================================================== */


/* ==========================
   Buttons
========================== */


feedBtn.addEventListener(
    "click",
    ()=>{

        pet.food = 100;

        updateStats();

        setAction(
            "Eating"
        );

    }
);



waterBtn.addEventListener(
    "click",
    ()=>{

        pet.water = 100;

        updateStats();

        setAction(
            "Drinking"
        );

    }
);



sleepBtn.addEventListener(
    "click",
    ()=>{

        pet.energy = 100;

        updateStats();

        setAction(
            "Sleeping"
        );

    }
);





/* ==========================
   Reset Button
========================== */


resetBtn.addEventListener(
    "click",
    ()=>{


        pet.food = 100;

        pet.water = 100;

        pet.energy = 100;



        state =
            "following";


        busy =
            false;



        dog.textContent =
            "🐕";



        dogPosition.x =
            gameArea.clientWidth / 2;


        dogPosition.y =
            gameArea.clientHeight / 2;



        targetPosition.x =
            dogPosition.x;


        targetPosition.y =
            dogPosition.y;



        dog.style.left =
            dogPosition.x + "px";


        dog.style.top =
            dogPosition.y + "px";



        updateStats();



        setAction(
            "Following Cursor"
        );


    }
);







/* ==========================
   Start Position
========================== */


window.addEventListener(
    "load",
    ()=>{


        updateBounds();



        dogPosition.x =
            gameArea.clientWidth / 2;


        dogPosition.y =
            gameArea.clientHeight / 2;



        targetPosition.x =
            dogPosition.x;


        targetPosition.y =
            dogPosition.y;



        dog.style.left =
            dogPosition.x + "px";


        dog.style.top =
            dogPosition.y + "px";



        updateStats();


        setAction(
            "Following Cursor"
        );


    }
);





/* ==========================================================
   Petgress script.js Complete
========================================================== */