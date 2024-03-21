import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passRef = useRef(null)


  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(charAllowed) str+="!@#$%^&*()?/~"
    if(numberAllowed) str+="1234567890"
    for (let index = 1; index <= length; index++) {
      let charIndex = Math.floor(Math.random()* str.length)
      pass += str[charIndex]
    }
    setPassword(pass)
  },[length,charAllowed,numberAllowed,setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length,charAllowed,numberAllowed,setPassword])
  
  function copyToClipboard(){
    passRef.current?.select()
    // console.log((passRef.current.value));
    // passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(passRef.current.value)
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Randmom Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passRef}
          />
          <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyToClipboard}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              id='range'
              type="range"
              min={2} 
              max={100}
              value={length}
              onChange={(e)=>setLength(e.target.value)}
            />
            <label htmlFor="range">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              id='no'
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={()=>{
                setNumberAllowed((preVal)=>(!preVal))
              }}
            />
            <label htmlFor="no">Number</label>
            <input 
              id='ch'
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={()=>{
                setCharAllowed((preVal)=>(!preVal))
              }}
            />
            <label htmlFor="ch">Special Characters</label>
          </div>
        </div>
      </div>
    </>
      )
}

      export default App
