import React,{Component} from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import '../App.css';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import About from './AboutComponent';
import {connect} from 'react-redux';
import { postComment ,fetchDishes,fetchPromos,fetchComments,postFeedback,fetchLeaders} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup,CSSTransition} from 'react-transition-group';

const mapStateToProps=state=>{
    return{
        dishes :state.dishes,
        promotions :state.promotions,
        leaders :state.leaders,
        comments :state.comments
    }
}

const mapDispatchToProps=(dispatch)=>({
    postComment:(dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment)),
    fetchDishes:()=>{dispatch(fetchDishes())},
    resetFeedbackForm :()=>{dispatch(actions.reset('feedback'))},
    fetchComments:()=>{dispatch(fetchComments())},
    fetchPromos:()=>{dispatch(fetchPromos())},
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
    fetchLeaders: () => {dispatch(fetchLeaders())}
});


class Main extends Component{

constructor(props){
    super(props);
    
}

componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
}

render(){
    const HomePage=()=>{
        return(
            <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
            promosLoading={this.props.promotions.isLoading}
            promosErrMess={this.props.promotions.errMess}
            leader={this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
            leadersLoading={this.props.leaders.isLoading}
            leadersErrMess={this.props.leaders.errMess}
            />
        );
    };

    const DishWithId=({match})=>{
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish)=> dish.id===parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comment={this.props.comments.comments.filter((comment)=>comment.dishId ===parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}/>
        );
    };
return (
    <div >
    
    <Header/>
    <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
                <Route  path="/menu/:dishId" component={DishWithId}/>
                <Route exact path="/contactus" component={()=><Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm}/> }/>
                <Route path="/aboutus" component={()=><About leaders={this.props.leaders}/>}/>
                <Redirect to="/home"/>
            </Switch>
        </CSSTransition>
    </TransitionGroup>
    <Footer/>
    </div>
);
}
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
