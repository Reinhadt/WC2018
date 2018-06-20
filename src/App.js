import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Partido from './Partido'
import Bandera from './Bandera'

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      current: null,
      siguiente: null,
      equipos : null,
      hoy : null
    }
    this.getSiguiente = this.getSiguiente.bind(this);
    this.getToday = this.getToday.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.getCurrent = this.getCurrent.bind(this);
  }

  getSiguiente() {
    axios.get('http://worldcup.sfg.io/matches')
        .then( response  => {

          let siguiente = response.data.filter( r => {
            return r.status === "future"
          })
          console.log(siguiente[0]);
          this.setState({ siguiente: siguiente[0] })
        })
  }
  getToday() {
    axios.get('http://worldcup.sfg.io/matches/today')
        .then( response  => {

          console.log(response.data);
          this.setState({ hoy: response.data })
        })
  }
  getCurrent() {
    axios.get('http://worldcup.sfg.io/matches/current')
        .then( response  => {
          console.log(response.data);
          if(response.data.length === 0){
            console.log(this.intervalo)
            clearInterval(this.intervalo)
            this.setState({ current: null })
          }else{
            console.log("si")
            this.setState({ current: response.data[0] })
          }
        })
  }
  getTeams(){
    axios.get('http://api.football-data.org/v1/competitions/467/teams',{
      headers: {'X-Auth-Token': '2c9a9879f8714d57b0ea2df6f199ee90'}
    })
        .then( response  => {
          console.log(response.data.teams);
          this.setState({ equipos: response.data.teams })
        })
  }
  componentDidMount(){
    this.getTeams();
    this.getSiguiente();
    this.getToday();
    this.getCurrent();

    //OPTIMIZACIÓN:
    //Hacer componentDidUpdate para ver si el state cambió o sigue igual en cada intervalo!!!
    this.intervalo = setInterval(() => {
      console.log("Intervalo cumplido")
      this.getCurrent()
    }, 40*1000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalo);
  }

  render() {

    let today;
    if(this.state.hoy !== null && this.state.equipos !== null){

      if(this.state.current !== null){
        today = this.state.hoy.filter( e => {
          return e.fifa_id !== this.state.current.fifa_id
        }).map( h => {
          return (
            <Partido partido={h} paises={this.state.equipos} />
          )
        })
      }else if(this.state.current === null){
        today = this.state.hoy.map( h => {
          return (
            <Partido partido={h} paises={this.state.equipos} />
          )
        })
      }


    }

    let partidos;
    console.log(this.state.equipos)
    if (this.state.current === null && this.state.siguiente !== null && this.state.equipos !== null){
      partidos =  (
        <div>
          <Partido partido={this.state.siguiente} paises={this.state.equipos} />
          {this.getToday()}
        </div>
      )

    }else if(this.state.current !==null && this.state.equipos !== null){
      partidos = (
        <div>
          <Partido partido={this.state.current} paises={this.state.equipos} />
        </div>
      )
    }

    return (
      <div className="App">
        {partidos}
        {today}
      </div>
    );
  }
}



/*  la fecha se puede hacer usando momentjs
    moment(ISO-8601)._d = fecha en formato gringo
    moment(ISO-8601)._d.getFullYear() = año
    moment(ISO-8601)._d.getDate() = día del mes y así con todos para armar la fecha en local gmt */

export default App;
