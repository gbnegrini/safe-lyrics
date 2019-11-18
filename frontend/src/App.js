import React, {useState} from 'react';
import './sketchy.css';
import './App.css';
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

        if (response.data.lyrics != null){
            let lyrics = response.data.lyrics.split('\n').map((item, i) => <p key={i}>{item}</p>);
            setLyrics(lyrics);

            if(response.data.safe){
                setSafe(
                <div className="alert alert-dismissible alert-success">
                    These lyrics are PROBABLY free of offensive language
                </div>);
            }else{
                setSafe(
                <div className="alert alert-dismissible alert-danger">
                    These lyrics PROBABLY contain offensive language
                </div>);
            }
        }else{
            setLyrics('');
            setSafe(
            <div className="alert alert-dismissible alert-info">
                <p>Artist or song does not exist or the database does not have the lyrics</p>
                <p>Please check if your search parameters are correct</p>
            </div>);
        }

    }
  return (
    <React.Fragment>
    <div className='jumbo'>
        <div className="jumbotron">
          <h1 className="display-3">Safe Lyrics</h1>
          <p className="lead">A simple tool to check lyrics for obscene language</p>
          <hr className="my-4"></hr>

              <div className='wrap'>
                  <div className='row'>

                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                      <div className='form-col'>
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
                                <button type="submit" className="btn btn-primary btn-lg">Search</button>
                              </fieldset>
                            </form>
                      </div>
                    </div>

                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                      <h2>Lyrics</h2>
                      <div>{safe}</div>
                      <p>{lyrics}</p>
                    </div>

                  </div>
            </div>
        </div>
    </div>
    <div className='foot'>
        <div>Icons made by <a href="https://www.flaticon.com/br/autores/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/br/" title="Flaticon">www.flaticon.com</a></div>
        <div>CSS theme Sketchy by <a href='https://github.com/thomaspark/bootswatch' title='Thomas Park'>Thomas Park</a></div>
    </div>
  </React.Fragment>
  );
}

export default App;
