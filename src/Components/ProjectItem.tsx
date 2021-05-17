import React, { useEffect, useState } from 'react'
import { Icon, Item } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { ProjectContent } from '../Pages/Projects/ProjectSummaries'
import axios from 'axios'

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const ProjectItem = ({ title, github, lastUpdated, imgSrc, internalLink, externalLink, summary }: ProjectContent): JSX.Element => {
    //history object for navigating when clicking an item
    const history = useHistory()

    //handle pulling the github last update timestamp. If no repo, fallback on raw lastUpdated string
    const [update, setUpdate] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (github !== undefined) {
            //API call to github for the repo
            ;(async () => {
                try {
                    // await sleep(5000)
                    const response = await axios.get(`https://api.github.com/repos/david-andrew/${github}`)
                    const updatedAt = new Date(response.data['updated_at'])
                    setUpdate(`Last Updated: ${updatedAt.toDateString()}`)
                } catch {
                    setUpdate('Last Updated: <Failed to fetch timestamp>')
                }
            })()
        } else if (lastUpdated !== undefined) {
            setUpdate(`Last Updated: ${lastUpdated}`)
        } else {
            setUpdate('Last Update: Unknown')
        }
    }, [])

    //loading symbol while update timestamp is undefined
    const updateElement: JSX.Element =
        update !== undefined ? (
            <>{update}</>
        ) : (
            <>
                Last Updated: <Icon loading name="clock outline" />
            </>
        )

    //summary text. TODO->should display the whole summary
    const maxSummaryLength = 600
    const displaySummary: string = summary.length < maxSummaryLength ? summary : `${summary.slice(0, maxSummaryLength)} ...`

    //formatting to make each item highlightable
    //track if the mouse is hovering over the element
    const [hover, setHover] = useState<boolean>(false)
    const onClick = () => {
        if (internalLink !== undefined) history.push(internalLink)
    }

    return (
        <Item
            {...(externalLink !== undefined ? { as: 'a', href: externalLink, target: '_blank' } : { as: 'div', onClick: onClick })}
            style={{
                color: 'white',
                padding: '1%',
                border: '0.08em solid #000000',
                borderColor: 'transparent',
                ...(hover ? { borderColor: '#FFFFFF' } : {}),
            }}
            onClick={onClick}
            onMouseEnter={(): void => setHover(true)}
            onMouseLeave={(): void => setHover(false)}
        >
            <Item.Image src={imgSrc} />
            <Item.Content>
                <Item.Header style={{ color: 'white' }}>{title}</Item.Header>
                <Item.Meta style={{ color: 'white' }}>{updateElement}</Item.Meta>
                <Item.Description style={{ color: 'white' }}>{displaySummary}</Item.Description>
            </Item.Content>
        </Item>
    )
}
