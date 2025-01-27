import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
// import { toast } from 'react-toastify'
import styled from 'styled-components';


const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ register ] = useRegisterMutation()

  // const { userInfo } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/upload-document");
  //   }
  // }, [navigate,  userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log('Signed up with:', name, email, password);

    try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }))
        navigate('/upload-document')
        console.log(res)
      } catch (err) {
        // toast.error(err)
      }

    // Reset form after successful sign-up
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Sign Up</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <div>
            <InputLabel htmlFor="name">Full Name</InputLabel>
            <InputField
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <InputField
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <InputLabel htmlFor="password">Password</InputLabel>
            <InputField
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div>
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <InputField
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </form>
        <SignInLink>
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </SignInLink>
      </FormWrapper>
    </Container>
  );
};

export default SignUpPage;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f5f9;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

 

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 0.5rem;
  display: block;
`;

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  ::placeholder {
    color: #b0b0b0;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }

  &:focus {
    outline: none;
    background-color: #1e40af;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  text-align: center;
  margin-bottom: 1rem;
`;

const SignInLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 14px;

  a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 600;
  }

  a:hover {
    text-decoration: underline;
  }
`;
