import React, { Component } from "react";
import { users } from "./mock";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: "",
      dataList: users,
      select: null,
      search: "",
      delete: "delete",
    };
  }
  render() {
    // delete
    const onDelete = (userId) => {
      const updatedUsers = this.state.dataList.filter(
        (user) => user.id !== userId
      );
      this.setState({ dataList: updatedUsers });
    };

    // delete
    const onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    const onCreate = () => {
      let user = {
        id: Date.now(),
        name: this.state.name,
        status: this.state.status,
      };

      this.setState({
        dataList: [...this.state.dataList, user],
        name: "",
        status: "",
      });
    };

    // search
    const onSearch = (e) => {
      let filtered = users.filter((value) =>
        `${value[this.state.search]}`
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      this.setState({
        dataList: filtered,
      });
    };

    // search by category

    const onSelect = (e) => {
      this.setState({
        search: e.target.value,
      });
    };

    // update
    const onUpdate = ({ id, name, status }, isSave) => {
      if (isSave) {
        let updatedValue = this.state.dataList.map((value) =>
          value.id === this.state.select?.id
            ? { ...value, name: this.state.name, status: this.state.status }
            : value
        );
        this.setState({
          dataList: updatedValue,
          select: null,
        });
      } else {
        this.setState({
          name: name,
          status: status,
          select: { id, name, status },
        });
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
          value={this.state.name}
          name="name"
          // onChange={onChange}
          type="text"
          placeholder="addName"
        />
        <input
          value={this.state.status}
          name="status"
          // onChange={onChange}
          type="text"
          placeholder="enter status"
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
            {this.state.dataList.length ? (
              this.state.dataList.map(({ id, name, status }) => {
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>
                      {this.state.select?.id === id ? (
                        <input
                          onChange={onChange}
                          name="name"
                          type="text"
                          value={this.state?.name}
                        />
                      ) : (
                        name
                      )}
                    </td>
                    <td>
                      {this.state.select?.id === id ? (
                        <input
                          onChange={onChange}
                          name="status"
                          type="text"
                          value={this.state?.status}
                        />
                      ) : (
                        status
                      )}
                    </td>
                    <td>
                      <button onClick={() => onDelete(id)}>
                        {this.state.delete}
                      </button>
                      <button
                        onClick={() =>
                          onUpdate({ id, name, status }, this.state.select?.id)
                        }>
                        {this.state.select?.id === id ? "save" : "edit"}
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
}