import React, { useEffect, useState } from "react"

function SkillList({ onChange }) {
  // React Hooks declarations
  const [skills, setSkills] = useState([]);
  const [query, setQuery] = useState("")

  useEffect(() => {
      onChange(skills);
  }, [skills, onChange])

  const handleClick = () => {
    // Add the search term to the list onClick of Search button
    // (Actually searching would require an API call here)

    // Save search term state to React Hooks
    // setSearches(searches => [...searches, query])
    if (query.length > 0) {
        const updated = skills.concat(query)
        setSkills(updated)
    }
  }

  const updateQuery = ({ target }) => {
    // Update query onKeyPress of input box
    setQuery(target.value)
  }

  const keyPressed = ({ key }) => {
    // Capture search on Enter key
    if (key === "Enter") {
      handleClick()
    }
  }

  const submitHandler = e => {
    // Prevent form submission on Enter key
    e.preventDefault()
  }

  const removeFormFields = (i) => {
      let newFormValues = [...skills];
      newFormValues.splice(i, 1);
      setSkills(newFormValues);
    //   onChange(skills)
    };

  const Skill = ({ query }) => <li>{query}</li>

  return (
    <div className= "mb-4 form-inline">
        <div>
          <input
            className="shadow appearance-none border rounded
            w-full py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
            placeholder="Skill"
            type="text"
            onChange={updateQuery}
            onKeyPress={keyPressed}
            onSubmit={submitHandler}
          />
          <button
            className="px-4 py-2 rounded text-white inline-block shadow-lg 
            bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
            type="button"
            onClick={handleClick}
          >
            Add Skill
          </button>
        </div>
        <ul className="bg-white rounded-lg border border-gray-200 w-full text-gray-900">
        {skills.map((query, index) => (
          <Skill
            query={query}
            // Prevent duplicate keys by appending index:
            key={query + index}
            //onClick={() => removeFormFields(index)}
          />
        ))}
      </ul>
    </div>
  )
}

export default SkillList