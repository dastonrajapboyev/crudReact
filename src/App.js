import React, { useState } from "react";
import { users } from "./mock";

function App() {
  const [data, setData] = useState(users);

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");

  const [status, setStatus] = useState("");

  const [select, setSelect] = useState(null);

  const [values, setValues] = useState({
    name: "",
    status: "",
  });

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // delete

  const onDelete = (userId) => {
    const updatedUsers = data.filter((user) => user.id !== userId);
    setData(updatedUsers);
  };
  // search
  const onSelect = (e) => {
    setSearch(e.target.value);
  };

  // search
  const onSearch = (e) => {
    let filtered = users.filter((value) =>
      `${value[search]}`.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(filtered);
  };

  const onCreate = () => {
    let user = {
      id: users.length + 1,
      name: name,
      status: status,
    };

    setData([...users, user]);
    setName("");
    setStatus("");
  };

  // update
  const onUpdate = ({ id, name, status }, isSave) => {
    if(isSave){
      let onUpdated = data.map((value)=> value.id === select?.id ?{...value, name: values.name, status: values.status} : value);
      setData(onUpdated)
      setSelect(null)
    }else{
      setValues({
        name: name,
        status: status
      })
      setSelect({ id, name, status });
    }
  };

  return (
    <div>
      <select onChange={onSelect}>
        <option value="id">id</option>
        <option value="name">name</option>
        <option value="status">status</option>
      </select>
      <input onChange={onSearch} type="text" placeholder="search..." />
      <br />
      <input
        value={name}
        name="newName"
        type="text"
        placeholder="addName"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        value={status}
        name="newStatus"
        type="text"
        placeholder="enter status"
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={onCreate}>add user</button>
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>status</th>
            <th>actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length ? (
            data.map(({ id, name, status }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>
                    {select?.id === id ? (
                      <input
                        value={values.name}
                        onChange={onChange}
                        name="name"
                        type="text"
                      />
                    ) : (
                      name
                    )}
                  </td>
                  <td>
                    {select?.id === id ? (
                      <input
                        value={values.status}
                        onChange={onChange}
                        name="status"
                        type="text"
                      />
                    ) : (
                      status
                    )}
                  </td>
                  <td>
                    <button onClick={() => onDelete(id)}>delete</button>
                    <button onClick={() => onUpdate({ id, name, status }, select?.id === id)}>
                      {select?.id === id ? "save" : "edit "}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <th colSpan={4}>
                <h1>No Data</h1>
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
