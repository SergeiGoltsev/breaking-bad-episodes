import {useState} from "react";
import RandomEpisode from "../randomEpisode/RandomEpisode";
import EpisodesList from "../episodesList/EpisodesList";
import EpisodeInfo from "../EpisideInfo/EpisodeInfo"
import logo from './breaking-bad-logo.webp'

import './app.css'

const App = () => {

    const [selectedEpisode, setSelectedEpisode] = useState(null);

    const onEpisodeSelected = (id) => {
        setSelectedEpisode(id);
    }

    return (
        <div className="app">
            <div className='page'>
                <div className='page__title-block'>
                    <h1 className='page__title'>Breaking Bad episodes</h1>
                    <img className='page__title-img' alt='Breaking Bad logo' src={logo}/>
                </div>
                <RandomEpisode/>
                <div className='episodes-list__content'>
                    <EpisodesList onEpisodeSelected={onEpisodeSelected}/>
                    <EpisodeInfo episodeId={selectedEpisode}/>
                </div>
            </div>
        </div>
    )
}

export default App;