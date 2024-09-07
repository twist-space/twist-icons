import { IconProvider } from '@twist-space/react-icons'
import { AiThunderboltFilled } from '@twist-space/react-icons/ai'
import { TiModeDark } from '@twist-space/react-icons/ti'
import './App.css'

function App() {
  return (
    <IconProvider value={{size: 60}}>
      <AiThunderboltFilled color="#906efe" />
      <TiModeDark size={30} spin />
    </IconProvider>
  )
}

export default App
