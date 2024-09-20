import { IconProvider } from '@twistify/react-icons'
import { AiThunderboltFilled } from '@twistify/react-icons/ai'
import { TiModeDark } from '@twistify/react-icons/ti'
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
