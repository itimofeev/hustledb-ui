/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  dancersButton: {
    id: 'vhustle.containers.HomePage.dancers.Button',
    defaultMessage: 'Dancers',
  },
  competitionsButton: {
    id: 'vhustle.containers.HomePage.competitions.Button',
    defaultMessage: 'Competitions',
  },
  competitionTitle: {
    id: 'vhustle.containers.HomePage.competitions.Title',
    defaultMessage: 'Title',
  },
  competitionDate: {
    id: 'vhustle.containers.HomePage.competitions.Date',
    defaultMessage: 'Date',
  },
  errorLoadingCompetitions: {
    id: 'vhustle.containers.HomePage.competitions.ErrorLoading',
    defaultMessage: 'Error loading competitions list',
  },
});
