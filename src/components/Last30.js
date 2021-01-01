import React from 'react'

function Last30({ prev, handleClick, visible }) {
    // takes an element and pulls out the data needed to make a preview of it and a new apod
    // returns div containing the preview
    function formatArray(element) {
        const { date, explanation, media_type, title, url, thumbnail_url } = element
        const apod = {
            date: date,
            desc: explanation,
            type: media_type,
            title: title,
            url: url
        }
        return (
            <div className='preview'>
                <img src={ media_type === 'image' ? url : thumbnail_url } alt='Preview' onClick={ event => handleClick(apod) } />
                <p>{ date }</p>
            </div>
        )
    }

    const previews = prev.map(element => formatArray(element))

    
    return(
        <div className='lastMonth' style={visible ? {display: 'grid'} : {display: 'none'}}>
            { previews }
        </div>
    )
}

export default Last30