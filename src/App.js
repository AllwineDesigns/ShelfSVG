import React, { Component } from 'react';
import './App.css';
import Shelf from './Shelf';
import data from './data.json'
import jszip from 'jszip';
import { saveAs } from 'file-saver';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = this.stateFromData(data);
  }

  stateFromData = (data) => {
    let dimensions = {};
    let boards = {};

    data.dimensions.forEach((dim) => {
      dimensions[dim.id] = dim.dimension;
    });
    data.materials.plywood.forEach((sheet) => {
      sheet.forEach((board) => {
        boards[board.id] = board;
      });
    });

    return { 
      dimensions: dimensions, 
      boards: boards, 
      sheets: data.materials.plywood, 
      units: data.units,
      data: data
    };
  };

  handleOpenJSCADMessage = (event) => {
    var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
    if (origin !== "https://allwinedesigns.github.io")
      return;
    if(event.data.materials) {
      this.setState(this.stateFromData(event.data));
    }
  };

  componentDidMount() {
    window.addEventListener("message", this.handleOpenJSCADMessage, false);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.handleOpenJSCADMessage, false);
  }

  handleDownload = () => {
    const svgContent = this.shelf.getSVGContent();
    const filenames = this.shelf.getFilenames();

    const zip = new jszip();

    const folder = zip.folder("sheets");

    svgContent.forEach((svg, i) => {
      folder.file(filenames[i], svg);
    });

    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "shelf.zip");
});
  };


  render() {
    const { data, dimensions, boards, sheets, units } = this.state;

    const dims = data.dimensions.map((dim) => 
      (<div key={dim.id}>
      <span><b>{dim.label}</b> - {dim.dimension}{units}</span>
      </div>));

    return (
    <div>
      <h1>Dimensions</h1>

      <p>You'll need these dimensions if you manually measure where your cuts will go. If you use the Shaper Origin, the SVGs below will contain all the necessary information.</p>

      <div>
      {dims}
      </div>

      <h1>Materials</h1>

      <h2><em style={ {fontWeight: "bold"} }>You will need {sheets.length}</em> Sheets of {dimensions.sheetWidth}{units} x {dimensions.sheetHeight}{units} x {dimensions.sheetThickness}{units} Plywood</h2>

      <button onClick={this.handleDownload}>Download SVGs</button>
      <br/>
      <br/>
      <Shelf ref={(shelf) => this.shelf = shelf } dimensions={dimensions} boards={boards} sheets={sheets} units={units}/>
    </div>
    );
  }
}

export default App;
