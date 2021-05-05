import { ButtonBase, Grow, Paper, Typography } from '@material-ui/core';
import {
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from '@material-ui/lab';

import GitHubIcon from '@material-ui/icons/GitHub';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import React from 'react';
import SchoolIcon from '@material-ui/icons/School';
import useStyles from '../styles';

interface IItemProps {
    year: string;
    title: string;
    description: string;
    link?: string;
    type: 'instruction' | 'work' | 'project'
}

const Item: React.FC<IItemProps> = ({year, title, description, link, type}) => {

    const classes = useStyles();

    const [descriptionVisible, setDescriptionVisible] = React.useState(true);

    const handleTimelineContentClick = () => {
        setDescriptionVisible(descriptionVisible);
    }

    const setIcon = (iconType: string) => {
        switch (iconType) {
            case 'instruction':
                return <TimelineDot variant="outlined"><SchoolIcon /></TimelineDot>;
            case 'work':
                return <TimelineDot color="secondary" variant="outlined"><LaptopMacIcon /></TimelineDot>;
            case 'project':
                return <TimelineDot color="primary" variant="outlined"><GitHubIcon /></TimelineDot>;
        }
    }

    return (
        <TimelineItem>
            <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                    {year}
                </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                {setIcon(type)}
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <ButtonBase onClick={handleTimelineContentClick}>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                            {title}
                        </Typography>
                        {
                            descriptionVisible ?
                            <Grow in={descriptionVisible}>
                                <Typography>
                                    {
                                        link !== undefined ?
                                        `${description} - ${link}` :
                                        description
                                    }
                                </Typography>
                            </Grow> :
                            null
                        }
                    </Paper>
                </ButtonBase>
            </TimelineContent>
        </TimelineItem>
    )
}

export default Item;
