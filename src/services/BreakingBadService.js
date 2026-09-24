import logo from '../components/app/breaking-bad-logo.webp'

class BreakingBadService {
    _baseAPI = 'https://api.tvmaze.com/shows/169/episodes';
    _baseOffset = 0;

    uploadResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return res.json();
    }

    getAllEpisodes = async (offset = this._baseOffset) => {
        const res = await this.uploadResource(this._baseAPI);
        return res.slice(offset, offset + 8).map(this.transformEpisode);
    }

   // Получение конкретной серии по ID для EpisodeInfo при клике на серию
    getEpisode = async (id) => {
        const res = await this.uploadResource(`https://api.tvmaze.com/episodes/${id}`);
        return this.transformEpisode(res);
    }

    // Получение случайной серии для RandomEpisode
    getRandomEpisode = async () => {
        const allEpisodes = await this.uploadResource(this._baseAPI);
        const randomIndex = Math.floor(Math.random() * allEpisodes.length);
        return this.transformEpisode(allEpisodes[randomIndex]);
    }

    transformEpisode = (episode) => {
        return {
            id: episode.id,
            name: episode.name,
            summary: episode.summary ? episode.summary.replace(/<[^>]*>/g, "") : "Episode description missing",
            image: episode.image?.original || logo,
            homepage: episode.url,
            season: episode.season,
            number: episode.number,
            date: episode.airdate,
            time: episode.runtime,
        }
    }
}

export default BreakingBadService