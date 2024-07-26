import { InputGroup } from "react-bootstrap"
export default function Registration(props){
    return(
        <>
        <div class="container mt-5">
    <h1>Register</h1>

    <div className="row">
      <div className="col-sm-8">
        <div className="card">
          <div className="card-body">

            <form action="/register" method="POST">
              <div className="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" name="username"/>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password"/>
              </div>
              <button type="submit" class="btn btn-dark">Register</button>
            </form>

          </div>
        </div>
      </div>

      <div className="col-sm-4">
        <div className="card social-block">
          <div className="card-body">
            <a className="btn btn-block" href="http://localhost:3000/auth/google" role="button">
              <i className="fab fa-google"></i>
              Sign Up with Google
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
        </>
    )
}