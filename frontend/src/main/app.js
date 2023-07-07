import { ETFList } from './components/ETFList';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./api/client');
const follow = require('./api/follow');

var root = '/api';

export class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {stocks: [], attributes: [], pageSize: 2, links: {}};
		this.onCreate = this.onCreate.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
	}

	render() {
		return (
			<ETFList etfs={this.state.stocks}/>
		)
	}

	loadFromServer(pageSize) {
		follow(client, root, [
			{rel: 'stocks', params: {size: pageSize}}]
		).then(etfCollection => {
			return client({
				method: 'GET',
				path: etfCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return etfCollection;
			});
		}).done(etfCollection => {
			this.setState({
				employees: etfCollection.entity._embedded.employees,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: etfCollection.entity._links});
		});
	}

	onCreate(newEtf) {
		follow(client, root, ['stocks']).then(etfCollection => {
			return client({
				method: 'POST',
				path: etfCollection.entity._links.self.href,
				entity: newEtf,
				headers: {'Content-Type': 'application/json'}
			})
		}).then(response => {
			return follow(client, root, [
				{rel: 'stocks', params: {'size': this.state.pageSize}}]);
		}).done(response => {
			if (typeof response.entity._links.last !== "undefined") {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		});
	}

	onNavigate(navUri) {
		client({method: 'GET', path: navUri}).done(etfCollection => {
			this.setState({
				stocks: etfCollection.entity._embedded.stocks,
				attributes: this.state.attributes,
				pageSize: this.state.pageSize,
				links: etfCollection.entity._links
			});
		});
	}

}

// Injects the react app into the backends index.html
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
