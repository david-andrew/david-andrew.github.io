import React from 'react'
import { PageContainer, PageHeading, Collage } from '../../Components'
import { ExternalLink } from '../../utilities'
import YouTube from 'react-youtube'
import { Grid } from 'semantic-ui-react'

export const Mechatronics = (): JSX.Element => {
    const mazeSolver_r = require.context('../../images/mechatronics/maze_solver')
    const mazeSolver_imageSrcs = mazeSolver_r.keys().map((path: string) => mazeSolver_r(path).default) as string[]

    return (
        <>
            <PageContainer>
                <PageHeading title="Mechatronics" subtitle="May 2019" />
                <p>
                    During my final graduate semester at JHU, I participated in Mechatronics (EN.530.421) where I built several small scale robots from scratch.
                </p>
                <h3>Maze Solving Robot</h3>
                <p>
                    The first robot we built was a maze solving robot. For sensors, we were allowed a single{' '}
                    <ExternalLink href="https://pixycam.com/pixy-cmucam5/">PixyCam</ExternalLink>, an ultrasonic depth sensor, and a pair of flexible
                    deformation sensors. For this robot, I was on a team with two other people. My responsibilities consisted of designing and fabricating the
                    chassis, while they focused on programming the robot.
                </p>
                <h4>Pictures &amp; Video</h4>
                <Grid columns={2}>
                    <Grid.Column>
                        <Grid.Row>
                            <Collage imageSrcs={mazeSolver_imageSrcs} />
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid.Row>
                            <YouTube videoId="_ZzZNforl5k" opts={{ width: '100%', height: '753px' }} />
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
                <h3>Balancing Robot</h3>
                <p>about...videos/pictures</p>
                <h3>Hockey Robot</h3>
                <p>about...videos/pictures</p>
            </PageContainer>
        </>
    )
}
