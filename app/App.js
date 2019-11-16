import React from 'react';

const inputStyle = "bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full"

const TimeDisplay = props => {
  console.log(props.seconds)
  let timeString = new Date(1000 * props.seconds).toISOString().substr(11, 8)

  return (
    <div className="a">
      <h1 style={{ fontSize: 100 }}>{timeString}</h1>
    </div>
  );
}

const MoneyDisplay = props => {
let displayMoney = props.money.toFixed(2)

  return (
    <div>
      <h1 style={{ fontSize: 100 }} className="text-green-400">${displayMoney}</h1>
    </div>
  );
}

const StartButton = props => {
  return (
    <div>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={props.startTimer}>Start</button>
    </div>
  );
}

const StopButton = props => {
  return (
    <div>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={props.stopTimer}>Stop</button>
    </div>
  );
}

const ResetButton = props => {
  return (
    <div>
      <button className="" onClick={props.resetTimer}>Reset</button>
    </div>
  );
}

const SalaryInput = props => {
  return(
    <div>
      Average Salary: <input className={inputStyle} value={props.salary} onChange={(e) => props.onSalaryChange(e.target.value)} />
    </div>
  )
}

const SalaryTypeInput = props => {
  return(
    <div class="relative">
      Salary Type: 
      <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={props.salaryType} onChange={(e) => props.onSalaryTypeChange(e.target.value)}>
        <option value="yearly">Yearly</option>
        <option value="hourly">Hourly</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 pt-5 text-gray-700">
          <svg className="fill-current h-4 w-4"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
    </div>
  )
}

const PeopleInput = props => {
  return(
    <div>
      Number of People: <input className={inputStyle} value={props.numPeople} onChange={(e) => props.onPeopleChange(e.target.value)} />
    </div>
  )
}

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
      numPeople: 150,
      avgSalary: 60000,
      salaryType: 'yearly',
      money: 0
    }

    this.intervalHandle;
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.handleSalaryChange = this.handleSalaryChange.bind(this);
    this.handleSalaryTypeChange = this.handleSalaryTypeChange.bind(this);
    this.handlePeopleChange = this.handlePeopleChange.bind(this);
    this.tick = this.tick.bind(this);
  }

  tick() {
    let currentMoney = this.state.money;
    let numPeople = this.state.numPeople;
    let avgSalary = this.state.avgSalary;
    let newMoney = 0
      
    let centsPerSecond = numPeople * ( avgSalary / 52 / 40 / 3600 );
    newMoney = currentMoney + centsPerSecond;

    console.log(newMoney);
    let newSeconds = this.state.seconds + 1;

    this.setState({
      seconds: newSeconds,
      money: newMoney
    })
  }

  startTimer() {
    this.intervalHandle = setInterval(this.tick, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalHandle);
  }

  resetTimer() {
    this.setState({
      seconds: 0,
      money: 0
    })
  }

  handleSalaryChange(value) {
    this.setState({
      avgSalary: value
    })
  }

  handleSalaryTypeChange(value) {
    this.setState({
      salaryType: value
    })
  }

  handlePeopleChange(value) {
    this.setState({
      numPeople: value
    })
  }

  render() {
    return (
      <div className="items-center justify-center">
        <div className="flex flex-wrap justify-around">
          <TimeDisplay seconds={this.state.seconds}/>
          <MoneyDisplay money={this.state.money}/>
        </div>
        <div className="flex flex-wrap justify-around">
          <StopButton stopTimer={this.stopTimer} />
          <StartButton startTimer={this.startTimer} />
          <ResetButton resetTimer={this.resetTimer} />
        </div>
        <br></br>
        <div className="form">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <SalaryInput salary={this.state.avgSalary} onSalaryChange={this.handleSalaryChange} />
            <SalaryTypeInput salaryType={this.state.salaryType} onSalaryTypeChange={this.handleSalaryTypeChange} />
            <PeopleInput numPeople={this.state.numPeople} onPeopleChange={this.handlePeopleChange} />
          </form>
        </div>
      </div>
    );
  }
}

export { Timer }