import React from 'react';

const Goles = (props) => {
    let goles = props.datos.filter( evento => {
        return evento.type_of_event === "goal" || evento.type_of_event === "goal-penalty" || evento.type_of_event === "goal-own"
    }).map( g => {
        //console.log(g)
        if(g.type_of_event === 'goal-own'){
            return(
                <p>{g.player} <i>{g.time}</i> (Own-goal)</p>
            )
        }else{
            return(
                <p>{g.player} <i>{g.time}</i></p>
            )
        }

    })

    return goles
}


export default Goles