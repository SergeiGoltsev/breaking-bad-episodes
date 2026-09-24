import {useState, useEffect, useRef} from "react";
import BreakingBadService from "../../services/BreakingBadService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import "./EpisodesList.css"

const breakingBadService = new BreakingBadService();

const EpisodesList = (props) => {

    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [itemsEnding, setItemsEnding] = useState(false);

    useEffect(() => {
        uploadEpisodes();
    }, [])

    const uploadEpisodes = () => {
        loadingEpisodes();
        breakingBadService
            .getAllEpisodes(offset)
            .then(loadedEpisodes)
            .catch(errorEpisodes)
    }

    const loadedEpisodes = (newEpisodes) => {
        let ended = false;
        if (newEpisodes.length < 8) {
            ended = true;
        }

        setEpisodes(episodes => [...episodes, ...newEpisodes]);
        setLoading(false);
        setOffset(offset => offset + 8);
        setNewItemLoading(false);
        setItemsEnding(ended);
    }

    const loadingEpisodes = () => {
        setNewItemLoading(true);
    }

    const errorEpisodes = () => {
        setError(true)
    }

    const myRef = useRef({});

    const setEpisodeItemRef = (elem, id) => {
        if (elem) {
            myRef.current[id] = elem;
        }
    }

    const episodeItemSelected = (id) => {
        Object.values(myRef.current).forEach(item => {
            item.classList.remove('episodes-list__item_active')
        })
        if (myRef.current[id]) {
            myRef.current[id].classList.add('episodes-list__item_active');
            myRef.current[id].focus();
        }
    }

    const renderItems = (arr) => {
        const items = arr.map(item => {
            return (
                <li className='episodes-list__item'
                    key={item.id}
                    tabIndex="0"
                    ref={(elem) => setEpisodeItemRef(elem, item.id)}
                    onClick={() => {
                        episodeItemSelected(item.id);
                        props.onEpisodeSelected(item.id);
                    }}
                >
                    <img className='episodes-list__item-img' src={item.image} alt={item.name}/>
                    <p className='episodes-list__item-name'>{item.name}</p>
                </li>
            )
        })
        return items;
    }

    const items = renderItems(episodes);
    const content = episodes ? items : null;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    return (
        <div className='episodes-list-block'>
            <ul className='episodes-list'>
                {errorMessage}
                {spinner}
                {content}
            </ul>
            <button className='episodes-list__button'
                    disabled={newItemLoading}
                    style={{"display": itemsEnding ? "none" : "block"}}
                    onClick={uploadEpisodes}
            >
                load more
            </button>
        </div>
    )
}

export default EpisodesList;