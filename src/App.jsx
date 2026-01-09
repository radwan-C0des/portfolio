import React from 'react'
import { Navbar,Welcome,DeformationImage,Dock,ShaderBackground} from '#components'

function App() {
  return (
    <main>
      <ShaderBackground />
      {/* <DeformationImage imageSrc="/images/wallpaper.jpg" /> */}
      <Navbar />
      <Welcome />
      <Dock />
    </main>
  )
}


export default App