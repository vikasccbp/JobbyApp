import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Profile from '../Profile'
import Header from '../Header'
import EmploymentTypesList from '../employmentTypesList'
import JobCard from '../JobCard'
import SalaryRangesList from '../salaryRangesList'

import './index.css'

const employmentTypesList1 = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList1 = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobMainComponent extends Component {
  state = {
    profile: {},
    jobs: [],
    searchInput: '',
    salary: [],
    employee: [],
    isApi: false,
    profileApi: false,
    isLoading: false,
  }

  componentDidMount() {
    this.makeProfileApiCall()
    this.makeJobsApiCall()
  }

  formateJobsData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  makeJobsApiCall = async () => {
    this.setState({isLoading: true})
    const {salary, employee, searchInput} = this.state
    const salary1 = salary.join()
    const employee1 = employee.join()
    const token1 = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employee1}&minimum_package=${salary1}&search=${searchInput}`
    const option = {
      headers: {
        Authorization: `Bearer ${token1}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok) {
      const data = await response.json()
      const mainJobsData = data.jobs.map(each => this.formateJobsData(each))
      this.setState({jobs: mainJobsData, isLoading: false})
    } else {
      this.setState({isApi: true})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  profileDataConverter = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  apiFalse = () => (
    <div className="apiFail" testid="loader">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="img20"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.navigateToApi}>
        Retry
      </button>
    </div>
  )

  salaryFunction = id => {
    this.setState(
      prevState => ({
        salary: [...prevState.salary, id],
      }),
      this.makeJobsApiCall,
    )
  }

  employmentFunction = id => {
    this.setState(
      prevState => ({
        employee: [...prevState.employee, id],
      }),
      this.makeJobsApiCall,
    )
  }

  profileApiCall = () => {
    this.makeProfileApiCall()
  }

  profileFun = () => (
    <div>
      <button type="button" onClick={this.profileApiCall}>
        Retry
      </button>
    </div>
  )

  showingLefUi = () => {
    const {profile, profileApi} = this.state
    return (
      <>
        <div className="subDiv1">
          {profileApi ? (
            this.profileFun()
          ) : (
            <Profile profile={profile} key={profile.id} />
          )}
          <hr className="hr1" />
          <div className="employeeDiv1">
            <h1 className="h5">Type Of Employment</h1>
            <ul className="ul">
              {employmentTypesList1.map(each => (
                <EmploymentTypesList
                  each={each}
                  key={each.employmentTypeId}
                  employmentFunction={this.employmentFunction}
                />
              ))}
            </ul>
            <hr className="hr1" />
          </div>
          <div className="employeeDiv1">
            <h1 className="h5">Salary Range</h1>
            <ul className="ul">
              {salaryRangesList1.map(each => (
                <SalaryRangesList
                  key={each.salaryRangeId}
                  each={each}
                  salaryFunction={this.salaryFunction}
                />
              ))}
            </ul>
            <hr className="hr1" />
          </div>
        </div>
      </>
    )
  }

  searchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  makeProfileApiCall = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const option = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok) {
      const data = await response.json()
      const profileData = this.profileDataConverter(data.profile_details)
      this.setState({profile: profileData})
    } else {
      this.setState({profileApi: true})
    }
  }

  failureView = () => (
    <div className="apiFail">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="img20"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.navigateToApi}>
        Retry
      </button>
    </div>
  )

  showingRightUi = () => {
    const {jobs} = this.state
    if (jobs.length === 0) {
      return (
        <div className="filterDiv">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            className="img6"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    return (
      <ul>
        {jobs.map(each => (
          <JobCard each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  submitForm = event => {
    const {searchInput} = this.state
    event.preventDefault()
    this.setState(
      {
        searchInput,
      },
      this.makeJobsApiCall,
    )
  }

  rendering = () => {
    const {isLoading} = this.state
    if (isLoading) {
      return this.renderLoader()
    }
    return this.showingRightUi()
  }

  render() {
    const {isApi} = this.state
    return (
      <>
        <Header />
        <div className="jobDiv">
          {this.showingLefUi()}
          <div className="wrap">
            <form onSubmit={this.submitForm}>
              <input
                type="search"
                className="input1"
                onChange={this.searchInput}
              />
              <button
                type="submit"
                className="sort-by-icon2"
                testid="searchButton"
              >
                <BsSearch className="sort-by-icon1" />
              </button>
            </form>
            {isApi ? this.apiFalse() : this.rendering()}
          </div>
        </div>
      </>
    )
  }
}
export default JobMainComponent
