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
      sortedValues: '',
      count: 1,
      min: 0,
      max: 100,
      sort: '',
      time: '0'
    };
  }

  addNumbers() {
    let numsToAdd = [];

    for (let i = 0; i < this.state.count; i++) {
      numsToAdd.push(this.randomInteger(this.state.min, this.state.max));
    }
    this.setState({
      values: (this.state.values +=
        (this.state.values ? ', ' : '') + numsToAdd.join(', '))
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  sortChange(e) {
    this.setState({ sort: e.value });
  }

  startSort() {
    switch (this.state.sort) {
      case 'bubble':
        const date1 = new Date();
        const result = this.bubbleSort(
          this.createArray(this.state.values)
        ).join(', ');
        const date2 = new Date();
        this.setState({
          sortedValues: result,
          time: date2 - date1
        });

        break;

      default:
        break;
    }
  }

  createArray(str) {
    var arr = str.split(',');
    arr = arr.map(i => Number(i));
    return arr;
  }

  bubbleSort(arr, cmp) {
    cmp = cmp || ((a, b) => a - b);
    var temp;
    for (var i = 0, l = arr.length; i < l; i++) {
      for (var j = i; j > 0; j--) {
        if (cmp(arr[j], arr[j - 1]) < 0) {
          temp = arr[j];
          arr[j] = arr[j - 1];
          arr[j - 1] = temp;
        }
      }
    }
    return arr;
  }

  randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
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
                    onClick={() =>
                      this.setState({ values: '', time: '0', sortedValues: '' })
                    }
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
                  <input
                    type="button"
                    class="button"
                    onClick={this.startSort.bind(this)}
                    value="Sort"
                  />
                </li>
              </ul>
            </fieldset>
          </nav>
          <div class="content">
            <section>
              <p>Array: {this.state.values} </p>
              <div>Sorted Array: {this.state.sortedValues}</div>
              <p>Elapsed time: {this.state.time} ms.</p>
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
