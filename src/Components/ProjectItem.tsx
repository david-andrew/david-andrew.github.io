import React, { useEffect, useState } from 'react'
import { Icon, Item } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { ProjectContent } from '../Pages/Projects/ProjectSummaries'
import axios from 'axios'

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

//asynchronously fetch the most recent update timestamp for the github project
const getGithubTimestamp = async (repoName: string, callback: (timestamp: Date | undefined) => void) => {
    try {
        await sleep(500) //TODO->DEBUG
        //API call to github for the repo update timestamp
        const response = await axios.get(`https://api.github.com/repos/david-andrew/${repoName}`)
        const updatedAt = new Date(response.data['updated_at'])
        callback(updatedAt)
    } catch {
        callback(undefined)
    }
}
//build the jsx for displaying the update timestamp. display a loading icon while loading
const getUpdateElement = (update: string | undefined): JSX.Element => {
    if (update !== undefined) {
        return <>{update}</>
    } else {
        return (
            <>
                Last Updated: <Icon loading name="clock outline" />
            </>
        )
    }
}

//clickable cards for each project
export const ProjectItem = ({ title, github, lastUpdated, imgSrc, internalLink, externalLink, summary }: ProjectContent): JSX.Element => {
    //history object for navigating when clicking an item
    const history = useHistory()

    //handle pulling the github last update timestamp. If no repo, fallback on raw lastUpdated string
    const [update, setUpdate] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (github !== undefined) {
            getGithubTimestamp(github, (timestamp: Date | undefined) => {
                if (timestamp !== undefined) {
                    setUpdate(`Last Updated: ${timestamp.toDateString()}`)
                } else {
                    setUpdate('Last Updated: <Failed to fetch timestamp>')
                }
            })
        } else if (lastUpdated !== undefined) {
            setUpdate(`Last Updated: ${lastUpdated}`)
        } else {
            setUpdate('Last Update: Unknown')
        }
    }, [])

    //loading symbol while update timestamp is undefined
    const updateElement = getUpdateElement(update)

    //summary text. TODO->should display the whole summary
    // const maxSummaryLength = 600
    // const displaySummary: string = summary.length < maxSummaryLength ? summary : `${summary.slice(0, maxSummaryLength)} ...`

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
                padding: '1em',
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
                <Item.Header style={{ color: 'white', fontFamily: 'quadon', fontWeight: 'normal' }}>{title}</Item.Header>
                <Item.Meta style={{ color: 'white' }}>{updateElement}</Item.Meta>
                <Item.Description style={{ color: 'white' }}>{summary}</Item.Description>
            </Item.Content>
        </Item>
    )
}
