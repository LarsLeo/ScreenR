import { ETF } from './ETF';

const React = require('react');

export class ETFList extends React.Component{
	render() {
		const etfs = this.props.etfs.map(etf =>
			<ETF key={etf._links.self.href} etf={etf}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>WKN</th>
						<th>ISIN</th>
						<th>Name</th>
					</tr>
					{etfs}
				</tbody>
			</table>
		)
	}
}