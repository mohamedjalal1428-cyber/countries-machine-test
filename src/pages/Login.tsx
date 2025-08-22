import { useState } from "react";
import { Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import siginImg from "../assets/Sign-In.webp";
import { SlSocialGoogle, SlSocialFacebook } from "react-icons/sl";
import { LuLinkedin, LuTwitter } from "react-icons/lu";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [keepSigned, setKeepSigned] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const _errors: Record<string, string> = {};
    if (!email) _errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      _errors.email = "Enter a valid email";

    if (!password) _errors.password = "Password is required";
    else if (!passwordRegex.test(password)) {
      _errors.password =
        "Min 8 chars, include 1 uppercase, 1 number & 1 symbol";
    }

    setErrors(_errors);
    setValidated(true);

    if (Object.keys(_errors).length === 0) {
      dispatch(loginSuccess({ email }));
      if (keepSigned) localStorage.setItem("mock-auth", "1");
      navigate("/");
    } else {
      dispatch(loginFailure("Validation failed"));
    }
  };

  return (
    <div className="items-center flex justify-center  w-full h-dvh">
      <Col xs={12} md={4} className="mb-4 mb-md-0">
        <Card className=" border-0 shadow-none ">
          <Card.Body className="p-4 shadow-none">
            <div className="flex flex-col gap-2">
              <h2 className="fw-bold mb-2">Sign In</h2>
              <div className="mb-9">
                New user?{" "}
                <a
                  href="#"
                  style={{ textDecoration: "none" }}
                  onClick={(e) => e.preventDefault()}
                >
                  Create an account
                </a>
              </div>
            </div>
            {validated && Object.keys(errors).length > 0 && (
              <Alert variant="danger" className="py-2">
                Please fix the errors and try again.
              </Alert>
            )}
            <Form
              noValidate
              onSubmit={onSubmit}
              className="login-form flex flex-col"
            >
              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Username or email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="flex items-center gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={keepSigned}
                  onChange={(e) => setKeepSigned(e.target.checked)}
                  className="w-6 h-6 accent-black cursor-pointer"
                />
                <span className="text-gray-800">Keep me signed in</span>
              </div>

              <Button type="submit" className="w-100 btn-dark rounded-0">
                Sign In
              </Button>
            </Form>
            <div className="d-flex align-items-center gap-2 my-4">
              <div className="flex-grow-1 border-top" />
              <div className="text-muted small">Or Sign In With</div>
              <div className="flex-grow-1 border-top" />
            </div>
            <div className="flex justify-center gap-3">
              <button className="rounded-circle border flex justify-center items-center bg-white p-2 social-btn hover:bg-black hover:text-white transition">
                <span className="fw-bold">
                  <SlSocialGoogle />
                </span>
              </button>

              <button className="rounded-circle border flex justify-center items-center bg-white p-2 social-btn hover:bg-black hover:text-white transition">
                <span className="fw-bold">
                  <SlSocialFacebook />
                </span>
              </button>

              <button className="rounded-circle border flex justify-center items-center bg-white p-2 social-btn hover:bg-black hover:text-white transition">
                <span className="fw-bold">
                  <LuLinkedin />
                </span>
              </button>

              <button className="rounded-circle border flex justify-center items-center bg-white p-2 social-btn hover:bg-black hover:text-white transition">
                <span className="fw-bold">
                  <LuTwitter />
                </span>
              </button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6} className="d-none d-md-flex justify-content-center">
        <img
          src={siginImg}
          alt="Login illustration"
          className="img-fluid"
          style={{ maxWidth: 400, marginLeft: "auto" }}
        />
      </Col>
    </div>
  );
}
