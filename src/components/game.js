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

const shuffleTurnsOrder = arr => arr.concat(arr.splice(0, 1));

const Game = ({ map }) => {
    const [teams, setTeams] = React.useState([]);
    const [gameState, setGameState] = React.useState('prepare');
    const [turnsOrder, setTurnsOrder] = React.useState([]);
    const [currentTurn, setCurrentTurn] = React.useState(null);
    const [roundNumber, setRoundNumber] = React.useState(0);


    return <GameContainer>
        <MapContainer></MapContainer>
        <GameControls
            teams={teams}
            onTeamAdded={teamName => {
                setTeams([...teams, {
                    name: teamName,
                    score: 1000
                }]);
            }}
            onGameStart={() => {
                setGameState('started');
                setCurrentTurn(0);
                setRoundNumber(1);
                setTurnsOrder(teams.map((tmp, index) => index));
            }}
            onTurnComplete={() => {
                if (currentTurn === teams.length - 1) {
                    setRoundNumber(roundNumber + 1);
                    setTurnsOrder(shuffleTurnsOrder([...turnsOrder]));
                }

                setCurrentTurn((currentTurn + 1) % teams.length);
            }}
            gameState={gameState}
            currentTurn={turnsOrder[currentTurn]}
            roundNumber={roundNumber}
        />
    </GameContainer>
};

export default Game;