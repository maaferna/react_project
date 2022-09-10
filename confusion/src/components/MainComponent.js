import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from "./DishDetailComponent";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Aboutus from './AboutusComponent';


//Redux configuration
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

  class Main extends Component {
    constructor(props) {
      super(props);
                    }


    render() {

    const HomePage = () => {
      return(
          <Home  dish={this.props.dishes.filter((dish)=> dish.featured)[0]}
                promotion={this.props.promotions.filter((promo)=> promo.featured)[0]} 
                leader={this.props.leaders.filter((leader)=> leader.featured)[0]}/>
      );
    }

    const DishWithId = () => {
      const params = useParams();
      return (
        <DishDetail dish={this.props.dishes.filter((dish)=>dish.id===parseInt(params.dishId,10))[0]}
         comments={this.props.comments.filter((comment)=>comment.dishId === parseInt(params.dishId,10))}
         />
      );
    }


    return (
      <div>
        <Header/>
        <Routes>
          <Route path='/home' element={ <HomePage/> } />
          <Route path='/contactus' element={ < Contact />} />
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

export default connect(mapStateToProps)(Main);