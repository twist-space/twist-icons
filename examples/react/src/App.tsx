import './App.css'
import { VerticalLeftOutlined, RightCircleFilled } from '@twist-icons-react/andt'
import { Video, CheckCircleFilled } from '@twist-icons-react/tdesign'
function App() {

  return (
    <div>
      <h1>Antd Icon Display</h1>
      <span style={{fontSize: '80px'}}>
        <VerticalLeftOutlined />
      </span>
      <RightCircleFilled />
      <h1>Tdesign Icon Display</h1>
      <span style={{fontSize: '80px', color: "#00d8ff"}}>
        <Video />
      </span>
      <span style={{fontSize: '80px', color: "#2ba471"}}>
        <CheckCircleFilled />
      </span>
    </div>
  )
}

export default App
