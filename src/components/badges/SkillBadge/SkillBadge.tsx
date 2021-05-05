import { Chip, Grow, Slider, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

interface ISkillBadgeProps {
    title: string;
    skill: number;
}

const SkillBadge: React.FC<ISkillBadgeProps> = ({title, skill}) => {

    const classes = useStyles();

    const [sliderVisible, setSliderVisible] = React.useState(false);

    const handleChipClick = () => {
        setSliderVisible(!sliderVisible);
    }

    const marks = [
        {
            value: skill,
            label: String(skill),
        },
    ]

    return (
        <div className={classes.root}>
            <Chip
                label={title}
                clickable
                color="primary"
                onClick={handleChipClick}
            />
            {
                sliderVisible ?
                <div>
                    <Grow in={sliderVisible}>
                        <Typography variant="subtitle2" gutterBottom className={classes.innerText}>
                            {`La mia abilità con ${title} è pari a:`}
                        </Typography>
                    </Grow>
                    <Grow in={sliderVisible}>
                        <Slider
                            defaultValue={skill}
                            aria-labelledby="discrete-slider-restrict"
                            step={null}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                    </Grow>
                </div> :
                null
            }
        </div>
    )
}

export default SkillBadge;
