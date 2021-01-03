import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

interface Props {
  list: string[]
}

const RenderList: React.FC<Props> = (props) => {
  const { list } = props;
  return (
    <div>
      {
        list.map(item => (
          <div>{item}</div>
        ))
      }
    </div>
  )
}


function App() {
  const [data, setData] = useState(false)
  const [list, setList] = useState<string[]>([]);
  const handleClick = () => {
    setData(!data);
    setList(['12', '34']);
  }

  return (
    <div className="App">
      <header className="App-header" >
        {
          data && (<img src={logo} className="App-logo" alt="logo" />)
        }
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          onClick={handleClick}
          className="App-link"
          // href="https://reactjs.org"
          // target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <RenderList list={list}></RenderList>
      </header>
    </div>
  );
}

export default App;
