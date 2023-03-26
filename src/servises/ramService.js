export default class RamService {

  constructor() {
    this._apiBase = 'https://rickandmortyapi.com/api';
  }

  async getResourse(url){
      const res = await fetch(`${this._apiBase}${url}`);

      if (res.ok !== true) {
        throw new Error(`${res.status} Failed Fetch`)
      }

      return await res.json();
  };

  getCharacters(page) {
    return this.getResourse(`/character/?page=${page}`);
  }

  async getEpisode(url) {
    const res = await fetch(url)

    return await res.json();
  }

}