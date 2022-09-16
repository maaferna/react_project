import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from "./CommentFormComponent";
import { ADD_COMMENT } from "../redux/ActionTypes";

function RenderDish({dish}){
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

function RenderComments({comments, addComment, dishId}){
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
                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
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
            <CommentForm dishId={dishId} addComment={addComment} />   
        </div>
        );
    }

    const DishDetail= (props) =>{
        if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/menu'>Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>         
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dishId}/>
                    </div>
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

export default DishDetail;