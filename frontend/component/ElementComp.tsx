import { useState } from 'react'
import styled from 'styled-components'
import { IElement } from '../db/db'

const ElementSC = styled.div`
    border: 1px solid #00000055;
    border-radius: 7px;
    display: grid;
    position: relative;
    padding: 1rem .5rem;
    img {
        display: flex;
        justify-self: center;
        align-items: center;
    }
    .bg{
        border-radius: inherit;
        background: linear-gradient(#0077bf00, #0077bf);
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        transition: all .3s ease-out;
    }
    &:hover{
        .bg{
            transform: scaleY(-1);
        }
    }
`

const Description = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    min-height: 10px;
    max-height: 20px;
    transition: min-height .5s ease-out, max-height .5s ease-out;
    &.show{
        min-height: ${props => props.minHeight}px;
        max-height: ${props => props.minHeight}px;
        white-space: normal;
    }
`

interface IElementComp {
    appName: string;
    nameGroup: string;
    element: IElement
}

const ElementComp = ({ appName, nameGroup, element: { title, description, details: { url, openInNewTab, images: { desktop, mobile } } } }: IElementComp) => {
    const [showDescription, setShowDescription] = useState(false)
    const [minHeight, setminHeight] = useState(0)

    return (
        <ElementSC>
            <div className="bg"/>
            <img className="size-img" src={`http://${desktop}`} alt={`${appName}, ${nameGroup}, ${title}`} />
            {url ? <h3><a href={url} target={openInNewTab ? "_blank" : "_self"}>{title}</a></h3> : <h3>{title}</h3>}
            <Description
                minHeight={minHeight}
                className={showDescription ? "show" : ""}
                onClick={(e) => {
                    setTimeout((e) => {
                        setminHeight(e.target.scrollHeight)
                    },10 ,e);
                    setShowDescription(!showDescription)
                }}
            >{description}</Description>
        </ElementSC>
    )
}

export default ElementComp;