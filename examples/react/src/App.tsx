import './App.css'
import { IconContext } from '@twist-space/react-icons'
import { AiAimOutlined, AiLoading3QuartersOutlined, AiCheckCircleFilled } from '@twist-space/react-icons/ai'
import { TiApi, TiCheckCircle, TiLoading } from '@twist-space/react-icons/ti'
function App() {

  return (
    <div>
      <h1>Antd Icon Display</h1>
      <IconContext.Provider value={{ size: 60 }}>
        <AiAimOutlined />
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
    </div>
  )
}

export default App
