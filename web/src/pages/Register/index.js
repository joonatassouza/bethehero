import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const { data } = await api.post('ongs', {
        name,
        email,
        whatsapp,
        city,
        uf
      });
      
      alert(`Seu ID de acesso: ${data.id}`);

      history.push('/');
    } catch (e) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.
          </p>

          
          <Link to="/" className="register-back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Já tenho um ID
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            value={name}
            onChange={({target}) => setName(target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={({target}) => setEmail(target.value)}
          />
          <input
            type="text"
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={({target}) => setWhatsapp(target.value)}
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={({target}) => setCity(target.value)}
            />
            <input 
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={({target}) => setUf(target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
