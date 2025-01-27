import { FileSignature, Upload, Shield, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

const Nav = styled.nav`
  border-bottom: 1px solid #e5e7eb;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    font-size: 1.25rem;
    font-weight: bold;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  ${props => props.primary ? `
    background-color: #2563eb;
    color: white;
    border: none;
    
    &:hover {
      background-color: #1d4ed8;
    }
  ` : `
    background-color: transparent;
    color: #374151;
    border: 1px solid transparent;
    
    &:hover {
      background-color: #f3f4f6;
    }
  `}
  
  ${props => props.large && `
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  `}
`;

const HeroSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`;

const HeroContent = styled.div`
  @media (min-width: 1024px) {
    width: 50%;
    padding-right: 3rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  
  @media (min-width: 1024px) {
    font-size: 3.75rem;
  }
  
  span {
    color: #2563eb;
  }
`;

const HeroText = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 2rem;
`;

const HeroImage = styled.div`
  margin-top: 3rem;
  
  @media (min-width: 1024px) {
    width: 50%;
    margin-top: 0;
  }
  
  img {
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`;

const FeaturesSection = styled.section`
  background-color: #f9fafb;
  padding: 5rem 1rem;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FeaturesTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1rem 0;
  }
  
  p {
    color: #6b7280;
  }
`;

const Footer = styled.footer`
  border-top: 1px solid #e5e7eb;
  padding: 2rem 1rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

function HomPage() {
  return (
    <Container>
      <Nav>
        <NavContent>
          <Logo>
            <FileSignature size={24} color="#2563eb" />
            <span>ClearView</span>
          </Logo>
          <ButtonGroup>
            <Link to="/sign-in">
            <Button>Sign In</Button>
            </Link>
            <Link to="/sign-up">
            <Button primary>Sign Up</Button>
            </Link>
          </ButtonGroup>
        </NavContent>
      </Nav>

      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Sign Documents Securely,
            <span> Anywhere</span>
          </HeroTitle>
          <HeroText>
            Transform your document workflow with our secure, easy-to-use digital signing platform. Upload, sign, and manage all your important documents in one place.
          </HeroText>
          <ButtonGroup>
            <Button primary large>
              <Upload size={20} />
              Upload Document
            </Button>
            <Button large>
              Learn More
            </Button>
          </ButtonGroup>
        </HeroContent>
        <HeroImage>
          <img
            src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1000"
            alt="Document signing illustration"
          />
        </HeroImage>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContainer>
          <FeaturesTitle>Why Choose ClearView?</FeaturesTitle>
          <FeaturesGrid>
            <FeatureCard>
              <Shield size={48} color="#2563eb" />
              <h3>Secure & Compliant</h3>
              <p>
                Bank-level security with advanced encryption and compliance with global e-signature laws.
              </p>
            </FeatureCard>
            <FeatureCard>
              <Clock size={48} color="#2563eb" />
              <h3>Fast & Efficient</h3>
              <p>
                Sign documents in minutes, not days. Streamline your workflow with automated processes.
              </p>
            </FeatureCard>
            <FeatureCard>
              <Users size={48} color="#2563eb" />
              <h3>Team Collaboration</h3>
              <p>
                Easy document sharing and real-time collaboration with team members and clients.
              </p>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <Footer>
        <FooterContent>
          <Logo>
            <FileSignature size={20} color="#2563eb" />
            <span>ClearView</span>
          </Logo>
          <Copyright>
            © 2024 ClearView. All rights reserved.
          </Copyright>
        </FooterContent>
      </Footer>
    </Container>
  );
}

export default HomPage;