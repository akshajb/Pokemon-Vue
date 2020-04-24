import Home from './components/Home'
import Region from './components/Region'
import Pokemon from './components/Pokemon'

export default [

    {path: '/', component: Home},
    
    {path: '/region', component: Region},

    {path: '/pokemon/:name', component: Pokemon}

]