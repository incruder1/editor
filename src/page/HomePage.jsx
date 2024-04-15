import './HomePage.css'
import Box from '../components/Edit/Box'
import Display from '../components/Canva/Display'

function HomePage() {

    return (
        <div className='flex flex-col sm:flex-row w-screen'>

            <Display />
            <Box />

        </div>
    )
}

export default HomePage;