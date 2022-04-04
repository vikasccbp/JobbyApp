import './index.css'

const Profile = props => {
  const {profile} = props
  const {name, profileImageUrl, shortBio} = profile
  return (
    <div className="profileCard">
      <img src={profileImageUrl} alt="profile" className="img4" />
      <h1 className="h3">{name}</h1>
      <p>{shortBio}</p>
    </div>
  )
}

export default Profile
