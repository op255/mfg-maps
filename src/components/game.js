import * as React from 'react';
import styled from 'styled-components';
import GameControls from "./game-controls";
import Map from "./map";

const GameContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    
    // height fix
    height: calc(100% - 100px);
`;

const shuffleTurnsOrder = arr => arr.concat(arr.splice(0, 1));

const availableColors = [
    '#7975b9',
    '#5af5f4',
    '#d95af5',
    '#ffef55',
    '#9bef55',
    '#ffe5e5',
    '#ff7171'
];

const Game = ({ map }) => {
    const [teams, setTeams] = React.useState([]);
    const [gameState, setGameState] = React.useState('prepare');
    const [turnsOrder, setTurnsOrder] = React.useState([]);
    const [currentTurn, setCurrentTurn] = React.useState(null);
    const [roundNumber, setRoundNumber] = React.useState(0);
    const [activeTeam, setActiveTeam] = React.useState(null);

    const toggleZoneToTeam = React.useCallback((zoneId, teamIndex) => {
        const newTeams = [...teams];

        if (teams[teamIndex].zones.includes(zoneId)) {
            newTeams[teamIndex].zones = newTeams[teamIndex].zones.filter(z => z !== zoneId);
        } else {
            const prevOwner = newTeams.find(team => team.zones.includes(zoneId));
            if (prevOwner) {
                prevOwner.zones = prevOwner.zones.filter(z => z !== zoneId);
            }
            newTeams[teamIndex].zones.push(zoneId);
        }

        setTeams(newTeams);
    }, [teams]);

    return <GameContainer>
        <Map
            teams={teams}
            gameState={gameState}
            disabledZones={gameState === 'prepare' && activeTeam !== null
                ? map.getAdjucentZones(teams.filter((_, index) => index !== activeTeam).flatMap(team => team.zones))
                : []}
            onZoneClick={zoneId => {
                if (gameState === 'prepare' && activeTeam !== null) {
                    toggleZoneToTeam(zoneId, activeTeam);
                }
            }}
        />
        <GameControls
            teams={teams}
            activeTeam={activeTeam}
            onTeamAdded={teamName => {
                setTeams([...teams, {
                    name: teamName,
                    score: 1000,
                    zones: [],
                    color: availableColors.pop()
                }]);
            }}
            onTeamClick={teamIndex => {
                if (gameState === 'prepare') {
                    setActiveTeam(teamIndex === activeTeam ? null : teamIndex);
                }
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