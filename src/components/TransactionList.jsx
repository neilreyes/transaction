import React, { Component } from 'react';

class TransactionList extends Component{

	render(){
		return(
			<div className="TransactionList">
				
				<table className="table">
					<thead>
						<tr>
							<th>Unit #</th>
							<th>Amount</th>
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
						{this.props.items.map((item)=>
							<tr key={item.id}>
								<td>{item.unit}</td>
								<td>{item.amount}</td>
								<td>{item.type}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

export default TransactionList;