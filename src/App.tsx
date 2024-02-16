import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
// import testPic from '/logo512.png';

function App() {
  // console.log(logo);
  // console.log('public url: ', process.env);
  // console.log('testPic:', testPic);
  // console.dir(`${process.env.PUBLIC_URL}` + '/logo512.png');
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('run code...');
  }, [count])
  function handleClick() {
    console.log('click...');
    setCount(count + 1)
  }
  return (
    <div className="App">
      {/* <img src="/logo512.png" alt="big logo test" /> */}
      {/* <div className="pic-test" style={{ background: url('/logo512.png'), height: '200px' }}></div> */}
      {/* <div className="pic-test" style={{ background: `url('${process.env.PUBLIC_URL}/logo512.png')`, height: '200px' }}></div> */}
      {/* <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="" /> */}
      {/* <img src="./logo.svg" alt="" /> // 这样写路径会原样编译到结果中 */}
      {/* <div className="pic-test"></div> */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={handleClick}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
