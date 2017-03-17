import React, { Component } from 'react';
import './App.css';

class Clock extends Component {
        constructor(props){
            super(props);
            this.state = {
                days : 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        }

        getTimeUntil(deadline){
            if(Date.parse(deadline) > Date.parse(new Date())) {
                const time = Date.parse(deadline) - Date.parse(new Date());
                const seconds = Math.floor((time/1000) % 60) ;
                const minutes = Math.floor((time/(1000*60)) % 60) ;
                const hours = Math.floor((time/(1000*60*60)) % 24) ;
                const days = Math.floor(time/(1000*60*60*24)) ;
                this.setState({days, hours, minutes, seconds});
            }
            else {
                this.setState({days : 0, hours : 0, minutes : 0 , seconds : 0});
            }
            
        }

        componentWillMount(){
            this.getTimeUntil(this.props.deadline);
        }

        componentDidMount(){
            setInterval( () => this.getTimeUntil(this.props.deadline) ,1000);
        }

        normalLeading0(num){
            if(num < 10) return '0' + num ;
            return num;
        }
        daysLeading0(num){
            if(num < 10) return '00' + num ;
            if(num < 100) return '0' + num ;
            return num;
        }
        render(){
            
            return(<div>
                <div className='Clock-days' >{this.daysLeading0(this.state.days)} days</div>
                <div className='Clock-hours' >{this.normalLeading0(this.state.hours)} hours</div>
                <div className='Clock-mins' >{this.normalLeading0(this.state.minutes)} minutes</div>
                <div className='Clock-secs' >{this.normalLeading0(this.state.seconds)} seconds</div>
            </div>)
        }
}

export default Clock;