import React from 'react';
import { Timeline } from '@material-ui/lab';
import useStyles from '../styles';
import Item from '../Item';

const CTimeline = () => {
  const classes = useStyles();

  return (
    <Timeline align="alternate">
      <Item 
        year="2014"
        title="Laurea Magistrale in Ingegneria Informatica"
        description="A luglio del 2014, ho conseguito la laurea in Ingegneria Informatica presso il Politecnico di Bari
        ottenendo il massimo dei voti. La tesi è stata quella che ha maggiormente influenzato il mio percorso futuro:
        ho infatti parlato della person re-identification."
        type="instruction" />
      <Item 
        year="2014"
        title="Sviluppatore Android"
        description="Una descrizione"
        type="work" />
      <Item 
        year="2015 - 2018"
        title="Dottorato di Ricerca"
        description="Una descrizione"
        type="instruction" />
      <Item 
        year="2019"
        title="Data Scientist"
        description="Energy@Work"
        type="work" />
      <Item 
        year="2019 - 2021"
        title="AutoLogS"
        description="Una descrizione"
        type="work" />
      <Item 
        year="2019 - 2021"
        title="VULMA"
        description="Una descrizione"
        type="project" />
    </Timeline>
  );
}

export default CTimeline;
