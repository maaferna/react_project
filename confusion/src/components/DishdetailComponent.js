import React, { Component } from "react";
import { Media, Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component{

    dateFormatComment(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    renderDish(dish) {
        if (dish != null)
            return (
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle style={{fontWeight: 'bold'}}>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
            );
        else
            return (
                <div></div>
            );
    }

    renderComments(comments) {
        if (comments == null) {
            return (
                <div></div>
            );
        }
        const renderedComments = comments.map((comment) => {
        return (
            <div key={comment.id}>
                <li>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {this.dateFormatComment(comment.date)}</p>
                </li>
            </div>
        );
    });
    return(
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                { renderedComments }
            </ul>   
        </div>
        );
    }

    render() {
        if (this.props.dish != null) {
            return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    { this.renderDish(this.props.dish) }
                </div>
                <div className="col-12 col-md-5 m-1">
                    { this.renderComments(this.props.dish.comments) }
                </div>
            </div>
            );
         }
        else {
            return (
            <div></div>
            );
        }
        }
}

export default DishDetail;