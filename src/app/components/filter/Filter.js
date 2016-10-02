import React from 'react';
import Modal from '../modal/Modal';

export default class Filter extends React.Component {
	constructor (props) {
		super(props);
		
		this.state = {
			isDone: false
		};

		this.reset = this.reset.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.markMultiple = this.markMultiple.bind(this);
	}

	// Reset attendance
	reset (e) {
		e.preventDefault();

		this.props.resetAttendance();
	}

	// Show/Hide modal
	toggleModal (e) {
		e.preventDefault();
		this.setState({ isDone: !this.state.isDone });
	}

	// Call props function to enable mark multiple mode
	markMultiple (e) {
		e.preventDefault();
		this.props.markMultiple();
	}

	// Call props function to mark student that are already marked
	markStudents (type, e) {
		e.preventDefault();

		this.props.markStudents(type);
	}

	// Getter: Handle mark multiple button text
	get text () {
		let text = "Mark multiple";
		if (this.props.markMode) {
			text = "Cancel";
		}

		return text;
	}

	// Getter: Set modals title
	get modalTitle () {
		return "Students attendance list";
	}

	render () {
		return (
			<div className="container filter-wrapper">
				<div className="filters">
					<ul>
						<li>Present: {this.props.filterData.present}</li>
						<li>Late: {this.props.filterData.late}</li>
						<li>Absent: {this.props.filterData.absent}</li>
						<li>Unmarked: {this.props.filterData.unmarked}</li>
					</ul>
					<div className="buttons">
						<div className="buttons-row">
							{ this.props.filterData.unmarked > 0 && 
								<a href="#" onClick={this.markMultiple}>{this.text}</a>
							}
							{ this.props.filterData.unmarked > 0 && this.props.markMode &&
								<ul>
									<li><a className="btn-present" href="#" onClick={(e) => {this.markStudents('present', e)}}>Mark as Present</a></li>
									<li><a className="btn-late" href="#" onClick={(e) => {this.markStudents('late', e)}}>Mark as Late</a></li>
									<li><a className="btn-absent" href="#" onClick={(e) => {this.markStudents('absent', e)}}>Mark as Absent</a></li>
								</ul>
							}
						</div>
						<div className="buttons-row">
							<a href="#" onClick={this.reset}>Reset</a>
							<a href="#" className="btn-done" onClick={this.toggleModal}>Done</a>
							{ this.state.isDone && 
								<Modal 
									list={this.props.getCompleteList(this.state.isDone)}
									close={this.toggleModal}
									title={this.modalTitle}
									customClass="modal-complete" />
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Filter.propTypes = { 
	filterData: React.PropTypes.object,
	resetAttendance: React.PropTypes.func,
	getCompleteList: React.PropTypes.func,
	markMultiple: React.PropTypes.func,
	markMode: React.PropTypes.bool,
	markStudents: React.PropTypes.func
};