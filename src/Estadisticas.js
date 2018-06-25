import React from 'react';
import {Tooltip, Progress} from 'antd'

function getPercentage(x,y){
    let total = Number(x) + Number(y);

    let xP = (x*100)/total;
    let yP = (y*100)/total;

    return {home: xP, away: yP}

}

const Estadisticas = (props) => {

    const baseHome = props.datos.home_team_statistics;
    const baseAway = props.datos.away_team_statistics;

    let tiros = getPercentage(baseHome.attempts_on_goal, baseAway.attempts_on_goal);
    let posesion = getPercentage(baseHome.ball_possession, baseAway.ball_possession);
    let faltas = getPercentage(baseHome.fouls_committed, baseAway.fouls_committed);

    return(
        //TODO ESTO PASARLO A COMPONENTE Progress.js
        //<Progress home={baseHome.attempts_on_goal} away={baseAway.attempts_on_goal}/>
        //Pasarle: tiros a gol, posesión de balón, tarjetas, pases y % de pases buenos
        <div className="container mainPartido">
            <Tooltip title={`${baseHome.attempts_on_goal} / ${baseAway.attempts_on_goal}`}>
                {baseHome.attempts_on_goal}
                <Progress percent={100} successPercent={tiros.home} />
                {baseAway.attempts_on_goal}
            </Tooltip>
            <Tooltip title={`${baseHome.ball_possession} / ${baseAway.ball_possession}`}>
                <Progress percent={100} successPercent={posesion.home} />
            </Tooltip>
            <Tooltip title={`${baseHome.fouls_committed} / ${baseAway.fouls_committed}`}>
                <Progress percent={100} successPercent={faltas.home} />
            </Tooltip>
        </div>
        
    )
}

export default Estadisticas;