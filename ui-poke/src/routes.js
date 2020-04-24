import Home from './components/Home'
import Region from './components/Region'
import Pokemon from './components/Pokemon'
import About from './components/About'

export default [

    {path: '/', component: Home},
    
    {path: '/region', component: Region},

    {path: '/pokemon/:name', component: Pokemon},

    {path: '/about/', component: About}
]