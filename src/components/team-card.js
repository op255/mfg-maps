import * as React from "react";
import styled, {css} from "styled-components";

const TeamCardContainer = styled.div`
    position: relative;
    background-color: ${({ teamColor }) => teamColor};
    border-radius: 10px;
    height: 80px;
    width: auto;
    padding: 5px;
    color: #222;
`;

const ActiveMarker = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    width: 15px;
    height: 15px;
    background-color: #7cb174;
    border: 1px solid #222;
    border-radius: 50%;
`;

const TeamCardContentContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 5px;
    height: 68px;
    width: 50%;
    border: 1px solid #c5c5c5;
`;

const TeamCard = ({ team, isMyTurn, onTeamClick }) => {
    return <TeamCardContainer
        onClick={onTeamClick}
        teamColor={team.color}
    >
        <TeamCardContentContainer>
            <div>{team.name}</div>
            <div>Очки: {team.score}</div>
        </TeamCardContentContainer>
        {isMyTurn && <ActiveMarker />}
    </TeamCardContainer>
};

export default TeamCard;