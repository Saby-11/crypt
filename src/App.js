import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './Components/Header';
import Home from './Pages/Home';
import Coin from './Pages/Coin';
import {makeStyles} from '@material-ui/core'
import Alert from './Components/Alert';

function App() {
  const useStyles = makeStyles(() => ({
    App:{
      backgroundColor: '#14161a',
      color: "white",
      minHeight: "100vh"
    },
  }))

  const classes = useStyles()
  return (
    <BrowserRouter>
      <div className={classes.App}>
          <Header/>
          <Routes>
          <Route path="/" element= {<Home/>} exact/>
          <Route path="/coins/:id" element= {<Coin/>} />
          </Routes>
      </div>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
