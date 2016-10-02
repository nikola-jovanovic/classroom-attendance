import React from 'react';

export default class AttendanceMarks extends React.Component {
	constructor() {
		super();
		this.state = {
			isSet: false,
			selected: null
		};
	}

	// Lifecycle hook: check if is marked
	componentWillMount() {
		this.checkSelected(this.props);
	}

	// Lifecycle hook: check if is marked on every change
	componentWillReceiveProps (nextProps) {
		this.checkSelected(nextProps);
	}

	// Mark student
	handleClick (key, e) {
		e.preventDefault();

		this.props.markStudents([this.props.id], key);
	}

	// Check which one is marked
	checkSelected (props) {
		let isSet = false,
			selected = null;
		for(let key in props.marks) {
			if (props.marks[key]) {
				isSet = true;
				selected = key;
			}
		}
		this.setState({ isSet, selected });
	}

	// Getter: Renders marked message
	get selected () {
		let className = `attendance-info ${this.state.selected}`;
		return (<p className={className}><span>{this.state.selected}</span></p>)
	}

	// Getter: Renders marks list
	get marks () {
		let temp = [];
		for(let key in this.props.marks) {
			temp.push(<li key={key}><a href="#" onClick={(e) => this.handleClick(key, e)} className={key}></a></li>);
		}

		return (<ul>{temp}</ul>);
	}

	render(){
		return (
			<div className="actions">
				{this.state.isSet ? 
					this.selected 
					: this.marks
				}
			</div>
		);
	}
}

AttendanceMarks.propTypes = { 
	mark: React.PropTypes.object,
	id: React.PropTypes.number,
	markStudents: React.PropTypes.func
};