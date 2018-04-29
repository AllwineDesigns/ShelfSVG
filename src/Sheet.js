import React, { Component } from 'react';

const exteriorCut = {
  fill: "black",
  stroke: "black"
};

//const interiorCut = {
//  fill: "white",
//  stroke: "black"
//};

const pocket = {
  fill: "#7f7c77",
  stroke: "#7f7c77"
};

const guide = {
  fill: "#126dfa",
  stroke: "#126dfa"
};
const strokeWidth = .01;
const dadoTolerance = .01;

class Sheet extends Component {
  getSVGContent = () => {
    return this.svgContainer.innerHTML;
  };

  getFilename = () => {
    return this.props.filename;
  };

  render() {
    const { dimensions, boards, sheet, units, label, displayPercentage } = this.props;

    let boardsOnThisSheet = {};
    const rects = sheet.map(
      board => {
        boardsOnThisSheet[board.id] = true;
        return (<rect key={board.id} 
                      x={board.x} 
                      y={board.y} 
                      width={board.w} 
                      height={board.h} 
                      fill={exteriorCut.fill} 
                      stroke={exteriorCut.stroke}
                      strokeWidth={strokeWidth}/>);
      });
    const guides = sheet.map(
      board => {
      return (<g key={board.id}>
      <text x={board.x+board.w*.5} y={board.y+board.h*.5} textAnchor="middle" fontSize={.06*board.h} fill={guide.fill}>{board.label + 
        (
          (board.id === "middle" && dimensions.leftShelfHeight2) ? 
            " (Left side)" : 
            (
              ( board.id === "middle" && dimensions.rightShelfHeight2) ? 
                " (Right side)" : 
                ""
            )
        )}</text>
      </g>)
      }
    );
    let dados = [];

    // top rabbits/dados
    console.log(dimensions);
    if(boardsOnThisSheet.top) {
      dados.push(<rect x={boards.top.x} y={boards.top.y-dimensions.kerf*.5} width={dimensions.sheetThickness+.5*dadoTolerance} height={boards.top.h+dimensions.kerf} key={"leftTopDado"} fill={pocket.fill} stroke="none" data-label="left rabbit"/>); 
      dados.push(<rect x={boards.top.x+boards.top.w-dimensions.sheetThickness-dadoTolerance*.5} y={boards.top.y-dimensions.kerf*.5} width={dimensions.sheetThickness+dadoTolerance*.5} height={boards.top.h+dimensions.kerf} key={"rightTopDado"} fill={pocket.fill} stroke="none" data-label="right rabbit"/>); 

      dados.push(<rect x={boards.top.x-dimensions.kerf*.5} y={boards.top.y+boards.top.h-dimensions.sheetThickness-dadoTolerance*.5} width={boards.top.w+dimensions.kerf} height={dimensions.sheetThickness+dadoTolerance*.5} key={"backTopDado"} fill={pocket.fill} stroke="none" data-label="back rabbit"/>); 

      if(dimensions.leftShelfWidth && dimensions.rightShelfWidth) {
        dados.push(<rect x={boards.top.x+dimensions.leftShelfWidth+dimensions.sheetThickness-dadoTolerance*.5} y={boards.top.y-dimensions.kerf*.5} width={dimensions.sheetThickness+dadoTolerance} height={boards.top.h+dimensions.kerf} key={"middleTopDado"} fill={pocket.fill} stroke="none" data-label="middle dado"/>); 
      }
    }

    // bottom rabbits/dados
    if(boardsOnThisSheet.bottom) {
      dados.push(<rect x={boards.bottom.x} y={boards.bottom.y-dimensions.kerf*.5} width={dimensions.sheetThickness+.5*dadoTolerance} height={boards.bottom.h+dimensions.kerf} key={"leftBottomDado"} fill={pocket.fill} stroke="none" data-label="left rabbit"/>); 
      dados.push(<rect x={boards.bottom.x-dimensions.kerf*.5} y={boards.bottom.y} width={boards.bottom.w+dimensions.kerf} height={dimensions.sheetThickness+dadoTolerance*.5} key={"backBottomDado"} fill={pocket.fill} stroke="none" data-label="back rabbit"/>); 
      dados.push(<rect x={boards.bottom.x+boards.bottom.w-dimensions.sheetThickness-dadoTolerance*.5} y={boards.bottom.y-dimensions.kerf*.5} width={dimensions.sheetThickness+dadoTolerance*.5} height={boards.bottom.h+dimensions.kerf} key={"rightBottomDado"} fill={pocket.fill} stroke="none" data-label="right rabbit"/>); 

      if(dimensions.leftShelfWidth && dimensions.rightShelfWidth) {
        dados.push(<rect x={boards.bottom.x+dimensions.leftShelfWidth+dimensions.sheetThickness-dadoTolerance*.5} y={boards.bottom.y-dimensions.kerf*.5} width={dimensions.sheetThickness+dadoTolerance} height={boards.bottom.h+dimensions.kerf} key={"middleBottomDado"} fill={pocket.fill} stroke="none" data-label="middle dado"/>); 
      }
    }

    // back rabbits/dados
    if(boardsOnThisSheet.back) {
      dados.push(<rect x={boards.back.x-dimensions.kerf*.5} y={boards.back.y} width={boards.back.w+dimensions.kerf} height={dimensions.sheetThickness+.5*dadoTolerance} key={"leftBackDado"} fill={pocket.fill} stroke="none" data-label="left rabbit"/>); 
      dados.push(<rect x={boards.back.x-dimensions.kerf*.5} y={boards.back.y+boards.back.h-dimensions.sheetThickness-dadoTolerance*.5} width={boards.back.w+dimensions.kerf} height={dimensions.sheetThickness+.5*dadoTolerance} key={"rightBackDado"} fill={pocket.fill} stroke="none" data-label="right rabbit"/>); 

      if(dimensions.leftShelfWidth && dimensions.rightShelfWidth) {
        dados.push(<rect x={boards.back.x-dimensions.kerf*.5} y={boards.back.y+dimensions.sheetThickness+dimensions.leftShelfWidth-dadoTolerance*.5} width={boards.back.w+dimensions.kerf} height={dimensions.sheetThickness+dadoTolerance} key={"middleBackDado"} fill={pocket.fill} stroke="none" data-label="middle dado"/>); 
      }

      if(dimensions.leftShelfHeight2) {
        dados.push(<rect x={boards.back.x+boards.back.w-dimensions.dadoDepth-dimensions.leftShelfHeight1-dimensions.sheetThickness-.5*dadoTolerance} y={boards.back.y} width={dimensions.sheetThickness+dadoTolerance} height={dimensions.leftShelfWidth+2*dimensions.sheetThickness} key={"leftShelf1BackDado"} fill={pocket.fill} stroke="none" data-label="left shelf 1 dado"/>); 
      }
      if(dimensions.leftShelfHeight3) {
        dados.push(<rect x={boards.back.x+boards.back.w-dimensions.dadoDepth-dimensions.leftShelfHeight1-dimensions.sheetThickness-.5*dadoTolerance-dimensions.leftShelfHeight2-dimensions.sheetThickness-.5*dadoTolerance} y={boards.back.y} width={dimensions.sheetThickness+dadoTolerance} height={dimensions.leftShelfWidth+2*dimensions.sheetThickness} key={"leftShelf2BackDado"} fill={pocket.fill} stroke="none" data-label="left shelf 2 dado"/>); 
      }

      if(dimensions.rightShelfHeight2) {
        dados.push(<rect x={boards.back.x+boards.back.w-dimensions.dadoDepth-dimensions.rightShelfHeight1-dimensions.sheetThickness-.5*dadoTolerance} y={boards.back.y+boards.back.h-dimensions.rightShelfWidth-2*dimensions.sheetThickness} width={dimensions.sheetThickness+dadoTolerance} height={dimensions.rightShelfWidth+2*dimensions.sheetThickness} key={"rightShelf1BackDado"} fill={pocket.fill} stroke="none" data-label="right shelf 1 dado"/>); 
      }
      if(dimensions.rightShelfHeight3) {
        dados.push(<rect x={boards.back.x+boards.back.w-dimensions.dadoDepth-dimensions.rightShelfHeight1-dimensions.sheetThickness-dimensions.leftShelfHeight2-dimensions.sheetThickness-.5*dadoTolerance} y={boards.back.y+boards.back.h-dimensions.rightShelfWidth-2*dimensions.sheetThickness} width={dimensions.sheetThickness+dadoTolerance} height={dimensions.rightShelfWidth+2*dimensions.sheetThickness} key={"rightShelf2BackDado"} fill={pocket.fill} stroke="none" data-label="right shelf 2 dado"/>); 
      }

    }

    // left dados
    if(boardsOnThisSheet.left) {
      if(dimensions.leftShelfHeight2) {
        dados.push(<rect x={boards.left.x-dimensions.kerf*.5} y={boards.left.y+dimensions.dadoDepth+dimensions.leftShelfHeight1-.5*dadoTolerance} width={boards.left.w+dimensions.kerf} height={dimensions.sheetThickness+dadoTolerance} key={"leftShelf1LeftDado"} fill={pocket.fill} stroke="none" data-label="left shelf 1 dado"/>); 
      }
      if(dimensions.leftShelfHeight3) {
        dados.push(<rect x={boards.left.x-dimensions.kerf*.5} y={boards.left.y+dimensions.dadoDepth+dimensions.leftShelfHeight1+dimensions.sheetThickness+dimensions.leftShelfHeight2-.5*dadoTolerance} width={boards.left.w+dimensions.kerf} height={dimensions.sheetThickness+dadoTolerance} key={"leftShelf2LeftDado"} fill={pocket.fill} stroke="none" data-label="left shelf 2 dado"/>); 
      }
    }

    // right dados
    if(boardsOnThisSheet.right) {
      if(dimensions.rightShelfHeight2) {
        dados.push(<rect x={boards.right.x-dimensions.kerf*.5} y={boards.right.y+dimensions.dadoDepth+dimensions.rightShelfHeight1-.5*dadoTolerance} width={boards.right.w+dimensions.kerf} height={dimensions.sheetThickness+dadoTolerance} key={"rightShelf1RightDado"} fill={pocket.fill} stroke="none" data-label="right shelf 1 dado"/>); 
      }
      if(dimensions.rightShelfHeight3) {
        dados.push(<rect x={boards.right.x-dimensions.kerf*.5} y={boards.right.y+dimensions.dadoDepth+dimensions.rightShelfHeight1+dimensions.sheetThickness+dimensions.rightShelfHeight2-.5*dadoTolerance} width={boards.right.w+dimensions.kerf} height={dimensions.sheetThickness+dadoTolerance} key={"rightShelf2RightDado"} fill={pocket.fill} stroke="none" data-label="right shelf 2 dado"/>); 
      }
    }

    // middle dado
    if(boardsOnThisSheet.middle) {
      if(dimensions.leftShelfHeight2) {
        // if there are left shelves do those
        dados.push(<rect x={boards.middle.x-dimensions.kerf*.5} y={boards.middle.y+dimensions.dadoDepth+dimensions.leftShelfHeight1-.5*dadoTolerance} width={boards.middle.w+dimensions.kerf} height={dimensions.sheetThickness+dadoTolerance} key={"leftShelf1MiddleDado"} fill={pocket.fill} stroke="none" data-label="middle left shelf 1 dado"/>); 
        if(dimensions.leftShelfHeight3) {
          dados.push(<rect x={boards.middle.x-dimensions.kerf*.5} y={boards.middle.y+dimensions.dadoDepth+dimensions.leftShelfHeight1+dimensions.sheetThickness+dimensions.leftShelfHeight2-.5*dadoTolerance} width={boards.middle.w+dimensions.kerf} height={dimensions.sheetThickness+dadoTolerance} key={"leftShelf2MiddleDado"} fill={pocket.fill} stroke="none" data-label="middle left shelf 2 dado"/>); 
        }
      } else if(dimensions.rightShelfHeight2) {
        // otherwise, do right shelves
        // if we have both right and left shelves another special sheet will be created with the right side
        if(dimensions.rightShelfHeight2) {
          dados.push(<rect x={boards.middle.x-dimensions.kerf*.5} y={boards.middle.y+dimensions.dadoDepth+dimensions.rightShelfHeight1-.5*dadoTolerance} width={boards.middle.w+dimensions.kerf} height={dimensions.sheetThickness+dadoTolerance} key={"rightShelf1MiddleDado"} fill={pocket.fill} stroke="none" data-label="right shelf 1 dado"/>); 
        }
        if(dimensions.rightShelfHeight3) {
          dados.push(<rect x={boards.middle.x-dimensions.kerf*.5} y={boards.middle.y+dimensions.dadoDepth+dimensions.rightShelfHeight1+dimensions.sheetThickness+dimensions.rightShelfHeight2-.5*dadoTolerance} width={boards.middle.w+dimensions.kerf} height={dimensions.sheetThickness+dadoTolerance} key={"rightShelf2MiddleDado"} fill={pocket.fill} stroke="none" data-label="right shelf 2 dado"/>); 
        }
      }
    }

    return (
    <div style={ { paddingLeft: "10px", paddingRight: "10px" }}>
    <h2>{label}</h2>
      {/* SVG output for viewing in a browser */ }
      <svg width={displayPercentage || "100%"} style={ {border: "1px solid black"} } viewBox={"0 0 " + dimensions.sheetWidth + " " + dimensions.sheetHeight} preserveAspectRatio="xMinYMin">
      <g>
        {rects}
      </g>
      <g>
        {dados}
      </g>
      <g>
        {guides}
      </g>
      </svg>
    <div>
    </div>
    {/* SVG output for downloading for the Shaper Origin, which has real units and guides meant for use on the Origin */}
    <div ref={(svgContainer) => this.svgContainer = svgContainer} style={ { display: "none" } }>
      <svg width={dimensions.sheetWidth + units} height={dimensions.sheetHeight + units} viewBox={"0 0 " + dimensions.sheetWidth + " " + dimensions.sheetHeight}>
      <g>
        {rects}
      </g>
      <g>
        {dados}
      </g>
      <g>
        {guides}
      </g>
      </svg>
    </div>
    </div>
    );
  }
}

export default Sheet;
