import {default as ReactDOM, render} from 'react-dom';
import React from "react";
import "./style.css";


class Form extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        clearInterval(this.props.updateTimer); //This will do nothing on the first submit, but it doesn't seem detrimental

        const elements = e.target.elements;
        let hours      = elements.hours.value;
        let minutes    = elements.minutes.value;
        let seconds    = elements.seconds.value;

        if (hours === '')   { hours   = 0; }
        if (minutes === '') { minutes = 0; }
        if (seconds === '') { seconds = 0; }

        hours   = parseInt(hours, 10);
        minutes = parseInt(minutes, 10);
        seconds = parseInt(seconds, 10);

        this.props.onInit(hours, minutes, seconds);

        elements.hours.value   = '';
        elements.minutes.value = '';
        elements.seconds.value = '';
    }


    render() {
        return (
            <form id="countdownTimerForm" onSubmit={this.handleSubmit}>

                <div className="form-group">
                    <label>Heures:</label>
                    <input type="number" min="0" name="hours"></input>
                </div>

                <div className="form-group">
                    <label>Minutes:</label>
                    <input type="number" min="0" name="minutes"></input>
                </div>

                <div className="form-group">
                    <label>Secondes:</label>
                    <input type="number" min="0" name="seconds"></input>
                </div>

                <input type="submit" value="Lancer le compteur" />

            </form>

        );
    }
}


export class CountdownTimer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <h2 id="countdownTimer" style={{fontSize: 32}}>{this.props.hours}:{this.props.minutes}:{this.props.seconds}</h2>
        );
    }
}


export class All extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours:   '00', //It doesn't like 00 as a number - ???
            minutes: '00',
            seconds: '00'
        };
        this.updateTimer = '';
        this.handleInit           = this.handleInit.bind(this);
        this.updateCountdownTimer = this.updateCountdownTimer.bind(this);
    };

    updateCountdownTimer = (countDownDate) => {
        console.log('updateCountdownTimer() called.');
        const self = this;

        this.updateTimer = setInterval(function() {
            const now           = new Date().getTime();
            const timeRemaining = countDownDate - now;
            const hours         = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes       = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds       = Math.floor((timeRemaining % (1000 * 60)) / 1000);


            self.setState({hours: hours, minutes: minutes, seconds: seconds}, () => {
                let hours   = self.state.hours;
                let minutes = self.state.minutes;
                let seconds = self.state.seconds;

                if (hours < 10)   { hours   = '0' + hours;   }
                if (minutes < 10) { minutes = '0' + minutes; }
                if (seconds < 10) { seconds = '0' + seconds; }
                document.getElementById("countdownTimer").innerHTML =  hours + ":" + minutes + ":" + seconds;
            });
            if (timeRemaining < 0) {
                clearInterval(this.updateTimer);
                document.getElementById("countdownTimer").innerHTML = "FIN";
            }
        }, 1000);
    };

    handleInit = (hours, minutes, seconds) => {
        console.log('handleInit() called.');

        if (hours + minutes + seconds === 0) {
            document.getElementById("countdownTimer").innerHTML = "Renseigner les champs svp";
            return;
        }
        let countDownDate = new Date();
        countDownDate.setHours(countDownDate.getHours()     + hours);
        countDownDate.setMinutes(countDownDate.getMinutes() + minutes);
        countDownDate.setSeconds(countDownDate.getSeconds() + seconds);
        this.updateCountdownTimer(countDownDate);
    };

    render() {
        const { hours, minutes, seconds } = this.state;
        return (
            <React.Fragment>
                <Form hours={hours} minutes={minutes} seconds={seconds} onInit={this.handleInit} updateTimer={this.updateTimer}/>

                <CountdownTimer hours={hours} minutes={minutes} seconds={seconds} />
            </React.Fragment>
        );
    }
}

ReactDOM.render(<All />, document.getElementById('root'));