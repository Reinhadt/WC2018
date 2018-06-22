import React from 'react';
import moment from 'moment';

import Bandera from './Bandera'
import Goles from './Goles'

const Partido = (props) => {
    let fecha = moment(props.partido.datetime);


    let location = (
        <div>
            <p>{props.partido.location}</p>
            <p>{props.partido.venue}</p>
        </div>
    )
    let horas = (
        <div>
            <p>{fecha.date()}/0{fecha.month()+1}</p>
            <p>{fecha.hours().add(9, 'hours')}:00 Hrs.</p>
        </div>
    )
    let marcador = (
        <div>
            <h4>{props.partido.home_team.goals} - {props.partido.away_team.goals}</h4>
        </div>
    )
    let tagLive;
    if(props.partido.status === 'in progress'){
        tagLive = (
            <div className="tagLive">
                <p className="upper">live</p>
            </div>
        )
    }else{
        tagLive = null;
    }

    let tiempo = (
        <div>
            <h3 className="upper">{props.partido.time}</h3>
        </div>
    )

    let goles;

    if(props.partido.status === 'completed' || props.partido.status === 'in progress'){
        goles = (
            <div className="goles">
                <div className="golesLista">
                    <Goles datos={props.partido.home_team_events}/>
                </div>
                <div className="golesLista">
                    <Goles className="away" datos={props.partido.away_team_events}/>
                </div>

            </div>
        )
    }else{
        goles = null
    }

    return(
        <div className="card">
            {location}
            {props.partido.status !== "future"? tiempo:null}
            <div className="flexContainer">
                <Bandera equipo={props.partido.home_team.code} paises={props.paises}/>
                <Bandera equipo={props.partido.away_team.code} paises={props.paises}/>
            </div>
            <h3>{props.partido.home_team.country} vs {props.partido.away_team.country}</h3>
            {props.partido.status !== "future"? marcador:null}
            {tagLive}
            {props.partido.status === "future"? horas:null}
            {goles}
        </div>
    )

        //if props.status === 'in-progress':
        //<Estadisticas estad={props.home_team_statistics}>
}

export default Partido;