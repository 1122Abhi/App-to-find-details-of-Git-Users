import React, { Component } from "react";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      newList: [],
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value }, () =>
      console.log(">>", this.state.name)
    );
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

  render() {
    console.log("in render", this.state.list.items);
    return (
      <div>
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            {/* <form className="form-inline ">
              <input
                className="form-control form-control-sm mr-3 w-40"
                type="text"
                id="name"
                placeholder="Search"
                aria-label="Search"
                onChange={this.handleChange}
              />
            </form> */}
           
          </nav>
        </div>
        <div class="row ">
          <div class="col-md-3 offset-md-3">
            Total Results: {this.state.list.total_count}
          </div>
        </div>
        <div className="container  ">
          {this.state.newList.map((data, index) => (
            <div className="row text-left " key={index}>
              <div className="card ml-5 mr-5">
                <h2>{data.login}</h2>
                <h4 className="card-text">Profile URL:{data.html_url}</h4>
                <div className="text-right">
                  <a href="/#" class="btn btn-primary">
                    Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Navbar;
