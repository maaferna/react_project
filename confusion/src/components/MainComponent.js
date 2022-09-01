import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import DishDetail from "./DishDetailComponent";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Navigate, Route, Routes } from 'react-router-dom';
import Contact from './ContactComponent';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    };
  }

  render() {

    const HomePage = () => {
      return(
          <Home  dish={this.state.dishes.filter((dish)=> dish.featured)[0]}
                promotion={this.state.promotions.filter((promo)=> promo.featured)[0]} 
                leader={this.state.leaders.filter((leader)=> leader.featured)[0]}/>
      );
    }

    return (
      <div>
        <Header/>
        <Routes>
          <Route path="/home" element={ <HomePage/> } />
          <Route path='/contactus' element={ < Contact />} />
          <Route path="/menu" render={() => <Menu dishes={this.state.dishes} />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
        <Footer/>
      </div>
    );
  }
}

export default Main;