import React from 'react';
import {Tooltip, Progress} from 'antd'

const ProgressBar = (props) => {

    const getPercentage = (x,y) => {
        let total = Number(x) + Number(y);

        let xP = (x*100)/total;
        let yP = (y*100)/total;

        return {home: xP, away: yP}

    }
    let result = getPercentage(props.home, props.away).home;

    return(
        <div className="stat">
            <h3>{props.titulo}</h3>
            <Tooltip title={`${props.home} / ${props.away}`}>
                {props.home}
                <Progress percent={100} successPercent={ result } />
                {props.away}
            </Tooltip>
        </div>
    )

}

export default ProgressBar;