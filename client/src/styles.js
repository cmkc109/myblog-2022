import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(45deg, #f3ec78, #e7a4f5)',
  },
  heading: {
    fontFamily: 'Merriweather',
    padding: '1rem'
  },
  image: {
    marginLeft: '15px',
  },
  [theme.breakpoints.down('sm')] : {
    mainContainer: {
      flexDirection: "column-reverse"
    }
  }
 
}));