const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
  constructor(hatsAndHoles, field) {
    this._field=field;
    this._hatsAndHoles=hatsAndHoles;
  }

  playGame() {
    let gameOver=false;
    //let playerX=0;
    //let playerY=0;
    //this._playerX=playerX;
    //this.playerY=playerY;
    let y=0;
    let x=0;
    this.print(this._field);

    while(/*this._hatsAndHoles[y][x] !== pathCharacter || this._hatsAndHoles !== fieldCharacter*/gameOver===false) {
      const direction=prompt("Which direction would you like to move? N for North, S for South, W for West, and E for East");

      if(direction.toUpperCase() === 'N') {
        if( y===0) {
          console.log("Sorry, You can't go further North. Try Again");
          gameOver=true;
        } else {
          y-=1;
        }
      }

       else if(direction.toUpperCase() === 'S') {
        if( y >= this._field.length) {
          console.log("Sorry, You can't go further South. Try Again");
          gameOver=true;
        } else {
          y+=1;
        }
      }

      else if(direction.toUpperCase() === 'W') {
        if( x===0) {
          console.log("Sorry, You can't go further West. Try Again");
          gameOver=true;
        } else {
          x-=1;
        }
      }

      else if(direction.toUpperCase() === 'E') {
        if( x>=this._field[y].length) {
          console.log("Sorry, You can't go further East. Try Again");
          gameOver=true;
        } else {
          x+=1
        }
      }

      else {
        console.log("Invalid Entry. Please enter N,S,E,W")
      }

      if(this._hatsAndHoles[y][x] === hat) {
        console.log("You found the hat! You win!")
        gameOver=true;
      }
      else if(this._hatsAndHoles[y][x] === hole) {
        console.log("You fell in a hole. Game Over.")
        gameOver=true;
      }
      else {
        this._field[y][x]=pathCharacter;
        this.print(this._field);
      }
    }
  }

  print() {
    for(let row of this._field) {
      console.log(row.join(' '));
    }
  }
  
  static generateField(height, width, holes) {
    let newField=[];
    for (let i=0; i< height; i++) {
      newField.push([]);
      for( let j=0; j< height; j++) {
        newField[i].push(fieldCharacter)
      };
    };
    newField[0][0] = pathCharacter;
    let hatX = Math.floor(Math.random()*width);
    let hatY = Math.floor(Math.random()*height);
    newField[hatY][hatX]=hat;

    for( let k=holes; k> 0; k--) {
      let holeX=hatX;
      let holeY=hatY;
      while(holeX===hatX) {
        holeX=Math.floor(Math.random()*width)
      };
      while(holeY===hatY) {
        holeY=Math.floor(Math.random()*height)
      };
      newField[holeY][holeX] = hole;
    }
    return newField;
  }

  static generateBlankField(height, width) {
    let newField=[];
    for(let i=0; i<height; i++) {
      newField.push([]);
      for(let j=0; j< height; j++) {
        newField[i].push(fieldCharacter)
      };
    };
    newField[0][0]=pathCharacter;
    return newField;
  }
}


let myField;

const blankField= Field.generateBlankField(5, 5);

const newField=Field.generateField(5, 5, 1)
console.log(blankField);

myField= new Field(newField, blankField);

myField.playGame()
