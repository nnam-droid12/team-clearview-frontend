import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FileText, ChevronRight, Search, Plus, Loader } from "lucide-react";

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1a365d;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
`;

const CreateButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #2b6cb0;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: #2c5282;
    transform: translateY(-2px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const Card = styled(Link)`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const CardMeta = styled.div`
  color: #718096;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const Status = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status?.toLowerCase()) {
      case "completed":
        return "#C6F6D5";
      case "pending":
        return "#FEEBC8";
      case "draft":
        return "#E2E8F0";
      default:
        return "#E2E8F0";
    }
  }};
  color: ${(props) => {
    switch (props.status?.toLowerCase()) {
      case "completed":
        return "#2F855A";
      case "pending":
        return "#C05621";
      case "draft":
        return "#4A5568";
      default:
        return "#4A5568";
    }
  }};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e53e3e;
`;

function AgreementList() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAgreements();
  }, []);

  const fetchAgreements = async () => {
    try {
      const token = localStorage.getItem("userInfo");
      const parsedToken = JSON.parse(token);
      console.log(parsedToken.accessToken);
      const response = await fetch("/api/v1/agreements/get-all-agreement", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${parsedToken.accessToken}`, // Add authorization header
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch agreements");
      }
      const data = await response.json();
      const contents = data.content;
      setAgreements(contents);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgreements = agreements.filter((agreement) =>
    agreement.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <LoadingContainer>
        <Loader size={40} className="animate-spin" />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <p>Error: {error}</p>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Agreements</Title>
        <CreateButton to="/create-agreement">
          <Plus size={20} />
          New Agreement
        </CreateButton>
      </Header>

      <SearchContainer>
        <SearchIcon>
          <Search size={20} />
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search agreements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      <Grid>
        {filteredAgreements.map((agreement) => (
          <Card
            key={agreement.agreementId}
            to={`/agreement-detail/${agreement.agreementId}`}
          >
            <CardTitle>{agreement.title}</CardTitle>
            <CardMeta>
              Created: {new Date(agreement.signedDate).toLocaleDateString()}
            </CardMeta>
            <div>
              <div>Milestones: {agreement.milestones[0].title}</div>
              <div>Obligations: {agreement.obligations[0].description}</div>
            </div>
            <CardFooter>
              <Status status={agreement.status}>{agreement.status}</Status>
              <ChevronRight size={20} color="#718096" />
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default AgreementList;
