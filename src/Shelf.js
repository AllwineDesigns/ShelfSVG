import React, { Component } from 'react';
import Sheet from './Sheet.js';

class Shelf extends Component {
  constructor(props) {
    super(props);

    this.sheets = [];
  }

  getSVGContent = () => {
    return this.sheets.filter((sheet) => sheet).map((sheet) => sheet.getSVGContent());
  };
  getFilenames = () => {
    return this.sheets.filter((sheet) => sheet).map((sheet) => sheet.getFilename());
  };

  render() {
    const { dimensions, boards, sheets, units } = this.props;
    console.log(dimensions);

    let sheetComps = sheets.map( (sheet, i) => (
      <Sheet ref={((i) => (sheet) => this.sheets[i] = sheet)(i)} boards={boards} dimensions={dimensions} sheet={sheet} units={units} key={i} label={"Sheet " + (i+1)} filename={"sheet" + (i+1) + ".svg"}/>
      ));

    if(dimensions.dadoDepth > 0 && dimensions.leftShelfHeight2 && dimensions.rightShelfHeight2) {
      // we have shelf dados for both sides of the middle board so we need to add an extra seet for the right side

      let middleBoard = {
        id: "middle"
      };
      sheets.forEach( (sheet) => {
        sheet.forEach((board) => { 
          if(board.id === "middle") {
            middleBoard.x = 0;
            middleBoard.y = 0;
            middleBoard.w = board.w;
            middleBoard.h = board.h;
            middleBoard.label = board.label;
          }
        });
      });

      let middleDimensions = {};
      for(let dim in dimensions) {
        if(!dim.startsWith("leftShelf")) {
          middleDimensions[dim] = dimensions[dim];
        }
      }
      middleDimensions.sheetWidth = middleBoard.w;
      middleDimensions.sheetHeight = middleBoard.h;

      sheetComps.push(
        <Sheet displayPercentage={(100*middleBoard.w/dimensions.sheetWidth) + "%"} ref={((i) => (sheet) => this.sheets[i] = sheet)(sheetComps.length)} boards={ { middle: middleBoard } } dimensions={middleDimensions} sheet={[ middleBoard ]} units={units} key={sheetComps.length} label={"Middle (Right Side)"} filename={"middleRightSide.svg"}/>
      );
    }


    return (
    <div>
     {sheetComps}
    </div>
    );
  }
}

export default Shelf;
