import React from 'react';
import Bandera from './Bandera'

const Partido = (props) => {

    let location = (
        <div>
            <p>{props.partido.location}</p>
            <p>{props.partido.venue}</p>
            <p>{Date(props.partido.dateTime)}</p>
        </div>
    )
    let marcador = (
        <div>
            <p>{props.partido.home_team.goals}</p>
            <p>{props.partido.away_team.goals}</p>
        </div>
    )

    return(
        <div>
            {location}
            <p>{props.partido.home_team.country}</p>
            {props.partido.status !== "future"? marcador:"sin marcador"}
            <Bandera equipo={props.partido.home_team.code} paises={props.paises}/>
            <Bandera equipo={props.partido.away_team.code} paises={props.paises}/>

        </div>
    )

        //if props.status === 'in-progress':
        //<Estadisticas estad={props.home_team_statistics}>
}

export default Partido;