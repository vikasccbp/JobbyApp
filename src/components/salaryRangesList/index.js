import './index.css'

const SalaryRangesList = props => {
  const {each, salaryFunction} = props
  const {salaryRangeId, label} = each
  const changingInput = event => {
    salaryFunction(event.target.value)
  }
  return (
    <li className="employeeDiv">
      <input
        type="radio"
        className="input3"
        id={salaryRangeId}
        onChange={changingInput}
        value={salaryRangeId}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRangesList
