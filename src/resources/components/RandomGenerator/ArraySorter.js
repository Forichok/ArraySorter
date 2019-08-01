import React from 'react';
import './ArraySorter.css';
import logo from '../../../logo.svg';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Chart from 'react-apexcharts';

export class ArraySorter extends React.Component {
  constructor() {
    super();
    this.sortOptions = ['Bubble', 'Quick Sort', 'Iterative Quick Sort'];
    this.state = {
      values: '',
      sortedValues: '',
      count: 1,
      min: 0,
      max: 10,
      sort: '',
      time: '0',
      chart: {
        options: {
          chart: {
            id: 'basic-bar'
          },
          xaxis: {
            categories: []
          }
        },
        series: [
          {
            name: 'series-1',
            data: []
          }
        ]
      }
    };
  }

  addNumbers() {
    let numsToAdd = [];

    for (let i = 0; i < this.state.count; i++) {
      numsToAdd.push(this.randomInteger(this.state.min, this.state.max));
    }
    this.setState({
      values:
        this.state.values +
        (this.state.values ? ', ' : '') +
        numsToAdd.join(', ')
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  sortChange(e) {
    this.setState({ sort: e.value });
  }

  startSort() {
    let result = [];
    const date1 = new Date();
    switch (this.state.sort) {
      case 'Bubble':
        result = this.bubbleSort(this.createArray(this.state.values));
        break;
      case 'Quick Sort':
        result = this.quickSort(this.createArray(this.state.values));
        break;
      case 'Iterative Quick Sort':
        result = this.quickSortIterative(this.createArray(this.state.values));
        break;
      default:
        break;
    }
    const date2 = new Date();
    this.setState({
      time: date2 - date1,
      sortedValues: result.join(', ')
    });
  }

  swap(arr, a, b) {
    const t = arr[a];
    arr[a] = arr[b];
    arr[b] = t;
  }

  /* This function is same in both iterative and recursive*/
  partition(arr, l, h) {
    let x = arr[h];
    let i = l - 1;

    for (let j = l; j <= h - 1; j++) {
      if (arr[j] <= x) {
        i++;
        this.swap(arr, i, j);
      }
    }
    this.swap(arr, i + 1, h);
    return i + 1;
  }

  /* A[] --> Array to be sorted,  
l --> Starting index,  
h --> Ending index */
  quickSortIterative(arr) {
    let l = 0;
    let h = arr.length - 1;

    let stack = [];

    stack.push(l);
    stack.push(h);

    while (stack.length) {
      h = stack.pop();
      l = stack.pop();

      let p = this.partition(arr, l, h);

      if (p - 1 > l) {
        //push left
        stack.push(l);
        stack.push(p - 1);
      }

      if (p + 1 < h) {
        //push right
        stack.push(p + 1);
        stack.push(h);
      }
    }
    return arr;
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

  quickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    let pivotPosition = Math.floor(arr.length / 2);
    let pivotValue = arr[pivotPosition];
    let less = [],
      more = [],
      same = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === pivotValue) {
        same.push(arr[i]);
      } else if (arr[i] > pivotValue) {
        more.push(arr[i]);
      } else {
        less.push(arr[i]);
      }
    }
    return this.quickSort(less).concat(same, this.quickSort(more));
  }

  randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  render() {
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
                    options={this.sortOptions}
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
                <li>
                  <p>Elapsed time: {this.state.time} ms.</p>
                </li>
                <li>
                  <Chart
                    options={this.state.chart.options}
                    series={this.state.chart.series}
                    type="bar"
                  />
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
