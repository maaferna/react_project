import React from "react";
import { Media, Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


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

function RenderComments({comments}){
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
        </div>
        );
    }

    const DishDetail= (props) =>{
        if (props.dish != null) {
            return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.dish.comments} />
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