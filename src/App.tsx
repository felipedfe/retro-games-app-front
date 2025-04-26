import { useState } from 'react';
import { GlobalStyle } from './styles/globalStyles';
import { fetchGames, fetchPlatforms, fetchRandomGame } from './services/api';

const App: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);
  const [randomGame, setRandomGame] = useState<any>(null);
  const [platforms, setPlatforms] = useState([])
  const [errorMessage, setErrorMessage] = useState("");

  const getRandomGame = async () => {
    try {
      const response = await fetchRandomGame();
      setRandomGame(response);
      console.log(response)
      setErrorMessage("")
    } catch (error: any) {
      const message = error.response?.data || error.message;
      console.error(message);
      setErrorMessage(message);
    }
  };

  const getGames = async () => {
    try {
      const response = await fetchGames();
      setGames(response);
      console.log(response)
      setErrorMessage("")
    } catch (error: any) {
      const message = error.response?.data || error.message;
      console.error(message);
      setErrorMessage(message);
    }
  };

  const getPlatforms = async () => {
    try {
      // const response = await fetchGames();
      const response = await fetchPlatforms();
      setPlatforms(response);
      // console.log(response)
      const filteredResponse = response.filter((item: any) =>
        item.name.toLowerCase().includes('turbo')
      );
      console.log(filteredResponse)
      setErrorMessage("")
    } catch (error: any) {
      const message = error.response?.data || error.message;
      console.error(message);
      setErrorMessage(message);
    }
  };

  return (
    <>
      <GlobalStyle />
      <section>
        <p>Retro games app</p>

        <button onClick={getRandomGame}>
          Sortear Jogo
        </button>

        <hr></hr>

        <button onClick={getPlatforms}>
          Mostrar Plataformas
        </button>

        {errorMessage && (
          <p>
            {errorMessage}
          </p>
        )}

        <div>
          {/* {games.map((game, index) => (
            <div key={index}>
              <h3>{game.name} {game.first_release_date && `(${new Date(game.first_release_date * 1000).getFullYear()})`}</h3>
              {game.cover && (
                <img
                  src={`https:${game.cover.url.replace('t_thumb', 't_cover_big')}`}
                  alt={game.name}
                  width="264"
                />
              )}
            </div>
          ))} */}

          {randomGame && (
            <div>
              <h3>
                {randomGame.name}
                {randomGame.first_release_date && ` (${new Date(randomGame.first_release_date * 1000).getFullYear()})`}
              </h3>
              {randomGame.cover && (
                <img
                  src={`https:${randomGame.cover.url.replace('t_thumb', 't_cover_big')}`}
                  alt={randomGame.name}
                  width="264"
                />
              )}
              {randomGame.summary && <p>{randomGame.summary}</p>}
              {randomGame.platforms &&
                <ul style={{ margin: '1rem' }}> Plataformas:
                  {randomGame.platforms.map((item: any) => <li key={item.id}>{item.name}</li>)}
                </ul>
              }
              {randomGame.themes &&
                <ul style={{ margin: '1rem' }}> Temas:
                  {randomGame.themes.map((item: any) => <li key={item.id}>{item.name}</li>)}
                </ul>
              }
              {randomGame.genres &&
                <ul style={{ margin: '1rem' }}> Gêneros:
                  {randomGame.genres.map((item: any) => <li key={item.id}>{item.name}</li>)}
                </ul>
              }
              {randomGame.screenshots && (
                <div style={{ margin: '1rem' }}>
                  {randomGame.screenshots.map((item: any) => (
                    <img
                      key={item.id}
                      src={`https:${item.url.replace('t_thumb', 't_screenshot_big')}`}
                      alt={randomGame.name}
                      width="300"
                      style={{ marginRight: '8px', marginBottom: '8px' }}
                    />
                  ))}
                </div>
              )}
              {randomGame.videos && randomGame.videos.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <h4>Vídeo:</h4>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${randomGame.videos[0].video_id}`}
                    title="Gameplay Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default App;
