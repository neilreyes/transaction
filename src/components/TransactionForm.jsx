import React, { Component } from 'react';

class TransactionForm extends Component{
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		this.props.onFormSubmit(event);
	}

	handleChange(event){
		this.props.onInputChange(event);
	}

	render(){
		const types = this.props.data.types;
		const units = this.props.data.units;
		const amount = this.props.data.amount;
		const unit = this.props.data.unit;
		const type = this.props.data.type;

		return(
			<form
				onSubmit={this.handleSubmit}
			>
				<select
					name="unit"
					value={unit}
					onChange={this.handleChange}
				>
					{units.map((unit,index)=>
						<option key={index} value={unit}>
							{unit}
						</option>
					)}
				</select>
				<input
					onChange={this.handleChange}
					placeholder="Amount"
					type="number"
					name="amount"
					value={amount}
				/>
				<select
					onChange={this.handleChange}
					name="type"
					value={type}
				>
					{types.map((type,index)=>
						<option key={index} value={type}>
							{type}
						</option>
					)}
				</select>
				<button>Submit</button>
			</form>
		);
	}
}

export default TransactionForm;