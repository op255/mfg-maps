import * as React from 'react';
import styled from 'styled-components';
import GameControls from "./game-controls";

const GameContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    
    // height fix
    height: calc(100% - 100px);
`;

const MapContainer = styled.div`
    background: white;
    border-radius: 10px;
    width: 80%;
    height: 100%;
`;



const Game = ({ map }) => {
    const [teams, setTeams] = React.useState([]);


    return <GameContainer>
        <MapContainer></MapContainer>
        <GameControls
            onTeamAdded={team => setTeams([...teams, team])}
        />
    </GameContainer>
};

export default Game;