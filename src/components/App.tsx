import * as React from "react";
//import styled from 'styled-components'

/*const Container = styled.div`
  display:flex;
`*/
const container = {
  backgroundColor:'#ededed',
  padding:'1.5em'
}

const spacing = {
  marginBottom:'20px'
}
const item = {
  width:'200px',
  padding:'20px'
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

 const [copySuccess, setCopySuccess] = React.useState('');
 const [promocode, setPromo] = React.useState('')
 const [indx, setIndex ] = React.useState(0)
 const [ rows, setRows ] = React.useState([
    {
      name:'Siteconstruction.io',
      description:'description'
    },
    {
      name:'Appvision.com',
      description:'description'
    }
  ])

 const filter = (input) => {
   let newarr = rows.filter((item) => item.name.toUpperCase().indexOf(input.toUpperCase()) > -1)
   setRows(newarr)
  }
 
  const reset = () => {
    setRows([
      {
        name:'Siteconstruction.io',
        description:'description'
      },
      {
        name:'Appvision.com',
        description:'description'
      }
    ])
  }

  const copyPromo = (i) => {
    navigator.clipboard.writeText(promocode)
    setIndex(i)
    setCopySuccess('copied')
  }

  const getPromocode = (e) => {
    setPromo(e.target.value)
  }

  const activate = () => {
    if(!!promocode)
      alert(`Your promo code ${promocode} is activated`)
    else
      alert('Please type your promo code to activate it')

    setPromo('')
  }

  return (
   <React.Fragment>
     <div style={container}> 
      <header style={spacing}>
        <div>Services</div>
        <input onChange={(e) => filter(e.target.value)} type="text" /><button onClick={reset}>reset</button>
      </header>
      {rows.map((row, index) => {
        return (
          <div key={index} style={{
            flexDirection: 'row', 
            display:'flex', 
            backgroundColor:'white',
            margin: '20px 0'
          }}>
          <div style={item}>
            <h3>{row.name}</h3>
            {row.description}
          </div>
          <div style={item}>
            <div>promocode</div>
            <i onClick={() => copyPromo(index)} style={{position: 'absolute', marginLeft: '160px'}} className="fa fa-user icon"></i>
            <input onChange={getPromocode} type="text" />
            {index === indx ? copySuccess : ''}
          </div>
          <div style={button}>
            <button onClick={() => activate()}>Activate</button>
          </div>
        </div>
        )
      })}
      
     </div>
   </React.Fragment>
  );
};

export default App;