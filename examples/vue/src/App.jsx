import { LeftOutlined } from '@twist-icons-vue/antd'
import { CheckCircleFilled, LogoGithubFilled } from '@twist-icons-vue/tdesign'
import './App.css'

const App = {
  name: 'App',
  render() {
    return (
      <div id='root'>
        <h1>Antd Icons Display</h1>
        <span style={{ fontSize: '32px', color: '#4cb8b4' }}>
          <LeftOutlined />
        </span>
        <h1>Tdesign Icons Display</h1>
        <span style={{ fontSize: '32px', color: '#4cb8b4' }}>
          <CheckCircleFilled />
        </span>
        <span style={{ fontSize: '32px' }}>
          <LogoGithubFilled dsa="dsau"/>
        </span>
      </div>
    )
  }
}

export default App
