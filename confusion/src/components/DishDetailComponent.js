import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from "./CommentFormComponent";
import { ADD_COMMENT } from "../redux/ActionTypes";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Stagger, Fade } from 'react-animation-components';

function RenderDish({dish}){
        if (dish != null)
            return (
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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

function RenderComments({comments, postComment, dishId}){
        if (comments == null) {
            return (
                <div></div>
            );
        }
        const renderedComments = comments.map((comment) => {
        return (
            <Fade in>
                <div key={comment.id}>
                    <li>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                </div>
            </Fade>
            
        );
    });
    return(
        <React.Fragment>
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                <Stagger in>
                    { renderedComments }
                </Stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />   
        </div>
        </React.Fragment>
        );
    }

    const DishDetail= (props) =>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            ); 
        }
        else if (props.dish != null) {
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
                            postComment={props.postComment}
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