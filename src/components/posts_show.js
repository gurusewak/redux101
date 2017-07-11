import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router-dom';

class PostShow extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id);
        this.props.fetchPost(id);
    }
    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }
    render() {
        const { post } = this.props;
        if (!post) {
            return (
                <div>Loading.....</div>
            );
        }
        console.log('post');
        console.log(post);
        return (
            <div>
            	<Link to="/">Back to Index</Link>
            	<button
            		className="btn btn-danger pull-xs-right"
            		onClick={this.onDeleteClick.bind(this)}
            	>Delete</button>
            	<h3>{post.title}</h3>
            	<h6>{post.categories}</h6>
            	<p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    console.log(posts);
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);