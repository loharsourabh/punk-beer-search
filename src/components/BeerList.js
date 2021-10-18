import './BeerList.css';
import {useHistory, useParams, Link} from 'react-router-dom';
import React, {useRef, useState, useEffect} from 'react';

function BeerList() {
    const history = useHistory();
    const {search} = history.location;
    const query = new URLSearchParams(search);
    const page = Number(useParams().page) || 1;
    const [beers, set_beers] = useState([]);

    async function get_beers(params) {
        let i = 0;
        let url = `https://api.punkapi.com/v2/beers`; 
        
        for (let key in params) {
            const value = params[key];

            if (value) {
                url += (!i ? '?' : '&') + `${key}=${encodeURIComponent(value)}`;
                i++;
            }
        }

        const response = await fetch(url);

        return response.json();
    }

    useEffect(() => {
        const params = {
            per_page: 15,
            page: page,
            beer_name: query.get('name'),
        }

        get_beers(params).then(data => {
            sessionStorage.setItem('beers', JSON.stringify(data))
            set_beers(data);
        });

    }, [page, search]);

    return (
        <div className='BeerList'>
            {beers.length > 0 ? (
                <div className='BeerList_beers'>
                    {beers.map(beer => (
                        <div
                            className='BeerList_beer'
                            key={beer.id}
                        >   
                            <Link to={`/beer/${encodeURIComponent(beer.name)}`}>
                                <img
                                    className='BeerList_image'
                                    src={beer.image_url}
                                    alt={beer.name}
                                />
                                <div className='BeerList_info'>
                                    <h2 className='BeerList_name'>{beer.name}</h2>
                                    <p className='BeerList_tagline'>{beer.tagline}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : !(page === 1 && !search) && (
                <p className='BeerList_lastpage'>
                    You have reached the end of the list or your search query didn't match any beer.
                </p>
            )}
            <div className='BeerList_paging'>
                {page > 1 && (
                    <button
                        className='BeerList_button'
                        onClick={() => {history.push(`/page/${page - 1}${search}`)}}
                    >Previous</button>
                )}

                {beers.length > 0 && (
                    <button
                        className='BeerList_button'
                        onClick={() => {history.push(`/page/${page + 1}${search}`)}}
                    >Next</button>
                )}
            </div>
        </div>
    );
}

export default BeerList;