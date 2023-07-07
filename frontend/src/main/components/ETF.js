const React = require('react');

export class ETF extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.etf.wkn}</td>
				<td>{this.props.etf.isin}</td>
				<td>{this.props.etf.name}</td>
			</tr>
		)
	}
}