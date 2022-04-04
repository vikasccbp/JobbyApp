import './index.css'

const EmploymentTypesList = props => {
  const {each, employmentFunction} = props
  const {employmentTypeId, label} = each
  const onChangeInput = event => {
    employmentFunction(event.target.value)
  }
  return (
    <li className="employeeDiv">
      <input
        type="checkbox"
        className="input3"
        id={employmentTypeId}
        onChange={onChangeInput}
        value={employmentTypeId}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}
export default EmploymentTypesList
