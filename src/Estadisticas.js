import React from 'react';
import Progress from './ProgressBar';

const Estadisticas = (props) => {

    const baseHome = props.datos.home_team_statistics;
    const baseAway = props.datos.away_team_statistics;

    return(
        //TODO ESTO PASARLO A COMPONENTE Progress.js
        //<Progress home={baseHome.attempts_on_goal} away={baseAway.attempts_on_goal}/>
        //Pasarle: tiros a gol, posesión de balón, tarjetas, pases y % de pases buenos
        <div className="container mainPartido">
            <h2>Statistics:</h2>
            <Progress titulo="Attempts on goal" home={baseHome.attempts_on_goal} away={baseAway.attempts_on_goal} />
            <Progress titulo="Ball possession" home={baseHome.ball_possession} away={baseAway.ball_possession} />
            <Progress titulo="Fouls" home={baseHome.fouls_committed} away={baseAway.fouls_committed} />
        </div>

    )
}

export default Estadisticas;