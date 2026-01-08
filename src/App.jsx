import React from 'react'
import { Navbar,Welcome,ShaderBackground,Dock} from '#components'

function App() {
  return (
    <main>
      <ShaderBackground />
      <Navbar />
      <Welcome />
      <Dock />
    </main>
  )
}


export default App