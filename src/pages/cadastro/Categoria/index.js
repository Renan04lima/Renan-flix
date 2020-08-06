import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

import { CategoryText } from './styles';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const URL = window.location.href.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://binarioflix.herokuapp.com/categorias';
    fetch(URL)
      .then(async (respostaDoServer) => {
        if (respostaDoServer.ok) {
          const resposta = await respostaDoServer.json();
          setCategorias(resposta);
          return;
        }
        throw new Error('Não foi possível pegar os dados');
      });
  }, []);

  return (
    <PageDefault>

      <h1>
        Cadastro de Categoria:
          {values.nome}
      </h1>

      <div id="main">
        <form onSubmit={function handleSubmit(infosDoEvento) {
          infosDoEvento.preventDefault();
          setCategorias([
            ...categorias,
            values,
          ]);

          categoriasRepository.create({
            titulo: values.nome,
            cor: values.cor,
          })
            .then(() => {
              alert('Categoria cadastrado com sucesso!');
            });

          clearForm();
        }}
        >

          <FormField
            label="Nome da Categoria"
            type="text"
            name="nome"
            value={values.nome}
            onChange={handleChange}
          />

          <FormField
            label="Descrição"
            type="textarea"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
          />

          <FormField
            label="Cor"
            type="color"
            name="cor"
            value={values.cor}
            onChange={handleChange}
          />

          <Button>
            Cadastrar
          </Button>
        </form>

        {categorias.length === 0 && (
          <div>
            Loading...
          </div>
        )}

        <ul style={{ display: 'flex', flexDirection: 'column' }}>
          {categorias.map((categoria) => (
            <>
              <CategoryText style={{ backgroundColor: categoria.cor }} key={`${categoria.titulo}`}>
                {categoria.titulo}
              </CategoryText>
            </>
          ))}
        </ul>

        <Link to="/">
          Ir para home
        </Link>
      </div>
    </PageDefault>
  );
}

export default CadastroCategoria;
