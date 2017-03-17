import React, { Component } from 'react';
import Clock from './Clock';
import './App.css';
import  { Form, FormControl, Button } from 'react-bootstrap';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            deadline : 'December 31, 2017' ,
            newDeadline : ''
        }
    }

    changeDeadline(){
        this.setState({deadline: this.state.newDeadline})
    }

    formatDate(date){
        const myDate = new Date(date);
        console.log(myDate);
        let myMonth ;
        switch( myDate.getMonth() ) {
                case 0 : myMonth = 'January' ; break;
                case 1 : myMonth = 'February' ; break;
                case 2 : myMonth = 'March' ; break;
                case 3 : myMonth = 'April' ; break;
                case 4 : myMonth = 'May' ; break;
                case 5 : myMonth = 'June' ; break;
                case 6 : myMonth = 'July' ; break;
                case 7 : myMonth = 'August' ; break;
                case 8 : myMonth = 'September' ; break;
                case 9 : myMonth = 'October' ; break;
                case 10 : myMonth = 'Novermber' ; break;
                case 11 : myMonth = 'December' ; break;
                default : break;  
        }
        console.log(myMonth);
        let myDay = myDate.getDate();
        console.log(myDay);
        const myYear = myDate.getFullYear();
        console.log(myYear);
        console.log(myMonth + ' ' + myDay + ', ' + myYear )
        return myMonth + ' ' + myDay + ', ' + myYear ;
        
    }

    render() {
        return( 
        <div className='App' >
            <div className='App-title' >Countdown to {this.state.deadline} </div>
            <br />
            <Clock deadline={this.state.deadline} />
            <Form inline>
                <FormControl
                    type='date' 
                    className='Deadline-input'
                    onChange={ event => this.setState({newDeadline: this.formatDate(event.target.value)}) } 
                />
                <Button className='button-click' onClick={ () => this.changeDeadline() } >
                    submit
                </Button>
            </Form>
        </div> 
        )
    }
}

export default App;