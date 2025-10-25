const React = window.React;
const ReactDOM = window.ReactDOM;

function Home({ navigate }) {
  return React.createElement('div', { className: 'container' },
    React.createElement('h1', null, 'Bienvenue sur LearnToCode'),
    React.createElement('p', null, 'Apprends JS, Python, HTML et CSS.'),
    React.createElement('a', { className: 'button', href: '#login', onClick: e => { e.preventDefault(); navigate('login'); } }, 'Connexion'),
    React.createElement('a', { className: 'button', href: '#register', onClick: e => { e.preventDefault(); navigate('register'); } }, 'Inscription')
  );
}

function Login({ navigate }) {
  return React.createElement('div', { className: 'container' },
    React.createElement('h2', null, 'Connexion'),
    React.createElement('p', null, 'Formulaire de connexion ici.'),
    React.createElement('a', { className: 'button', href: '#home', onClick: e => { e.preventDefault(); navigate('home'); } }, 'Accueil')
  );
}

function Register({ navigate }) {
  return React.createElement('div', { className: 'container' },
    React.createElement('h2', null, 'Inscription'),
    React.createElement('p', null, 'Formulaire d’inscription ici.'),
    React.createElement('a', { className: 'button', href: '#home', onClick: e => { e.preventDefault(); navigate('home'); } }, 'Accueil')
  );
}

function Dashboard({ navigate }) {
  return React.createElement('div', { className: 'container' },
    React.createElement('h2', null, 'Dashboard'),
    React.createElement('p', null, 'Ici tu peux voir tes points et tes cours.'),
    React.createElement('a', { className: 'button', href: '#home', onClick: e => { e.preventDefault(); navigate('home'); } }, 'Accueil')
  );
}

function App() {
  const [page, setPage] = React.useState('home');
  const navigate = (p) => setPage(p);

  switch(page) {
    case 'home': return React.createElement(Home, { navigate });
    case 'login': return React.createElement(Login, { navigate });
    case 'register': return React.createElement(Register, { navigate });
    case 'dashboard': return React.createElement(Dashboard, { navigate });
    default: return React.createElement(Home, { navigate });
  }
}

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);
