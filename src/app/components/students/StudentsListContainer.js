import React from 'react';
import {getAjax} from '../../Utils';
import StudentsList from './StudentsList';

export default class StudentListContainer extends React.Component {
	constructor() {
		super();
		
		this.state = {
			students: [],
		};

		this.resetAttendance 	= this.resetAttendance.bind(this);
		this.getCompleteList 	= this.getCompleteList.bind(this);
		this.markStudents 		= this.markStudents.bind(this);
	}

	// Lifecycle hook: Get all students from server
	componentDidMount () {
		getAjax('/api/students', (err, students) => {
			if (err) {
				return false;
			};
			
			// Set initial value to localStorage, so we can use it for reset
			localStorage.setItem('students', JSON.stringify(students));
			this.setState({students: students});
		});
	}

	// Reset attendance
	resetAttendance () {
		this.setState({students: JSON.parse(localStorage.getItem('students'))});		
	}

	// Get complete list for modal
	getCompleteList (isDone) {
		if (isDone) {
			return this.completeList;
		};
	}

	// Helper function to mark multiple students
	markStudents (marked, type) {
		let students = this.state.students;

		marked.forEach((id) => {
			let index = students.findIndex(function(c) { 
				return c.id == id; 
			});

			students[index].attendanceMark[type] = true;			
		});

		this.setState({
			students: students
		});
	}

	// Getter: Prepare data for filter
	get filterData () {
		let marks = {
			present: 0,
			late: 0,
			absent: 0
		},
		sum;

		this.state.students.forEach(function(student) {
			for (let key in student.attendanceMark) {
				if (student.attendanceMark[key]) {
					marks[key]++;
				}
			}
		});
		sum = marks.present + marks.late + marks.absent;
		
		if (sum <= this.state.students.length) {
			marks.unmarked = this.state.students.length - sum;
		}

		return marks;
	}

	// Getter: Prepare data for modal
	get completeList () {
		let total = {
			present: [],
			late: [],
			absent: [],
			unmarked: []
		};

		this.state.students.forEach((student) => {
			let unmarked = true;
			for (let key in student.attendanceMark) {
				if (student.attendanceMark[key]) {
					total[key].push(student);
					unmarked = false;
				}

			}
			if (unmarked) {
				total.unmarked.push(student);
			};
		});

		return total;
	}

	render () {
		return (
			<StudentsList 
				students={this.state.students}
				filterData={this.filterData}
				resetAttendance={this.resetAttendance}
				getCompleteList={this.getCompleteList}
				markStudents={this.markStudents} />
		);
	}
}