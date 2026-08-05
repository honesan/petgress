import { useEffect, useState, useRef } from "react";

import Dog from "./Dog";
import Stats from "./Stats";
import Stations from "./Stations";
import Status from "./Status";

import usePetAI from "../hooks/usePetAI";
import useMouseFollow from "../hooks/useMouseFollow";

import {
  Position,
  PetAction,
} from "../types";


export default function GameArea() {


  const {
    stats,
    action,
  } = usePetAI();



  const [dogAction, setDogAction] =
    useState<PetAction>("idle");



  const [dogPosition, setDogPosition] =
    useState<Position>({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });



  const [facingLeft, setFacingLeft] =
    useState(false);



  const gameRef =
    useRef<HTMLDivElement>(null);



  const mousePosition =
    useMouseFollow(
      action === "idle"
    );



  const [targetPosition, setTargetPosition] =
    useState<Position | null>(null);



  useEffect(() => {

    if(action !== "idle"){
      return;
    }


    setTargetPosition({
      x: mousePosition.x,
      y: mousePosition.y,
    });


  }, [
    mousePosition,
    action
  ]);



  useEffect(() => {

    if(!targetPosition){
      return;
    }


    const interval =
      setInterval(()=>{


        setDogPosition((current)=>{


          const dx =
            targetPosition.x -
            current.x;


          const dy =
            targetPosition.y -
            current.y;


          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );


          if(distance < 3){
            return current;
          }


          if(dx < 0){
            setFacingLeft(true);
          }
          else{
            setFacingLeft(false);
          }


          return {

            x:
              current.x +
              (dx / distance) * 5,


            y:
              current.y +
              (dy / distance) * 5

          };

        });


      },16);



    return () =>
      clearInterval(interval);


  },[
    targetPosition
  ]);
    /*
    Move dog to a station.
    The dog goes above the dispenser
    instead of behind it.
  */

  function moveToStation(
    position: Position,
    nextAction: PetAction
  ) {

    setDogAction("walking");


    setTargetPosition({
      x: position.x,
      y: position.y - 60,
    });



    const check =
      setInterval(()=>{


        setDogPosition((current)=>{


          const distance =
            Math.sqrt(
              Math.pow(
                position.x - current.x,
                2
              )
              +
              Math.pow(
                (position.y - 60) - current.y,
                2
              )
            );


          if(distance < 10){

            clearInterval(check);


            setDogAction(
              nextAction
            );


            return current;
          }


          return current;

        });


      },100);



    setTimeout(()=>{


      if(nextAction === "eating"){

        setDogAction("eating");

      }


      if(nextAction === "drinking"){

        setDogAction("drinking");

      }


      if(nextAction === "sleeping"){

        setDogAction("sleeping");

      }


    },1500);


  }




  function eat(){

    moveToStation(
      {
        x:80,
        y:window.innerHeight - 120
      },
      "eating"
    );

  }



  function drink(){

    moveToStation(
      {
        x:250,
        y:window.innerHeight - 120
      },
      "drinking"
    );

  }



  function sleep(){

    moveToStation(
      {
        x:window.innerWidth - 120,
        y:window.innerHeight - 120
      },
      "sleeping"
    );

  }




  useEffect(()=>{


    if(action === "eating"){

      eat();

    }


    if(action === "drinking"){

      drink();

    }


    if(action === "sleeping"){

      sleep();

    }


  },[action]);



  /*
    Keep dog inside the screen
  */

  useEffect(()=>{

    setDogPosition((current)=>({

      x: Math.max(
        50,
        Math.min(
          window.innerWidth - 50,
          current.x
        )
      ),

      y: Math.max(
        120,
        Math.min(
          window.innerHeight - 80,
          current.y
        )
      )

    }));


  },[]);



  /*
    Reset dog to center when finished
  */

  useEffect(()=>{


    if(
      dogAction === "eating" ||
      dogAction === "drinking" ||
      dogAction === "sleeping"
    ){

      const timer =
        setTimeout(()=>{

          setDogAction("idle");


        },4000);


      return () =>
        clearTimeout(timer);

    }


  },[
    dogAction
  ]);





  return (

    <div
      ref={gameRef}
      className="
        relative
        w-screen
        h-screen
        overflow-hidden
        bg-gradient-to-b
        from-sky-300
        to-green-300
      "
    >


      {/* Stats */}

      <Stats
        food={stats.food}
        water={stats.water}
        energy={stats.energy}
      />



      {/* Status */}

      <Status
        action={dogAction}
        stats={stats}
      />



      {/* Game field */}


      <div
        className="
          absolute
          inset-0
          z-10
        "
      >



        <Dog

          x={dogPosition.x}

          y={dogPosition.y}

          action={dogAction}

          facingLeft={facingLeft}

        />



      </div>
      {/* Stations */}

      <Stations

        onFoodClick={() => {

          eat();

        }}


        onWaterClick={() => {

          drink();

        }}


        onBedClick={() => {

          sleep();

        }}

      />



      {/* Invisible movement area */}

      <div

        className="
          absolute
          inset-0
          z-0
        "

      />



    </div>

  );

}
