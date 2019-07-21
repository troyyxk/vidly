import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import Form from "./common/form";

class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    // Call the server
    console.log("Sbumitted");
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput90("username", "Username")}
          {this.renderInput90("password", "Password", "password")}

          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;

// The old way of validation.
// validate = () => {
//   const errors = {};

//   const { data } = this.state;
//   if (data.username.trim() === "")
//     errors.username = "Username is required.";
//   if (data.password.trim() === "")
//     errors.password = "Password is required.";

//   return Object.keys(errors).length === 0 ? null : errors;
// };
