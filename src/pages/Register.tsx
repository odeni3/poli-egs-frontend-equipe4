import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/backgroundlogin.jpg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificando se as senhas coincidem antes de enviar a requisição
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(poli\.br|ecomp\.poli\.br|upe\.br)$/;
    if (!emailRegex.test(email)) {
    alert("Apenas e-mails dos domínios @poli.br, @ecomp.poli.br ou @upe.br são permitidos.");
    return;
  }
    try {
      const response = await fetch(`${import.meta.env.VITE_url_backend}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          is_admin: false, // Definindo automaticamente como false
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registro bem-sucedido:', data);
        alert('Registro realizado com sucesso!');
        navigate('/logintest');
      } else {
        setError("O endereço de e-mail já existe ou a senha possui menos de 6 caracteres.");
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      setError('Erro de rede. Verifique sua conexão.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-blue-500 text-white py-1 px-4 rounded shadow hover:bg-blue-700 transition duration-300 text-sm"
      >
        Voltar
      </button>

      <div
        className="p-14 rounded-lg shadow-lg w-96"
        style={{
          backgroundColor: 'rgba(187, 170, 170, 0.205)',
          backdropFilter: 'blur(15px)',
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Registrar</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4 relative">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nome de usuário"
              className="w-full py-3 px-4 rounded-xl bg-white bg-opacity-10 text-white border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 hover:border hover:border-white/30"
              required
            />
          </div>

          <div className="mb-4 relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full py-3 px-4 rounded-xl bg-white bg-opacity-10 text-white border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 hover:border hover:border-white/30"
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-6 relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full py-3 px-4 rounded-xl bg-white bg-opacity-10 text-white border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 hover:border hover:border-white/30"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="mb-6 relative">
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar Senha"
              className="w-full py-3 px-4 rounded-xl bg-white bg-opacity-10 text-white border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 hover:border hover:border-white/30"
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Registrar
          </button>

          {error && <p className="mt-2 text-center text-red-600">{error}</p>}

          <div className="mt-4 text-center">
            <p className="text-white">
              Já tem uma conta?{' '}
              <a href="logintest" className="text-blue-300 underline">
                Faça login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
