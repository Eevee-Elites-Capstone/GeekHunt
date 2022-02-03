import React, { useState, useEffect } from "react";

/*
So far we have passed the setEditing prop to index.js.
Now we are going to pass the currentItem prop
*/
const UpdateProject = ({ setEditing, currentItem, updateItem }) => {
  /*
  Sets the state of the project to the current project
  */
  const [project, setItem] = useState(currentItem);

  /*
  Side effect is that without UseEffect if you start editing one project,
  then try to switch to another project, nothing will happen.
  The component is already open, and although the state
  on the parent has changed, it's not registered down to the props.
  We want to let the UpdateItem form component know the props have changed.
  With the Effect Hook, we create a callback function that updates the project
  state with the new prop thats being sent through.
  */
  useEffect(() => {
    setItem(currentItem);
    console.log("useEffect passes the currentItem: ", currentItem);
  }, [currentItem]);

  const onSubmit = e => {
    e.preventDefault();
    console.log("onSubmit passes the id and items", project);
    updateItem({ currentItem }, project);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setItem({ ...project, [name]: value });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="Update Item">Update Project:</label>
        <input type="text" name="name" value={project.name} onChange={onChange} placeholder="Edit Name" />
        <input type="text" name="category" value={project.category} onChange={onChange} placeholder="Edit Category"/>
        <input
          type="text"
          name="details"
          placeholder="Edit Details"
          value={project.details}
          onChange={onChange}
        />
        <button className="bg-yellow-500">Update</button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </form>
    </>
  );
};
export default UpdateProject
