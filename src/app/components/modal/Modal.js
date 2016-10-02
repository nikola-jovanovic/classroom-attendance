import React from 'react';

export default class Modal extends React.Component {
	
	// Call props function that close modal
	close (e) {
		e.preventDefault();

		this.props.close(e);
	}

	// Getter: Renders attendance list
	get list () {
		let temp = [];
		for(let key in this.props.list) {
			temp.push(<li key={key} className="subtitle">--- {key} ---</li>)
			this.props.list[key].map((data) => {
				temp.push(<li className={key} key={data.id}>{data.firstName} {data.lastName}</li>);
			})
		}

		return temp;
	}

	// Getter: Compute modal class
	get modalClass () {
		return `modal-background ${this.props.customClass}`;
	}

	render(){
		return (
			<div className={this.modalClass}>
				<div className="modal">
					<a href="#" className="modal-close" onClick={(e) => {this.close(e)}} ></a>
					<div className="modal-content">
						<h4 className="title">{this.props.title}</h4>
						<ul className="list">
							{this.list}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

Modal.propTypes = { 
	list: React.PropTypes.object,
	close: React.PropTypes.func,
	title: React.PropTypes.string,
	customClass: React.PropTypes.string
};