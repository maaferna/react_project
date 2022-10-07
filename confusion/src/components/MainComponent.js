import React, { Component, useState, useRef } from 'react';
import Menu from './MenuComponent';
import DishDetail from "./DishDetailComponent";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Aboutus from './AboutusComponent';
import { postComment, fetchComments, fetchDishes, fetchPromos, fetchLeaders, postFeedback} from '../redux/ActionCreators';

//Redux configuration
import { Navigate, Route, Routes, useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { actions } from 'react-redux-form';

 

// animations
import { TransitionGroup, CSSTransition} from 'react-transition-group';

 

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

const mapDispatchToProps = (dispatch) =>({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () =>{dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () =>{dispatch(fetchComments())},
  fetchPromos: () =>{dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  postFeedback: () => {dispatch(postFeedback)},
});

class Main extends Component {
    constructor(props) {
      super(props);
    }
    
    componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
    }    
    
    render() {

    const HomePage = () => {
      return(
          <Home  
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promo)=> promo.featured)[0]}
                promosLoading={this.props.promotions.isLoading}
                promosErrMess={this.props.promotions.errMess}
                leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMess={this.props.leaders.errMess}
                />
      );
    }

    const DishWithId = ({match}) => {
      const params = useParams();
      return (
        <DishDetail 
          dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment)=>comment.dishId === parseInt(params.dishId,10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
         />
      );
    }
    
    return (
      <div>
        <Header />
            <TransitionGroup>
              <CSSTransition classNames="page" timeout={300}>
                <Routes>
                  <Route path='/home' element={ <HomePage/> } />
                  <Route path='/contactus' element={ < Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm}/>} />
                  <Route path='/aboutus' element={ < Aboutus leaders={this.props.leaders}/>} />
                  <Route exact path='/menu' element={<Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' element={<DishWithId/>} />
                  <Route path='*' element={<Navigate replace to="/home" />} />
                </Routes>
              </CSSTransition>
            </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);