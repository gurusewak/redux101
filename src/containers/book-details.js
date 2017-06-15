import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class BookDetails extends Component {
    render() {
        if (!this.props.book) {
            return (<div>Select a book to get started</div>);
        }
        return (
        	<div>
	        	<h3>Details of the book</h3>
	            <div>
	            	{this.props.book.title}
	            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { book: state.activebook }
}
export default connect(mapStateToProps)(BookDetails);
