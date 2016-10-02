import React from 'react';
import Student from './Student';
import Filter from '../filter/Filter';

export default class StudentsList extends React.Component {
	constructor() {
		super();
		
		this.state = {
			markMode: false,
			marked: []
		};

		this.markMultiple 		= this.markMultiple.bind(this);
		this.handleMarkedClick 	= this.handleMarkedClick.bind(this);
		this.markStudents 		= this.markStudents.bind(this);
	}

	// Enable/Disable mark multiple mode
	markMultiple () {
		this.setState({ markMode: !this.state.markMode });
		if (this.state.markMode) {
			this.setState({ marked: [] });
		};
	}

	// Push student to state marked array
	handleMarkedClick (id) {
		let marked = this.state.marked,
			index = marked.indexOf(id);

		if (index == -1) {
			marked.push(id);			
		}
		
		this.setState({ marked });
	}

	// Update main students list from marked students array
	// Disable mark multiple mode
	markStudents (type) {
		this.props.markStudents(this.state.marked, type);
		this.setState({ markMode: false, marked: [] });
	}

	render () {
		return (
			<div className="section-content">
				<div className="container students-list">
					<div className="row">
						{this.props.students.map((data) => {
							return (
								<Student 
									student={data}
									key={data.id}
									markStudents={this.props.markStudents}
									handleMarkedClick={this.handleMarkedClick}
									markMode={this.state.markMode} />
							)
						})}
					</div>
				</div>
				<Filter 
					filterData={this.props.filterData}
					resetAttendance={this.props.resetAttendance} 
					getCompleteList={this.props.getCompleteList} 
					markMultiple={this.markMultiple}
					markMode={this.state.markMode}
					markStudents={this.markStudents} />
			</div>
		);
	}
}

StudentsList.propTypes = { students: React.PropTypes.array };