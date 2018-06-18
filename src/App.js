import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Bandera from './Bandera'

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      partido: null,
      equipos : null
    }
    this.getPartido = this.getPartido.bind(this);
    this.getTeams = this.getTeams.bind(this);
  }

  getPartido() {
    axios.get('http://worldcup.sfg.io/matches/tomorrow')
        .then( response  => {
          console.log(response.data[0].home_team.country);
          this.setState({ partido: response.data[0] })
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
    this.getPartido();
    this.getTeams();
    /* this.intervalo = setInterval(() => {
      this.getPartido()
    }, 60*1000); */
  }

  componentWillUnmount(){
    clearInterval(this.intervalo);
  }

  render() {
    let partidos;

    if (this.state.partido == null){
      //current partidos
     partidos =  <p>NO hay ahorita</p>
    }else if(this.state.partido !==null && this.state.equipos !== null){
      //siguiente partido
      partidos = (
        //armar un componente con info de cada equipo para desplegar
        <div>
          <p>{this.state.partido.location}</p>
          <p>{this.state.partido.venue}</p>
          <p>{this.state.partido.home_team.country}</p>
          <Bandera equipo={this.state.partido.home_team.code} paises={this.state.equipos}/>
          <Bandera equipo={this.state.partido.away_team.code} paises={this.state.equipos}/>
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
