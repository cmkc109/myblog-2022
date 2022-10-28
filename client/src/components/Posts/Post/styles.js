import { makeStyles } from '@material-ui/core/styles';

export default makeStyles( (theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    objectFit: "cover",
    width: "100%"
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '400px',
    width: '320px'
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px',
  },
  title: {
    fontWeight:"bold",
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  [theme.breakpoints.down('sm')] : {
    card: {
      width: '340px',
      height: 'auto',
    }
  }
})) 