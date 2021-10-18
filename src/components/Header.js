import './Header.css';
import {useHistory} from 'react-router-dom';
import React, {useState} from 'react';

function SearchBar() {
    const history = useHistory();
    const [name, set_name] = useState('');

    function search_beer(event) {


        if (name && event.key === 'Enter' || event.target.nodeName === 'BUTTON') {
            history.push(`/?name=${encodeURIComponent(name)}`)
        }
    }

    return (
        <div className='Header'>
            <input
                className='Header_search_bar'
                type='search'
                placeholder='Search beer'
                value={name}
                onChange={event => {set_name(event.target.value)}}
                onKeyUp={search_beer}
            />
            <button
                className='Header_search_button'
                onClick={search_beer}
            >Search</button>
        </div>
    );
}

export default SearchBar;