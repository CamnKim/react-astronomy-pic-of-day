import React from 'react'

function Apod(props) {
    const { date, desc, type, title, url } = props.data

    return (
        <div className='apod'>
            <div className='apod-header'>
                <h1>{ title }</h1>
                <p>{ date }</p>
            </div>
            { type === 'image' ? 
                <img className='apod-pic' src={ url } alt='Astronomy Pic of the Day' /> : 
                <a href={ url } >
                    <iframe className='apod-pic'
                        height='800'
                        src={ url } 
                        frameborder="0" 
                        title={ title }
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </a> 
            }
            
            <p className='desc'>{ desc }</p>
        </div>
    )
}

export default Apod