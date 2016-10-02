import React from 'react';
import AttendanceMarks from './AttendanceMarks';

export default class Student extends React.Component {
	constructor() {
		super();
		
		this.state = {
			isMarked: false
		};
	}

	// Handle overlay button
	handleOverlayBtn (btn) {
		if (btn.tagName === "SPAN") {
			btn.innerText = "Marked";			
			btn.parentNode.classList.add("marked");
		} else {
			btn.classList.add("marked");
			btn.querySelector('span').innerText = "Marked";
		}
	}

	// Handle multiple mark on student
	handleMarkedClick (id, e) {
		e.preventDefault();

		this.handleOverlayBtn(e.target);
		this.props.handleMarkedClick(id);
	}

	// Getter: Check if is initialy marked
	get isAlreadyMarked () {
		for (let key in this.props.student.attendanceMark) {
			if (this.props.student.attendanceMark[key]) {
				return false;
			}
		}

		return true;
	}

	// Getter: Compute full name
	get fullName () {
		return `${this.props.student.firstName} ${this.props.student.lastName}`;
	}

	render () {
		return (
			<div className="student-wrapper">
				<div className="student">
					<img src={this.props.student.image} alt={this.fullName}/>
					<h3>{this.fullName}</h3>
					<AttendanceMarks 
						marks={this.props.student.attendanceMark}
						id={this.props.student.id}
						markStudents={this.props.markStudents} />
					{(this.props.markMode && this.isAlreadyMarked) && 
						<a href="#" className="mark-student" onClick={(e) => this.handleMarkedClick(this.props.student.id, e)}> <span>Mark me!</span></a>
					}
				</div>
			</div>
		);
	}
}

Student.propTypes = { 
	student: React.PropTypes.object,
	id: React.PropTypes.number,
	markStudents: React.PropTypes.func,
	handleMarkedClick: React.PropTypes.func,
	markMode: React.PropTypes.bool
};