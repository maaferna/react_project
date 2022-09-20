import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from "./DishDetailComponent";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Aboutus from './AboutusComponent';
import { addComment, fetchDishes } from '../redux/ActionCreators';

//Redux configuration
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

const mapDispatchToProps = (dispatch) =>({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () =>{dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});

  class Main extends Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      this.props.fetchDishes();
    }

    render() {

    const HomePage = () => {
      return(
          <Home  dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoagind}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.filter((promo)=> promo.featured)[0]} 
                leader={this.props.leaders.filter((leader)=> leader.featured)[0]}/>
      );
    }

    const DishWithId = () => {
      const params = useParams();
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoagind}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter((comment)=>comment.dishId === parseInt(params.dishId,10))}
          addComment={this.props.addComment}
         />
      );
    }


    return (
      <div>
        <Header/>
        <Routes>
          <Route path='/home' element={ <HomePage/> } />
          <Route path='/contactus' element={ < Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
          <Route path='/aboutus' element={ < Aboutus leaders={this.props.leaders}/>} />
          <Route exact path='/menu' element={<Menu dishes={this.props.dishes} />} />
          <Route path='/menu/:dishId' element={<DishWithId/>} />
          <Route path='*' element={<Navigate replace to="/home" />} />
        </Routes>
        <Footer/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);