import './App.css'
import { IconContext } from '@twist-space/react-icons'
import { AiAimOutlined, AiLoading3QuartersOutlined, AiCheckCircleFilled, AiTagTwotone } from '@twist-space/react-icons/ai'
import { TiApi, TiCheckCircle, TiLoading } from '@twist-space/react-icons/ti'
import { AiTwotoneTag } from 'react-icons/ai'
function App() {

  return (
    <div>
      <h1>Antd Icon Display</h1>
      <IconContext.Provider value={{ size: 60 }}>
        <AiAimOutlined color='blue' spin />
        <AiCheckCircleFilled color='#72c240'/>
      </IconContext.Provider>
      <AiLoading3QuartersOutlined size={200} />
      <h1>Tdesign Icon Display</h1>
      <span style={{fontSize: '25px', color: "#00d8ff"}}>
        <TiApi />
        <TiCheckCircle rotate={90} ada='123' />
        <TiLoading spin />
      </span>
      <div>
        yangshi
        <TiLoading spin size={100} color='#00d8ff'/>
        <TiCheckCircle size={100} style={{ marginLeft: '30px'}} />
      </div>
      <h2>BUG</h2>
      <AiTagTwotone size={100} />
      <h2>React Icons</h2>
      <AiTwotoneTag size={100}></AiTwotoneTag>
    </div>
  )
}

export default App
