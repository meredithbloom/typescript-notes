import { getObstacleEvents } from './computer-vision';


interface Events {
  [obstacle: string]: boolean;
}

interface AutonomousCarProps {
  isRunning?: boolean;
  steeringControl: Steering;
}

interface AutonomousCar {
  isRunning?: boolean;
  respond: (events: Events) => void;
}

interface Control {
  execute: (command: string) => void;
}

interface Steering extends Control {
  turn: (direction: string) => void;
}

class SteeringControl implements Steering {
  execute(command: string) {
    return `Executing: ${command}`;
  }
  turn(direction: string) {
    return console.log(this.execute("turn ") + direction);
  }
}

class Car implements AutonomousCar {
  isRunning;
  steeringControl;

  constructor(props: AutonomousCarProps) {
    this.isRunning = props.isRunning;
    this.steeringControl = props.steeringControl;
  }

  respond(events: Events) {
    if (!this.isRunning) {
      return console.log('Car is off');
    }
    Object.keys(events).forEach((eventKey) => {
      if (!eventKey) {
        return;
      } else if (eventKey === 'ObstacleLeft') {
        this.steeringControl.turn("right");
      } else if (eventKey === 'ObstacleRight') {
        this.steeringControl.turn("left");
      }
    })
  }
}

const steering = new SteeringControl();
steering.turn('right');

const autonomousCar = new Car({isRunning: true, steeringControl: steering});

autonomousCar.respond(getObstacleEvents());