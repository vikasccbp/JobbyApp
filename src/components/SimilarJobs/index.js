import {BsStarFill} from 'react-icons/bs'
import {FaShoppingBag} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {each} = props
  const {
    companyLogoUrl,
    jobDescription,
    title,
    rating,
    location,
    employmentType,
  } = each
  return (
    <div className="jobCardDiv2">
      <div className="div5">
        <img
          src={companyLogoUrl}
          className="img12"
          alt="similar job company logo"
        />
        <div className="div6">
          <h1 className="h5">{title}</h1>
          <div className="div7">
            <BsStarFill className="sort-by-icon" />
            <p className="p2">{rating}</p>
          </div>
        </div>
      </div>
      <hr />
      <h1 className="p3">Description</h1>
      <p>{jobDescription}</p>
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
      </div>
    </div>
  )
}
export default JobCard
