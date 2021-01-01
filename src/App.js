import React,  {useState, useEffect} from 'react'

import Apod from './components/Apod'
import Last30 from './components/Last30'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
    const [apod, setApod] = useState('')
    const [prevApod, setPrevApod] = useState([])
    const [loading, setLoading] = useState(false)
    const [isVisible, setVisible] = useState(false)

    
    
    // if component mounts, then uses the fetch api to get todays apod from NASA's apod api and stores the useful data as an object in state
    // gets last 31 apod's, pops the newest one and sets that to the current display, and stores an array of the last 30 in state
    useEffect(() => {
        setLoading(true)

        // parsing date into format that api wants
        let day = new Date()
        const today = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
        day.setDate(day.getDate()-29)
        const monthAgo = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`

        fetch(`https://api.nasa.gov/planetary/apod?api_key=bQ3oevegUAlJR9OyWgYsSCbvp3eI0JJxWEymvQQn&thumbs=true&start_date=${ monthAgo }&end_date=${ today }`)
            .then(response => response.json())
            .then(data => {
                // setting current apod
                const { date, explanation, media_type, title, url } = data[data.length-1]
                setApod({
                    date: date,
                    desc: explanation,
                    type: media_type,
                    title: title,
                    url: url,
                })
                // storing last 30 in state
                setPrevApod(data)
                setLoading(false)
            })

        
    }, [])

    const handleClick = (previewData) => {
        setApod(previewData)
    }

    const handleChange = () => {
        setVisible(prevState => !prevState)
        console.log(isVisible)
    }

    return (
        <div className='mainBody'>
            <Header />
            { loading ? 
                <div className='loaderDiv'>
                    <div className='loader'></div>
                </div> : 
                <>
                    <Apod data={ apod } />
                    <button className='button' onClick={ handleChange }>{ isVisible ? 'Hide' : 'View' } last 30 days</button>
                    
                    <Last30 prev={ prevApod } handleClick={ handleClick } visible={isVisible} />
                </>
            }
            <hr width='100%' color='#386480'/>
            <Footer />
            {isVisible && <a href='#top' className='button-a' >Back to top</a> }
        </div>
    )
}

export default App