import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { setCookie } from "../utils/common";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUser();

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  // Updated Users with roles and status
  const [users, setUsers] = useState([
    {
      _id: "66ad0dcf9096ea44d465bdd1",
      firstname: "aj",
      lastname: "developer",
      email: "ajdeveloper@gmail.com",
      role: "admin",
      mobile: "9092930691",
      password: "admin123", // added password for matching
      status: "Active",
      permissions: ["Read", "Write", "Delete"]
    },
    {
      _id: "66ad0e199096ea44d465bdd7",
      firstname: "Lucky",
      lastname: "Radi",
      email: "lucky@gmail.com",
      role: "user",
      mobile: "9876543211",
      password: "user123", // added password for matching
      status: "Active",
      permissions: ["Read"]
    },
  ]);

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (userInfo) navigate("/dashboard");
  }, [userInfo]);

  // State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Function to handle change in form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    setError(false);
    setLoading(true);
    const form = event.currentTarget;
    event.preventDefault();

    // Check if the form is valid
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setLoading(false);
    } else {
      // Validate user login against users list
      const user = users.find(
        (u) =>
          u.email === formData.email.trim() &&
          u.password === formData.password.trim() &&
          u.status === "Active" // Check user status as well
      );

      if (user) {
        // Simulate a successful login
        setCookie("_USER_AUTH_", JSON.stringify(user));
        setUserInfo(user);
        navigate("/dashboard");
      } else {
        // Handle login failure
        setError(true);
        setLoading(false);
      }
    }

    // Update validation state
    setValidated(true);
  };

  return (
    <div className="login-section align-content-center">
      <Container>
        <Row className="justify-content-center">
          <Col xl={4} lg={5} md={7} xs={12}>
            <div className="login-box rounded p-4 shadow-sm bg-light">
              <h3 className="mb-4"> Sign In </h3>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="Enter email"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3 position-relative"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                  <span
                    className="position-absolute top-50 end-0 me-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "hide" : "show"}
                  </span>
                </Form.Group>
                {error ? (
                  <p className="text-danger">User email or password is incorrect</p>
                ) : (
                  ""
                )}

                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? "loading..." : "Submit"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
