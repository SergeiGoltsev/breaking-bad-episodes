import {useState, useEffect, useRef} from "react";
import BreakingBadService from "../../services/BreakingBadService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import "./EpisodeInfo.css"

const breakingBadService = new BreakingBadService();

const EpisodeInfo = (props) => {
    const [episode, setEpisode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        updateEpisode();
    }, [props.episodeId]);

    const updateEpisode = () => {
        const {episodeId} = props;
        if (!episodeId) {
            return
        }
        onEpisodeLoading();
        breakingBadService
            .getEpisode(episodeId)
            .then(loadedEpisode)
            .catch(errorEpisode)
    }

    const loadedEpisode = (episode) => {
        setEpisode(episode);
        setLoading(false);
    }

    const onEpisodeLoading = () => {
        setLoading(true);
        setError(false);
    }

    const errorEpisode = () => {
        setError(true);
    }

    const content = (!loading && !error && episode) ? <View episode={episode}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const skeleton = (loading || error || episode) ? null :
        <div className='episodes-info__text'>Select an episode</div>
    return (
        <div className='episodes-info'>
            {spinner}
            {errorMessage}
            {content}
            {skeleton}
        </div>
    )
}

const View = ({episode}) => {
    const {image, name, season, number, date, summary} = episode;
    return (
        <>
            <img className='episodes-info__img' src={image} alt={name}/>
            <p className='episodes-info__name'>{name}</p>
            <p className='episodes-info__text'>season {season} - episode {number}</p>
            <p className='episodes-info__text'>{date}</p>
            <p className='episodes-info__text'>{summary}</p>
        </>
    )
}

export default EpisodeInfo;