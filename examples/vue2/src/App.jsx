import { IconProvider } from '@twist-space/vue2-icons'
import { TiCheckCircleFilled, TiCat } from '@twist-space/vue2-icons/ti'
import './App.css'

const App = {
  name: 'App',
  render() {
    return (
      <div id='root'>
        <IconProvider size={60}>
          <TiCheckCircleFilled color="green" />
          <TiCat size={30} />
        </IconProvider>
      </div>
    )
  }
}

export default App
