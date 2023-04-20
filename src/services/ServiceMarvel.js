class ServiceMarvel {
    _baseApi = "https://gateway.marvel.com:443";
    _apiKey = "apikey=435e3565b3cf668b55ae881192369602";

    getResourse = async (url) => {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status);
        }
        return await response.json();
    }

    getComics = (id) => {
        return this.getResourse(`${this._baseApi}/v1/public/comics/${id}?${this._apiKey}`)
    }

    getCharacterFromName = (name) => {
        return this.getResourse(`${this._baseApi}/v1/public/characters?name=${name}&${this._apiKey}`)
    }

    getAllComics = (offset) => {
        return this.getResourse(`${this._baseApi}/v1/public/comics?limit=8&offset=${offset}&${this._apiKey}`)
    }

    getRequestAllCharacter = (offset) => {
        return this.getResourse(`${this._baseApi}/v1/public/characters?limit=9&offset=${offset}&${this._apiKey}`);
    }

    getRequestCharacter = async (id) => { 
        return await this.getResourse(`${this._baseApi}/v1/public/characters/${id}?${this._apiKey}`)
        .then(res => this.transform(res));
    }

    transform = (res) => {
        return {
            thumbnail: `${res.data.results[0].thumbnail.path}.${res.data.results[0].thumbnail.extension}`,
            name: res.data.results[0].name,
            description: res.data.results[0].description,
            id: res.data.results[0].id,
            Wiki: res.data.results[0].urls[1].url,
            homepage: res.data.results[0].urls[0].url,
            comics: res.data.results[0].comics.items
        }
        
    }
}

export default ServiceMarvel;