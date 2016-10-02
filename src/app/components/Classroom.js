import React from 'react';
import StudentsListContainer from './students/StudentsListContainer';

export default class Classroom extends React.Component {
	constructor() {
		super();
		
		this.state = {
			title: 'Classroom attendance'
		};
	}
	render(){
		return (
			<section>
				<h1>{this.state.title}</h1>
				<StudentsListContainer />
			</section>
		);
	}
}