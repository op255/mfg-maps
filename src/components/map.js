import * as React from 'react';
import { ReactComponent as MapSvg } from './assets/Map.svg';
import styled, {css} from "styled-components";

const MapContainer = styled.div`
    background: #a1cef6;
    border-radius: 10px;
    width: 80%;
    height: 100%;
    
    svg {
        width: 100%;
        height: 100%;
        
        .zone {
            transition: all 0.1s ease-in-out;

            ${({ disableHover }) => !disableHover && css`
                &:hover {
                    filter: contrast(0.8);
                }
            `}
            
            path {
                fill: #fff3dd;
            }
            
            ${({ zoneColors }) => Object.entries(zoneColors).map(([zoneId, color]) => css`
                &[data-name="zone_${zoneId}"] path {
                    fill: ${color};
                }
            `)}
            
            ${({ disabledZones }) => disabledZones.map(zoneId => css`
                &[data-name="zone_${zoneId}"] path {
                    fill: #666;
                }
            `)}
        }
    }
`;

const Map = ({ teams, disabledZones, onZoneClick, gameState }) => {
    const zoneColors = teams.reduce((acc, team) => {
        team.zones.forEach(zone => {
            acc[zone] = team.color;
        });
        return acc;
    }, {});

    return <MapContainer
        zoneColors={zoneColors}
        disabledZones={disabledZones}
        disableHover={false}
    >
        <MapSvg onClick={(event) => {
            const parent = event.target.parentElement;
            if (!parent || !parent.dataset.name || !parent.dataset.name.split('_')[1]) return;

            console.log('Zone click: ', parent.dataset.name.split('_')[1]);
            onZoneClick(parent.dataset.name.split('_')[1]);
        }}/>
    </MapContainer>;
};

export default Map;