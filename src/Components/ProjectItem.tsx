import React, { useEffect, useState } from 'react'
import { Icon, Item } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { ProjectContent } from '../Pages'
import { toMonthDayYearString } from '../utilities'
import axios from 'axios'

//TODO->move to utilities
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

//asynchronously fetch the most recent update timestamp for the github project
export const getGithubTimestamp = async (repoName: string, callback: (timestamp: Date | undefined) => void): Promise<void> => {
    try {
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
export const ProjectItem = ({ title, github, lastUpdated, imgSrc, internalLink, externalLink, summary, tags }: ProjectContent): JSX.Element => {
    //history object for navigating when clicking an item
    const history = useHistory()

    //handle pulling the github last update timestamp. If no repo, fallback on raw lastUpdated string
    const [update, setUpdate] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (github !== undefined) {
            getGithubTimestamp(github, (timestamp: Date | undefined) => {
                if (timestamp !== undefined) {
                    setUpdate(`Last Updated: ${toMonthDayYearString(timestamp)}`)
                } else {
                    setUpdate('Last Updated: <Failed to fetch timestamp>')
                }
            })
        } else if (lastUpdated !== undefined) {
            setUpdate(`Last Updated: ${lastUpdated}`)
        } else {
            setUpdate('Last Update: Unknown')
        }

        //cleanup function
        return (): void => setUpdate(undefined)
    }, [github, lastUpdated])

    //loading symbol while update timestamp is undefined
    const updateElement = getUpdateElement(update)

    //track if the mouse is hovering over the element
    const [hover, setHover] = useState<boolean>(false)

    //handle click events for internal linked projects, and fallback for projects with no links
    const onClick = (): void => {
        if (internalLink !== undefined) {
            history.push(internalLink)
        } else if (externalLink === undefined) {
            history.push('/wip')
        }
    }
    //props for internal vs external links. internal links handled by router, external links open a new tab
    const linkProps =
        externalLink !== undefined ? { as: 'a', href: externalLink, target: '_blank', rel: 'noreferrer noopener' } : { as: 'div', onClick: onClick }

    return (
        <Item
            {...linkProps}
            style={{
                color: 'white',
                padding: '1em',
                border: '0.08em solid #000000',
                borderColor: hover ? '#FFFFFF' : 'transparent',
            }}
            onClick={onClick}
            onMouseEnter={(): void => setHover(true)}
            onMouseLeave={(): void => setHover(false)}
        >
            <Item.Image verticalAlign="middle" src={imgSrc} style={{ width: '7.5em' }} />
            <Item.Content>
                <Item.Header style={{ color: 'white', fontFamily: 'quadon', fontWeight: 'normal' }}>{title}</Item.Header>
                <Item.Meta style={{ color: 'white' }}>{updateElement}</Item.Meta>
                <Item.Description style={{ color: 'white' }}>{summary}</Item.Description>
                {tags && <Item.Extra style={{ color: '#DDDDDD', fontSize: '80%' }}>Tags: {tags.join(', ')}</Item.Extra>}
            </Item.Content>
        </Item>
    )
}
