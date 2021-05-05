import Item from '../Item';
import React from 'react';
import { Timeline } from '@material-ui/lab';
import useStyles from '../styles';

const CTimeline = () => {
  const classes = useStyles();

  return (
    <Timeline align="alternate">
      <Item 
        year="2014"
        title="Laurea Magistrale"
        description="A luglio del 2014, ho conseguito la laurea in Ingegneria Informatica presso il Politecnico di Bari
        ottenendo il massimo dei voti."
        type="instruction" />
      <Item 
        year="2014"
        title="Sviluppatore Mobile"
        description="Subito dopo la laurea, ho iniziato a lavorare come sviluppatore Android presso SSTlab, laboratorio del Politecnico di Bari."
        type="work" />
      <Item 
        year="2015 - 2018"
        title="Dottorato di Ricerca"
        description="Un anno dopo la laurea, ho iniziato il mio percorso nel mondo della ricerca, iniziando il Dottorato in Ingegneria Elettrica e dell'Informazione."
        type="instruction" />
      <Item 
        year="2019"
        title="Data Scientist"
        description="Una volta conseguito il titolo di Dottore di Ricerca, ho lavorato come consulente presso Energy@Work, occupandomi di progetti in ambito energetico."
        type="work" />
      <Item 
        year="2019 - 2021"
        title="Sviluppatore Mobile"
        description="Nell'ottobre del 2021, sono tornato ad occuparmi di sviluppo in ambito mobile, questa volta per AutoLogS, spin-off del Politecnico di Bari."
        type="work" />
    </Timeline>
  );
}

export default CTimeline;
