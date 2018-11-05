import React, { Component } from 'react';
//import Form from './components/Form';
import TransactionList from './components/TransactionList';

class App extends Component{
	constructor(props){
		super(props);
		this.getTransactionID = this.getTransactionID.bind(this);
		this.getDate = this.getDate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.state = {
			items: [],
			unit: '101',
			type: 'cash',
			particulars: '',
			amount: 0,
			types : ['cash','cheque','expense'],
			units: [101,102,103,104,201,202,203,204,205,206,207,301,302,303,304,305,306,307]
		}
	}

	getTransactionID(){
		function s4() {
		   return Math.floor((1 + Math.random()) * 0x10000)
		     .toString(16)
		     .substring(1);
		 }
		 return s4() + s4() + s4();
	}

	getDate(){
		const dateToday = new Date();
		const today = {
			day: dateToday.getDate(),
			month: dateToday.getMonth() + 1,
			year: dateToday.getFullYear()
		}

		return today;
	}

	handleSubmit(event){
		event.preventDefault();
		const ID = this.getTransactionID();
		const dateToday = this.getDate();

		const newItem = {
			id: ID,
			unit: this.state.unit,
			type: this.state.type,
			amount: this.state.amount,
			date: {
				day: dateToday.day,
				month: dateToday.month,
				year: dateToday.year
			}
		}

		this.setState(state=>({
			items: state.items.concat(newItem),
			unit: '101',
			type: 'cash',
			amount: 0,
			particulars: '',
		}));
	}

	handleInputChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	render(){
		const types = this.state.types;
		const units = this.state.units;

		return(
			<div className="container">
				<h1>Transactions</h1>
				<form onSubmit={this.handleSubmit}>
					<select
						name="unit"
						value={this.state.unit}
						onChange={this.handleInputChange}
					>
						{units.map((unit,index)=>
							<option key={index} value={unit}>
								{unit}
							</option>
						)}
					</select>
					<input
						placeholder="Amount"
						type="number"
						name="amount"
						value={this.state.amount}
						onChange={this.handleInputChange}
					/>
					<select
						name="type"
						value={this.state.type}
						onChange={this.handleInputChange}
					>
						{types.map((type,index)=>
							<option key={index} value={type}>
								{type}
							</option>
						)}
					</select>
					<button>Submit</button>
				</form>
				
				<TransactionList items={this.state.items}/>
			</div>
		);
	}
}

export default App;