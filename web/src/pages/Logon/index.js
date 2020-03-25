import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Logon() {
  const history = useHistory();
  const [id, setId] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const { data } = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', data.name);

      history.push('profile');
    } catch(e) {
      alert('Falha no login. Tente novamente!');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={({ target }) => setId(target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link to="/register" className="register-back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="heroes" />
    </div>
  );
}