import './Beer.css';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function Beer() {
    const name = decodeURIComponent(useParams().name);
    const [beer, set_beer] = useState(() => {
        const beers = JSON.parse(sessionStorage.getItem('beers'));

        if (beers) {
            return beers.find(beer => beer.name === name);
        }
    });

    useEffect(() => {
        console.log(beer);
        if (!beer) {
            fetch(`https://api.punkapi.com/v2/beers?beer_name=${name}`)
            .then(response => response.json())
            .then(data => {set_beer(data[0])});   
        }

    }, [beer]);


    return (
        <div className='Beer'>
            {!!beer && (
                <div className='Beer_content'>
                    <div className='Beer_image_parent'>
                        <img
                            className='Beer_image'
                            src={beer.image_url}
                            alt={beer.name}
                        />
                    </div>
                    <div className='Beer_info'>
                        <h2 className='Beer_name'>{beer.name}</h2>
                        
                        <p>{beer.tagline}</p>
                        <p>{beer.abv}% ABV.</p>
                        <p>First brewed in {beer.first_brewed}.</p>
                        <p className='Beer_heading'>Food pairing</p>

                        <ul className='Beer_food_list'>
                            {beer.food_pairing.map((food, i) => (
                                <li
                                    className='Beer_food_item'
                                    key={i}
                                >{`${i + 1}. ${food}`}</li>
                            ))}
                        </ul>

                        <p className='Beer_heading'>Description</p>
                        <p className='Beer_description'>{beer.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Beer;