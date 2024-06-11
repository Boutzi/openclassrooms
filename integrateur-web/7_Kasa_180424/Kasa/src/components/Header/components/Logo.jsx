import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className="logo">
      <Link to={`/`}>
      <img className="logo__img" src="/src/assets/logos/main-logo.svg" alt="Logo du site Kasa" />
      </Link>
    </div>
  )
}

export default Logo
