import React from 'react'
import { PageContainer } from '../Components'
import { List } from 'semantic-ui-react'
import shield_logo from '../images/icons/university.shield.small.white.png'

const JHUShieldIcon = (): JSX.Element => {
    return <img style={{ float: 'left' }} className="icon" width="30em" height="30em" src={shield_logo} />
}

export const About = (): JSX.Element => {
    return (
        <PageContainer>
            <h1>About David</h1>

            <h2>Skills</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales odio a semper elementum. Cras non rhoncus neque, scelerisque dignissim
                nisl. Proin ac augue sit amet magna eleifend lacinia. Vivamus sollicitudin luctus posuere. Nulla mattis purus vel vehicula bibendum. Nunc non
                auctor turpis, a posuere velit. In eleifend sem id vehicula dictum. Integer eros magna, porttitor vel lectus at, dictum hendrerit metus. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas.
            </p>

            <h2>Education</h2>
            <h3>The Johns Hopkins University</h3>
            <List inverted relaxed>
                <List.Item>
                    <List.Icon as={JHUShieldIcon} verticalAlign="middle" size="large" />
                    <List.Content>
                        <List.Header>Bachelor of Science in Mechanical Engineering</List.Header>
                        <List.Description>Sept. 2014 - May 2018</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon as={JHUShieldIcon}></List.Icon>
                    <List.Content>
                        <List.Header>Master of Science in Engineering in Robotics (Machine Learning concentration)</List.Header>
                        <List.Description>Sept. 2018 - May 2019</List.Description>
                    </List.Content>
                </List.Item>
            </List>

            <h2>General</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales odio a semper elementum. Cras non rhoncus neque, scelerisque dignissim
                nisl. Proin ac augue sit amet magna eleifend lacinia. Vivamus sollicitudin luctus posuere. Nulla mattis purus vel vehicula bibendum. Nunc non
                auctor turpis, a posuere velit. In eleifend sem id vehicula dictum. Integer eros magna, porttitor vel lectus at, dictum hendrerit metus. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Proin ornare orci quis diam porttitor dapibus. Morbi eget euismod odio. Maecenas quis varius est, id aliquet
                lectus.
                <br />
                <br />
                Curabitur malesuada porttitor mauris, eget faucibus justo malesuada non. Maecenas venenatis, felis sit amet hendrerit facilisis, est massa
                tempus dolor, ac ultrices turpis urna vitae enim. Pellentesque lacus erat, vehicula ut ante quis, semper semper ligula. Aliquam eu viverra
                magna. In iaculis dapibus magna, nec convallis turpis commodo eu. Aliquam bibendum ipsum turpis. Pellentesque faucibus ipsum in convallis
                laoreet. Suspendisse leo eros, aliquam ut elit a, blandit bibendum lectus. Suspendisse sed semper sapien. Aliquam auctor, tellus id aliquet
                accumsan, lorem ante placerat velit, quis maximus tellus eros interdum tellus. Integer nibh turpis, auctor vel vulputate eu, sollicitudin ut
                tortor.
                <br />
                <br />
                Vestibulum iaculis elementum dui euismod viverra. Nullam a facilisis felis. Praesent vehicula nisl ac urna commodo, in vulputate lacus blandit.
                Maecenas vitae faucibus libero, a gravida lacus. Mauris orci est, fringilla ut eros faucibus, vestibulum lobortis sem. Aliquam erat volutpat.
                Curabitur convallis tincidunt ex, sit amet accumsan massa varius ac. Praesent dignissim enim dui, at blandit ligula rhoncus non. Suspendisse vel
                arcu turpis. Mauris facilisis luctus congue. Nullam ornare id ipsum eget dictum. Maecenas dapibus sapien et lectus semper, quis dignissim justo
                tempor. Etiam nec dignissim metus. Integer id egestas nibh, et pellentesque mi. Suspendisse eget viverra magna. Morbi congue lectus vitae orci
                semper pellentesque. Aenean tristique erat id purus imperdiet tempor. In vitae velit vitae tortor placerat consectetur ac a urna. In vel velit
                id sapien semper blandit id eget risus. Nullam vulputate dolor nec tempus dignissim. Vivamus ultricies viverra libero id finibus. Ut vitae nisi
                condimentum, maximus sapien quis, accumsan est. Quisque mollis dolor id justo condimentum, a pharetra orci ultrices. Phasellus tincidunt, velit
                ac lacinia sodales, metus eros accumsan tortor, ultricies consequat massa nibh in nunc.
            </p>
        </PageContainer>
    )
}
