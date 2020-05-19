import React, { Component } from "react";

class Project extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      newList: [],
      newArray: [],
      currentPage: 1,
      perPage: 5,
      name: "",
      currentUsers: [],
      arrayTable: [],
      langArray: [],
      clicked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTable = this.handleTable.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });

    var url = "https://api.github.com/search/users?q=" + e.target.value;

    fetch(url)
      .then((resp) => resp.json())
      .then((result) => {
        this.setState({
          newList: result.items,
          list: result,
        });
      });

    e.preventDefault();
  };

  handleSort = (e) => {
    if (e.target.value === "1") {
      var newArray = this.state.currentUsers.sort(function (a, b) {
        var x = a.login.toLowerCase();
        var y = b.login.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        currentUsers: newArray,
      });
    } else if (e.target.value === "2") {
      newArray = this.state.currentUsers.sort(function (a, b) {
        var x = a.login.toLowerCase();
        var y = b.login.toLowerCase();

        if (x < y) {
          return 1;
        }
        if (x > y) {
          return -1;
        }
        return 0;
      });
      this.setState({
        currentUsers: newArray,
      });
    }
  };

  handlePage = (e) => {
    this.setState({ currentPage: e.target.value }, () => {
      const indexOfLastUser = this.state.currentPage * this.state.perPage;
      const indexOfFirstUser = indexOfLastUser - this.state.perPage;
      this.setState({
        currentUsers: this.state.newList.slice(
          indexOfFirstUser,
          indexOfLastUser
        ),
      });
    });
  };

  handleTable = (index) => {
    if (this.state.arrayTable.length === 0) {
      var login = this.state.currentUsers[index].login;
      var url = `https://api.github.com/users/${login}/repos`;
      fetch(url)
        .then((resp) => resp.json())
        .then((result) => {
          this.setState({ arrayTable: result.slice(0, 4) });
        });
    } else {
      this.setState({ arrayTable: [] });
    }
  };

  handleButton = () => {
    var button = [];
    for (let index = 1; index <= 6; index++) {
      button.push(
        <input type="button" value={index} onClick={this.handlePage} />
      );
    }
    return button;
  };

  // handleMap = () => {
  //   var arrayMap = []
  //   for(let index = 0;index <= this.state.currentUsers.length; index++){
  //     this.state.arrayTable.map((data, index) => (
  //     if(this.state.currentUsers[index].login){

  //     }
  //     )}
  //   }
  // }

  render() {
    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark blue bg-primary ">
            <form className="form-inline my-2 my-lg-0 ml-7">
              <input
                className="form-control "
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={this.handleChange}
              ></input>
            </form>
            <div onChange={this.handleSort} className="ml-2">
              <select className="form-control">
                <option value="0">Sort by Name :</option>
                <option value="1">A-Z</option>
                <option value="2">Z-A</option>
                <option value="3">Rank(Top)</option>
                <option value="4">Rank(Last)</option>
              </select>
            </div>
          </nav>
        </div>
        {this.state.list.length === 0 ? (
          <div>
            <div className="Card">
              <div className="container mt-4 ">
                <div className="card border border-primary shadow-lg p-3 mb-5 bg-white rounded">
                  <div className="col-md-10">
                    <h2 className="card-title">Type in the search bar</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {this.state.currentUsers.map((data, index) => (
              <div className="container mt-4" key={index}>
                <div className="card border border-primary shadow-lg p-3 mb-5 bg-white rounded">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src={data.avatar_url}
                          className="rounded-circle"
                          alt="Cinque Terre"
                          width="200"
                          height="200"
                        ></img>
                      </div>
                      <div className="col-md-6">
                        <h3 className="card-title text-left text-primary">
                          {data.login}
                        </h3>
                        <p className="card-text text-left ">
                          GitHub URL: {data.html_url}
                        </p>
                        <p className="card-text text-left ">
                          User ID: {data.id}
                        </p>
                        <button
                          href="/#"
                          type="button"
                          className="btn btn-primary"
                          onClick={this.handleTable.bind(this, index)}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card-body" key={index}>
                    <table className="table">
                      <tbody>
                        {this.state.arrayTable.length === 0 ? (
                          <></>
                        ) : (
                          <>
                            <th scope="col">Name of the Repository</th>
                            <th scope="col">Language</th>
                            <th scope="col">ID of the Repository</th>
                            <th scope="col">Created</th>
                            {this.state.arrayTable.map((data, index) => (
                              <>
                                {/* {this.handleMap()} */}
                                <tr>
                                  <td>{data.name}</td>
                                  <td>{data.language}</td>
                                  <td>{data.id}</td>
                                  <td>{data.created_at}</td>
                                </tr>
                              </>
                            ))}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
            <view>{this.handleButton()}</view>
          </div>
        )}
      </div>
    );
  }
}
export default Project;
