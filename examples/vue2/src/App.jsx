import './App.css'
import { IconProvider } from '@twist-space/vue2-icons'
import { TiAdd } from '@twist-space/vue2-icons/ti'

const App = {
  name: 'App',
  render() {
    return (
      <div id='root'>
        <h2>Tdesign Icons</h2>
        <IconProvider size={80} color="red" >
          <TiAdd size={100} />
          <TiAdd size={100} />
        </IconProvider>
      </div>
    )
  }
}

export default App
