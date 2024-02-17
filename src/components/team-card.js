import * as React from "react";
import styled, {css} from "styled-components";

const TeamCardContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    height: 80px;
    width: auto;
    padding: 5px;
    color: #222;
    
    ${({ isMyTurn }) => isMyTurn && css`
        background-color: #7cb174;
    `}
`;

const TeamCard = ({ team, isMyTurn }) => {
    return <TeamCardContainer isMyTurn={isMyTurn}>
        <div>{team.name}</div>
        <div>Score: {team.score}</div>
    </TeamCardContainer>
};

export default TeamCard;