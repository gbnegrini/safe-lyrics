import React, {useState} from 'react';
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import './App.css';
import Nav from './components/Nav.js'
import api from './services/api'

function App() {
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [safe, setSafe] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        const response = await api.get('/lyrics', {
            params:{
                artist: artist,
                song: song
            }
        });

        let lyrics = response.data.lyrics.split('\n').map((item, i) => <p key={i}>{item}</p>);
        setLyrics(lyrics);

        if(response.data.safe){
            setSafe(
            <div className="alert alert-dismissible alert-success">
                These lyrics are <strong>probably</strong> free of offensive language
            </div>);
        }else{
            setSafe(
            <div className="alert alert-dismissible alert-danger">
                These lyrics <strong>probably</strong> contain offensive language
            </div>);
        }
    }
  return (
    <React.Fragment>
    <div>
        <Nav brand='Safe Lyrics' homeLink='#' aboutLink='#'/>
    </div>
    <div className='wrap'>
        <div className='row'>
          <div className='col'>
            <div>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                      <legend>Search</legend>
                      <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Artist"
                          id="artist"
                          value={artist}
                          onChange={event => setArtist(event.target.value)}>
                      </input>
                      <div className="form-group">
                      </div>
                      <div className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Song"
                            id="song"
                            value={song}
                            onChange={event => setSong(event.target.value)}>
                        </input>
                      </div>
                      <button type="submit" className="btn btn-primary">Search</button>
                    </fieldset>
                  </form>
            </div>
          </div>
          <div className='col'>
            <div className='lyr'>
              <h2>Lyrics</h2>
              <div>{safe}</div>
              <p>{lyrics}</p>
            </div>
          </div>
        </div>
  </div>
  </React.Fragment>
  );
}

export default App;
