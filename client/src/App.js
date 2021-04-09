import React,{createContext, useState} from 'react'
import RoutePages from './RoutePages'
import './App.css';

export const userContext = createContext();
function App() {
  // const [asd, setAsd] = useState('hello')
  // const myFunc = (x,y)=> x+y;
  return (
    <div className="App">
     <RoutePages/>
     {/* <userContext.Provider value = {{asd,setAsd,myFunc}}><RoutePages/></userContext.Provider> */}
    </div>
  );
}

export default App;
