import React, { Component } from 'react';
import './FileDialogue.css';
function buildFileSelector() {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'multiple');
  return fileSelector;
}

export class FileDialogue extends Component {
  componentDidMount() {
    this.fileSelector = buildFileSelector();
  }

  handleFileSelect = e => {
    e.preventDefault();
    this.fileSelector.click();
  };

  render() {
    return (
      <button className="button-dialogue" onClick={this.handleFileSelect}>
        Select files
      </button>
    );
  }
}
