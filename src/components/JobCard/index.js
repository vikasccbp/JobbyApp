import {Link} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'
import {FaShoppingBag} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {each} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = each
  return (
    <Link to={`jobs/${id}`} className="link">
      <div className="jobCardDiv">
        <div className="div5">
          <img src={companyLogoUrl} className="img11" alt="company logo" />
          <div className="div6">
            <h1 className="h5">{title}</h1>
            <div className="div7">
              <BsStarFill className="sort-by-icon" />
              <p className="p2">{rating}</p>
            </div>
          </div>
        </div>
        <div className="div8">
          <div className="div10">
            <div className="div9">
              <MdLocationOn className="sort-by-icon1" />
              <p>{location}</p>
            </div>
            <div className="div9">
              <FaShoppingBag className="sort-by-icon1" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="p3">Description</h1>
        <p>{jobDescription}</p>
      </div>
    </Link>
  )
}
export default JobCard
