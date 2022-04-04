import './index.css'

const Skill = props => {
  const {each} = props
  const {name, imageUrl1} = each
  return (
    <li className="skillDiv">
      <img src={imageUrl1} className="img8" alt="ma" />
      <p className="p6">{name}</p>
    </li>
  )
}
export default Skill
