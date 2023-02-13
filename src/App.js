import React from 'react';
import { Studio } from './features/studio/Studio';

import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
let remain=0;

const GifProgress=()=>{
  // const newLocal = setInterval(() => {
  //   console.log('function')
  // }, 1000);
}

  useEffect(()=>{
    GifProgress()
  })
  return (
    <>
    <BrowserRouter>
      <Studio />
    </BrowserRouter>
    </>
  );
}

export default App;
