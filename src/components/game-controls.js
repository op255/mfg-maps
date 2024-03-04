import * as React from 'react';
import styled, {css} from 'styled-components';
import TeamCard from "./team-card";

const ButtonCommon = styled.button`
    background-color: #ed453b;
    height: 40px;
    border: unset;
    border-radius: 20px;
    color: white;
    font-size: 16px;
`;

const ControlsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    width: 20%;
    height: 100%;
`;

const AddTeamContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const Title = styled.div`
    color: white;
    font-size: 20px;
`;

const AddTeamInput = styled.input`
    height: 40px;
    border-radius: 20px;
    width: 80%;
    border: unset;
    outline: unset;
`;

const AddTeamButton = styled(ButtonCommon)`
    width: 40px;
    font-size: 24px;
`;

const StartGameButton = styled(ButtonCommon)``;

const TeamsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const GameStatusContainer = styled.div`
    margin-top: auto;
`;

const GameControls = ({
    onTeamAdded,
    onTeamClick,
    onGameStart,
    onTurnComplete,
    gameState,
    teams,
    activeTeam,
    currentTurn,
    roundNumber
}) => {
    const [teamNameInput, setTeamNameInput] = React.useState('');

    return <ControlsContainer>
        {gameState === 'prepare' && <>
            <AddTeamContainer>
                <AddTeamInput
                    name={'teamNameInput'}
                    value={teamNameInput}
                    placeholder={'Имя комманды'}
                    onChange={e => setTeamNameInput(e.target.value)}
                />
                <AddTeamButton
                    onClick={() => {
                        if (!teamNameInput) return;
                        onTeamAdded(teamNameInput);
                        setTeamNameInput('');
                    }}
                >
                    +
                </AddTeamButton>
            </AddTeamContainer>
            <StartGameButton onClick={onGameStart}>
                Начать игру
            </StartGameButton>
        </>}
        <TeamsList>
            {teams.map((team, index) => <TeamCard
                key={team.name}
                team={team}
                onTeamClick={() => onTeamClick(index)}
                isMyTurn={index === currentTurn || index === activeTeam}
            />)}
        </TeamsList>
        {gameState !== 'prepare' && <GameStatusContainer>
            <ButtonCommon
                onClick={() => onTurnComplete()}
            >
                TMP NEXT TURN
            </ButtonCommon>
            <Title>Выбор начальной территории</Title>
            <Title>Раунд: {roundNumber}</Title>
            <Title>Ход команды: {teams[0].name}</Title>
        </GameStatusContainer>}
    </ControlsContainer>
};

export default GameControls;