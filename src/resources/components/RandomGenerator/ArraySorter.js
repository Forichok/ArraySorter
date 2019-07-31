import React from 'react';
import './ArraySorter.css';
import logo from '../../../logo.svg';
import { FileDialogue } from '../FileDialogue/FileDialogue';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
export class ArraySorter extends React.Component {
  constructor() {
    super();

    this.state = {
      values: '',
      count: 1,
      min: 0,
      max: 100,
      sort: ''
    };
  }

  addNumbers() {
    let numsToAdd = '';
    for (let i = 0; i < this.state.count; i++) {
      numsToAdd +=
        (this.state.values === '' ? '' : ', ') +
        this.randomInteger(this.state.min, this.state.max);
    }
    this.setState({
      values: this.state.values + numsToAdd
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  sortChange(e) {
    this.setState({ sort: e.value });
  }

  randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  render() {
    const options = ['bubble', 'two', 'three'];

    return (
      <div class="container">
        <header>
          <h1>ArraySorter</h1>
        </header>
        <div class="wrapper clearfix">
          <nav>
            <fieldset>
              <legend>Settings</legend>
              <ul>
                <li>
                  min:{' '}
                  <input
                    name="min"
                    type="number"
                    value={this.state.min}
                    onChange={this.handleChange.bind(this)}
                  />
                </li>
                <li>
                  max:{' '}
                  <input
                    name="max"
                    type="number"
                    value={this.state.max}
                    onChange={this.handleChange.bind(this)}
                  />
                </li>
                <li>
                  nums to add:{' '}
                  <input
                    name="count"
                    type="number"
                    value={this.state.count}
                    onChange={this.handleChange.bind(this)}
                  />
                </li>
                <li>
                  <input
                    type="submit"
                    class="button"
                    value="Add number"
                    onClick={() => this.addNumbers()}
                  />
                </li>
                <li>
                  <input
                    type="button"
                    class="button"
                    value="Clear Array"
                    onClick={() => this.setState({ values: '' })}
                  />
                </li>
                <li>
                  <Dropdown
                    options={options}
                    onChange={this.sortChange.bind(this)}
                    value={this.state.sort}
                    placeholder="Select sort method"
                  />
                </li>
                <li>
                  <input type="button" class="button" value="Sort" />
                </li>
              </ul>
            </fieldset>
          </nav>
          <div class="content">
            <section>
              <p>Array: {this.state.values} </p>
              <div>Sorted Array: {this.state.sortedValues}</div>
            </section>
          </div>
        </div>
        <footer>
          <img src={logo} className="App-logo" alt="logo" />
        </footer>
      </div>
    );
  }
}
