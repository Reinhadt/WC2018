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
      equipos : null
    }
    this.getSiguiente = this.getSiguiente.bind(this);
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
    this.getCurrent();

    this.intervalo = setInterval(() => {
      console.log("Intervalo cumplido")
      this.getCurrent()
    }, 30*1000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalo);
  }

  render() {
    let partidos;
    console.log(this.state.equipos)
    if (this.state.current === null && this.state.siguiente !== null && this.state.equipos !== null){
      //<Partido partido={this.state.siguiente}>
      /* partidos = (
      <div>
        <p>{this.state.siguiente.location}</p>
        <p>{this.state.siguiente.venue}</p>
        <p>{this.state.siguiente.home_team.country}</p>
        <p>{this.state.siguiente.time}</p>

        <Bandera equipo={this.state.siguiente.home_team.code} paises={this.state.equipos}/>
        <Bandera equipo={this.state.siguiente.away_team.code} paises={this.state.equipos}/>

      </div>
      ) */
      partidos =  (
        <Partido partido={this.state.siguiente} paises={this.state.equipos} />
      )

    }else if(this.state.current !==null && this.state.equipos !== null){

      partidos = (
        //armar un componente con info de cada equipo para desplegar
        //<Partido partido={this.state.current}>
        <div>
          <p>{this.state.current.location}</p>
          <p>{this.state.current.venue}</p>
          <p>{this.state.current.home_team.country}</p>
          <p>{this.state.current.time}</p>

          <Bandera equipo={this.state.current.home_team.code} paises={this.state.equipos}/>
          <p>{this.state.current.home_team.goals}</p>
          <Bandera equipo={this.state.current.away_team.code} paises={this.state.equipos}/>
          <p>{this.state.current.away_team.goals}</p>
          {/* la fecha se puede hacer usando momentjs
          moment(ISO-8601)._d = fecha en formato gringo
          moment(ISO-8601)._d.getFullYear() = año
          moment(ISO-8601)._d.getDate() = día del mes y así con todos para armar la fecha en local gmt */}
        </div>
      )
    }
    return (
      <div className="App">
        {partidos}
      </div>
    );
  }
}

export default App;
