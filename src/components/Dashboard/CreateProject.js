import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { timestamp } from '../../firebase/fbConfig'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function CreateProject() {
  /**history hooks from react-router-dom */
  const history = useHistory()
  /**Add project collection to firestore */
  const { addDocument, response } = useFirestore('projects')
  /*Assign function*/
  const { documents } = useCollection('users')
  // console.log('All users', documents);
  const [users, setUsers] = useState([])
  const { user } = useAuthContext()

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)


  /*map through the array of all users*/
  useEffect(() => {
    if (documents) {
      const userOptions = documents.map(user => {
        return { value: { ...user, id: user.id }, label: user.displayName }
      })
      setUsers(userOptions)
    }
  }, [documents])
  // console.log('users', users)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    /**Catching form error */
    if (!category) {
      setFormError('Please select a project category')
      return
    }
    // if(assignedUsers.length < 1) {
    //   setFormError('Please assign the project to at least 1 user')
    //   return
    // }
    const assignedUsersList = assignedUsers.map(u => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }
    const project = {
      name,
      details,
      assignedUsersList,
      createdBy,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: []
    }
    console.log(name, details, dueDate, category.value, assignedUsers)
    console.log('project object', project);
    /**Add document to firestore */
    await addDocument(project)
    if (!response.error) {
      history.push('/dashboard')
    }
  }


  return (
    <div className="create-form flex flex-col items-center m-36 px-6">
      <h2 className="page-title text-center text-6xl text-slate-600 font-mono font-extrabold uppercase">Create a new Project</h2>
      <form className="bg-green-200 w-1/2" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(userOption) => setAssignedUsers(userOption)}
            options={users}
            isMulti
          />
        </label>

        <button className="btn">Add Project</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
