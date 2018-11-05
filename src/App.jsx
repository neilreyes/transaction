import React, { Component } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import fire from './js/firebase';

class App extends Component{
	constructor(props){
		super(props);
		this.getTransactionID = this.getTransactionID.bind(this);
		this.getDate = this.getDate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.writeNewEntry = this.writeNewEntry.bind(this);

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

	componentWillMount(){
		let entries = fire.database().ref('entries/');
		entries.once("value")
			.then(snapshot=>{
				// const data = snapshot.val();

				snapshot.forEach(data=>{
					this.setState({
						items: this.state.items.concat(data.val())
					})
				});
			})
	}

	writeNewEntry(data){
		const newEntry = data;

		fire.database().ref('entries/').push().set({
			amount: newEntry.amount,
			id: newEntry.id,
			unit: newEntry.unit,
			type: newEntry.type
		});

		console.log(newEntry);
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

		this.writeNewEntry(newItem);

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
		return(
			<div className="container">
				<h1>Transactions</h1>
				<TransactionForm
					data={this.state}
					onInputChange={this.handleInputChange}
					onFormSubmit={this.handleSubmit}
				/>		
				<TransactionList items={this.state.items}/>
			</div>
		);
	}
}

export default App;