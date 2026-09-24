import { useState, useEffect } from "react";
import BreakingBadService from "../../services/BreakingBadService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import "./randomEpisode.css";

const breakingBadService = new BreakingBadService();

const RandomEpisode = () => {
    const [episode, setEpisode] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        uploadEpisode();
    }, [trigger]);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTrigger(prev => prev + 1);
        }, 20000);

        return () => clearInterval(timerId);
    }, [trigger]);

    const uploadEpisode = () => {
        setLoading(true);
        setError(false);
        breakingBadService
            .getRandomEpisode()
            .then(loadedEpisode)
            .catch(errorEpisode);
    }

    const loadedEpisode = (episode) => {
        setEpisode(episode);
        setLoading(false);
    }

    const errorEpisode = () => {
        setLoading(false);
        setError(true);
    }

     const onTryAgain = () => {
        setTrigger(prev => prev + 1);
    }

    const content = (!loading && !error && episode.name) ? <View episode={episode}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className='random-episode-block'>
            <div className="random-episode">
                {spinner}
                {errorMessage}
                {content}
            </div>
            <button className="random-episode__button" onClick={onTryAgain}>
                Try again
            </button>
        </div>
    );
}

const View = ({episode}) => {
    const {image, name, season, number, date, time, homepage, summary} = episode;
    return (
        <div className='random-episode-content'>
            <div className='random-episode__top'>
                <img className='random-episode__img' src={image} alt={name}/>
                <div className='random-episode__text-block'>
                    <p className='random-episode__name'>{name}</p>
                    <p className='random-episode__text'>Season: {season}</p>
                    <p className='random-episode__text'>Episode № {number}</p>
                    <p className='random-episode__text'>Release: {date}</p>
                    <p className='random-episode__text'>Duration: {time} m</p>
                    <a className='random-episode__link' href={homepage}>Home Page</a>
                </div>
            </div>
            <p className='random-episode__summary'>{summary}</p>
        </div>
    );
}

export default RandomEpisode;