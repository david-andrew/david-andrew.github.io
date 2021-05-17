import React from 'react'
import { Item } from 'semantic-ui-react'
import { ProjectContent } from '../Pages/Projects/ProjectSummaries'

export const ProjectItem = ({ title, imgSrc, summary }: ProjectContent): JSX.Element => {
    //date to display (todo->fetch from github if possible, else fallback on prewritten date, else skip)
    const displayDate: string = new Date().toDateString()

    //summary text. TODO->should display the whole summary
    const maxSummaryLength = 600
    const displaySummary: string = summary.length < maxSummaryLength ? summary : `${summary.slice(0, maxSummaryLength)} ...`

    return (
        <Item>
            <Item.Image src={imgSrc} />
            <Item.Content>
                <Item.Header style={{ color: 'white' }}>{title}</Item.Header>
                <Item.Meta style={{ color: 'white' }}>Last Updated: {displayDate}</Item.Meta>
                <Item.Description style={{ color: 'white' }}>{displaySummary}</Item.Description>
            </Item.Content>
        </Item>
    )
}
