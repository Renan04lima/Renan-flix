import config from '../config';

const URL_CATEGORIES = `${config.URL_BACKEND_TOP}/categorias`;

function create(objetoDoVideo) {
  return fetch(`${URL_CATEGORIES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objetoDoVideo),
  })
    .then(async (respostaDoServer) => {
      if (respostaDoServer.ok) {
        const resposta = await respostaDoServer.json();

        return resposta;
      }
      throw new Error('Não foi possível cadastrar os dados :(');
    });
}

function getAll() {
  return fetch(`${URL_CATEGORIES}`)
    .then(async (respostaDoServer) => {
      if (respostaDoServer.ok) {
        const resposta = await respostaDoServer.json();

        return resposta;
      }
      throw new Error('Não foi possível pegar os dados :(');
    });
}

function getAllWithVideos() {
  return fetch(`${URL_CATEGORIES}?_embed=videos`)
    .then(async (respostaDoServer) => {
      if (respostaDoServer.ok) {
        const resposta = await respostaDoServer.json();

        return resposta;
      }
      throw new Error('Não foi possível pegar os dados :(');
    });
}

export default {
  create,
  getAll,
  getAllWithVideos,
};
