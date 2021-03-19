import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from '@fortawesome/free-solid-svg-icons'
//import styled from 'styled-components'

/*const Container = styled.div`
  display:flex;
`*/
const container = {
  backgroundColor:'#f5f7fa',
  padding:'1.5em',
  fontSize:'1.0em',
  fontFamily: 'Montserrat, sans-serif'
}

const spacing = {
  marginBottom:'20px'
}
const item = {
  width:'200px',
  padding:'20px'
}

const first = {
  marginRight:'5em'
}

const button = {
  padding:'20px',
  marginTop:'19px'
}

const copy = {
    marginLeft: '-50px',
    height: '20px',
    width: '20px',
    background: 'blue',
    color: 'white',
    border: 0,
    WebkitAppearance: 'none'
}

const App = () => {
 const itemsRef = React.useRef([]);
 const btnRef = React.useRef([]);
 const [copySuccess, setCopySuccess] = React.useState('');
 const [promocode, setPromo] = React.useState('')
 const [indx, setIndex ] = React.useState(0)
 const [ rows, setRows ] = React.useState([
    {
      name:'Siteconstruction.io',
      description:'description',
      code:'12vvdf'
    },
    {
      name:'Appvision.com',
      description:'description',
      code:'45sfgs'
    },
    {
      name:'Analytics.com',
      description:'description',
      code:'145gf'
    },
    {
      name:'Logotype.com',
      description:'description',
      code:'145gfsdfr'
    }
  ])

 React.useEffect(() => {
  itemsRef.current = itemsRef.current.slice(0, rows.length);//clone array
  btnRef.current = btnRef.current.slice(0, rows.length);//clone array
 },[rows])

 const filter = (input) => {
   let newarr = rows.filter((item) => item.name.toUpperCase().indexOf(input.toUpperCase()) > -1)
   setRows(newarr)
  }
 
  const reset = () => {
    setRows([
      {
        name:'Siteconstruction.io',
        description:'description',
        code:'12vvdf'
      },
      {
        name:'Appvision.com',
        description:'description',
        code:'45sfgs'
      },
      {
        name:'Analytics.com',
        description:'description',
        code:'145gf'
      },
      {
        name:'Logotype.com',
        description:'description',
        code:'145gfsdfr'
      }
    ])
  }

  const activate = (i) => {
    if(btnRef.current[i].innerHTML === 'Activate bonus')
      btnRef.current[i].innerHTML = 'Activated'
    else{
      btnRef.current[i].innerHTML = 'Activate bonus'
    }
  }

  const copyPromo = (i) => {
    const promo = !!itemsRef.current[i].value ? itemsRef.current[i].value : promocode;
    navigator.clipboard.writeText(promo)
    setIndex(i)
    setCopySuccess('copied')
  }

  const getPromocode = (e) => {
    setPromo(e.target.value)
  }


  return (
   <React.Fragment>
     <div style={container}> 
      <header style={spacing}>
        <h1>Services</h1>
        <div>filter</div>
        <input style={{padding:7, border:'1px solid grey'}} onChange={(e) => filter(e.target.value)} type="text" />
        <button style={{padding:7, marginLeft:5, width:100, border:'1px solid grey', backgroundColor:'#f5f7fa'}} onClick={reset}>reset</button>
      </header>
      {rows.map((row, index) => {
        return (
          <div key={index} style={{
            flexDirection: 'row', 
            display:'flex', 
            backgroundColor:'white',
            margin: '20px 0'
          }}>
          <div style={Object.assign({}, item, first)}>
            <h3>{row.name}</h3>
            {row.description}
          </div>
          <div style={item}>
            <div>promocode</div>
            <FontAwesomeIcon onClick={() => copyPromo(index)} style={{color:'#0085ff', position: 'absolute', margin: '9px 0 0 160px'}} icon={faCopy} />
            <input onChange={getPromocode} ref={el => itemsRef.current[index] = el}  value={row.code} style={{padding:7, border:'1px solid grey'}} type="text" />
            {index === indx ? copySuccess : ''}
          </div>
          <div style={button}>
            <button ref={el => btnRef.current[index] = el} style={{padding:7, width:200, backgroundColor:'#0085ff', color:'white', border:'1px solid grey'}} onClick={() => activate(index)}>Activate bonus</button>
          </div>
        </div>
        )
      })}
      
     </div>
   </React.Fragment>
  );
};

export default App;