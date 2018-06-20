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
            <p>{fecha.date()}/{fecha.month()+1}</p>
            <p>{fecha.hours()}:00 Hrs.</p>
        </div>
    )
    let marcador = (
        <div>
            <p>{props.partido.home_team.goals}</p>
            <p>{props.partido.away_team.goals}</p>
        </div>
    )
    
    let goles;

    if(props.partido.status === 'in-progress'){
        goles = (
            <div>
                <Goles datos={props.partido.home_team_events}/>
                <Goles datos={props.partido.away_team_events}/>
            </div>
        )
    }else{
        goles = null
    }

    return(
        <div>
            {location} 
            {props.partido.status !== "future"? marcador:null}
            <Bandera equipo={props.partido.home_team.code} paises={props.paises}/>
            <Bandera equipo={props.partido.away_team.code} paises={props.paises}/>
            {goles}
        </div>
    )

        //if props.status === 'in-progress':
        //<Estadisticas estad={props.home_team_statistics}>
}

export default Partido;