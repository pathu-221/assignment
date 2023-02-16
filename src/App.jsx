import { useState, useEffect } from 'react'

import NavBar from './component/Navbar'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { ImCross } from 'react-icons/im';
import { TiTick } from 'react-icons/ti';
import './App.css';


function App() {
  const [finalseq, setSeq] = useState(null);
  const [answer, setAnswer] = useState(true);
  const [input, setInput] = useState({ a1: 0, a2: 0 });
  const [show, setShow] = useState(false);
  const [currentLevel, setcurrentLevel] = useState(1);

  const generateSeq = () => {
    // let a1 = 4, a2 = 1, d1 = 3;
    let a1 = Math.floor(Math.random() * (20 - 1) + 1);
    let a2 = Math.floor(Math.random() * (20 - 1) + 1);
    let d1 = Math.floor(Math.random() * (20 - 1) + 1);
    let seq = [];

    seq[0] = { a1: a1, a2: a2 };
    setInput({ a1: '', a2: '' });

    for (var i = 1; i < 5; i++) {
      if (i % 2 === 0) {
        let temp = a1 + a2;
        a2 = a1 + d1;
        seq[i] = { a1: temp, a2: a2 };
        a1 = temp;
      }
      else {
        let temp = a1 + d1;
        a2 = a1 + a2;
        seq[i] = { a1: temp, a2: a2 };
        a1 = temp;
      }
    }
    setSeq([...seq]);
  }

  useEffect(() => {
    generateSeq();

    return () => {

    }
  }, [])

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: Number(value)
    })
  }

  const check = () => {
    setShow(true);
    if (input.a1 === finalseq[4].a1 && input.a2 === finalseq[4].a2) {
      setAnswer('right');

    }
    else {
      setAnswer('wrong');
    }
    setInput({ a1: '', a2: '' });
  }

  return (
    <>
      <NavBar />
      <div className='App'>
      <p className='paragraph'>Mental Maths -Level {currentLevel}</p>
        <div className="content-container">
  
          <ul>
            {
              finalseq && finalseq.map((pair, index) => {
                return (
                  index < 4 && <li key={pair.a1}>{`(${pair.a1},${pair.a2}),`}</li>
                )
              })
            }
          </ul>
          <span className="input-container">
            {'('}
            <input name='a1' value={input.a1} onChange={onChange} type={'number'} />
            {','}
            <input name='a2' value={input.a2} onChange={onChange} type={'number'} />
            {')'}
          </span>


        </div>
        <Button variant="dark" onClick={check}>Submit</Button>

      </div>

      {
        answer &&
        <div className="d-flex flex-column mx-4 fixed-bottom">
          <Alert show={show} 
          variant={`${answer === 'right' ? 'success' : 'danger'} py-2 d-flex justify-content-between `}>
            <Alert.Heading className='d-flex align-items-center m-0'>
              {
                answer === 'right' ? (<><TiTick style={{ marginRight: '8px' }} /> Right !</>) :
                  (<><ImCross style={{ marginRight: '8px' }} /> Wrong !</>)

              }
            </Alert.Heading>
            <Button variant="light" onClick={() => { 
              generateSeq(); 
              setShow(false); 
              setcurrentLevel(currentLevel + 1);
              setAnswer(null) }}>Next</Button>
          </Alert>
          {(
            answer === 'wrong') ?
            <p>Correct answer is: {`(${finalseq[4].a1}, ${finalseq[4].a2})`} </p> : null}
        </div>
      }
    </>
  )
}

export default App
