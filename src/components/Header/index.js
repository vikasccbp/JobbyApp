import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutPage = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="headerMainDiv">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="img2"
          alt="website logo"
        />
      </Link>
      <ul className="div1">
        <Link to="/" className="link">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="link">
          <li>Jobs</li>
        </Link>
        <li> </li>
      </ul>
      <button type="button" className="button1" onClick={logoutPage}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
