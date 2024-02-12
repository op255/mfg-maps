import * as React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
    background: red;
    width: 20%;
    height: 100px;
`;

const AddTeamContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const GameControls = ({ onTeamAdded }) => {
    const [gameState, setGameState] = React.useState('prepare');

    return <ControlsContainer>
        {gameState === 'prepare' && <AddTeamContainer>

        </AddTeamContainer>}
    </ControlsContainer>
};

export default GameControls;