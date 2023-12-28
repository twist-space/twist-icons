import { IconProvider } from '@twist-space/react-icons'
import { TiCheckCircleFilled, TiCat } from '@twist-space/react-icons/ti'
import './App.css'

function App() {

  return (
    <IconProvider value={{size: 60}}>
      <TiCheckCircleFilled color='green' />
      <TiCat size={30} />
    </IconProvider>
  )
}

export default App
