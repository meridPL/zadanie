import React from 'react'
import { IGroup } from '../db/db';
import ElementComp from './ElementComp';
import styled from 'styled-components'

interface IGroupComp {
    appName: string,
    group: IGroup
}

const GroupSC = styled.div`
    display: grid;
    column-gap: 10px;
    row-gap: 20px;
    align-items: flex-start;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-bottom: 3rem;
    @media (max-width: 1920px){
    }
    @media (max-width: 1024px){
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 700px){
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 450px){
        grid-template-columns: 1fr;
    }
`

const GroupComp = ({ appName, group: { title, elements } }: IGroupComp) => {
    return (
        <div>
            <h2>{title}</h2>
            <GroupSC>
                {elements.map(v => <ElementComp key={v.id} appName={appName} nameGroup={title} element={v} />)}
            </GroupSC>
        </div>
    )
}

export default GroupComp;