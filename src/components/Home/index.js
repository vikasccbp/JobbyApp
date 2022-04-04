import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

class Home extends Component {
  findJobButton = () => {
    const {history} = this.props
    return history.replace('/jobs')
  }

  render() {
    return (
      <>
        <ul>
          <Header />
        </ul>
        <div className="homeDiv">
          <div className="div2">
            <h1 className="h1">Find The Job That Fits Your Life</h1>
            <p className="p1">
              Millions of people are searching for jobs and employers. ...
              Searching for jobs and applying for jobs on Naukri.com is free for
              all job seekers. After applying, Naukri sends all applications to
              the employers.
            </p>
            <Link to="/jobs">
              <button
                type="button"
                className="button1"
                onClick={this.findJobButton}
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}
export default Home
