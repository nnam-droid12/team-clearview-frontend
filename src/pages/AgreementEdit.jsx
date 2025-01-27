import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Save, X, Plus, Trash2 } from 'lucide-react';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4A5568;
  text-decoration: none;
  margin-bottom: 2rem;

  &:hover {
    color: #2D3748;
  }
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.875rem;
  color: #2D3748;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #E2E8F0;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #2D3748;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4A5568;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  font-size: 1rem;
  color: #2D3748;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4299E1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  font-size: 1rem;
  color: #2D3748;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4299E1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }
`;

const ItemCard = styled.div`
  background: #F7FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: #E53E3E;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;

  &:hover {
    background: #FED7D7;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #EBF8FF;
  color: #3182CE;
  border: 1px solid #BEE3F8;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #BEE3F8;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SaveButton = styled(Button)`
  background: #48BB78;
  color: white;
  border: 1px solid #38A169;

  &:hover:not(:disabled) {
    background: #38A169;
  }
`;

const CancelButton = styled(Button)`
  background: #E2E8F0;
  color: #4A5568;
  border: 1px solid #CBD5E0;

  &:hover:not(:disabled) {
    background: #CBD5E0;
  }
`;

const ErrorMessage = styled.div`
  color: #E53E3E;
  background: #FED7D7;
  border: 1px solid #FEB2B2;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
`;

function AgreementEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState({
    title: '',
    signedDate: '',
    milestones: [],
    obligations: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgreement();
  }, [id]);

  const fetchAgreement = async () => {
    try {
      const token = localStorage.getItem("userInfo");
      const parsedToken = JSON.parse(token);
      const response = await fetch(
        `/api/v1/agreements/get-agreementById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${parsedToken.accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch agreement details');
      }
      const data = await response.json();
      setAgreement(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("userInfo");
      const parsedToken = JSON.parse(token);
      console.log(parsedToken.accessToken);
      console.log(agreement)
      const response = await fetch(`/api/v1/agreements/update-agreement/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${parsedToken.accessToken}`,
        },
        body: JSON.stringify(agreement),
      });

           const updatedAgreement = await response.json();
      console.log('Updated Agreement:', updatedAgreement);
      if (!response.ok) {
        throw new Error('Failed to update agreement');
      }

      navigate(`/agreement-detail/${id}`);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgreement(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMilestoneChange = (index, field, value) => {
    setAgreement(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) =>
        i === index ? { ...milestone, [field]: value } : milestone
      )
    }));
  };

  const handleObligationChange = (index, field, value) => {
    setAgreement(prev => ({
      ...prev,
      obligations: prev.obligations.map((obligation, i) =>
        i === index ? { ...obligation, [field]: value } : obligation
      )
    }));
  };

  // const addMilestone = () => {
  //   setAgreement(prev => ({
  //     ...prev,
  //     milestones: [...prev.milestones, {
  //       title: '',
  //       description: '',
  //       dueDate: new Date().toISOString().split('T')[0]
  //     }]
  //   }));
  // };

  // const addObligation = () => {
  //   setAgreement(prev => ({
  //     ...prev,
  //     obligations: [...prev.obligations, {
  //       description: '',
  //       dueDate: new Date().toISOString().split('T')[0],
  //       assignedTo: ''
  //     }]
  //   }));
  // };

  // const removeMilestone = (index) => {
  //   setAgreement(prev => ({
  //     ...prev,
  //     milestones: prev.milestones.filter((_, i) => i !== index)
  //   }));
  // };

  // const removeObligation = (index) => {
  //   setAgreement(prev => ({
  //     ...prev,
  //     obligations: prev.obligations.filter((_, i) => i !== index)
  //   }));
  // };

  if (loading) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <Container>
      <BackLink to={`/agreement-detail/${id}`}>
        <ArrowLeft size={20} />
        Back to Agreement
      </BackLink>

      <Form onSubmit={handleSubmit}>
        <Title>Edit Agreement</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Section>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={agreement.title}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="signedDate">Signed Date</Label>
            <Input
              type="datetime-local"
              id="signedDate"
              name="signedDate"
              value="2025-02-01T00:00:00"             
               onChange={handleChange}
              required
            />
          </FormGroup>
        </Section>

        <Section>
          {/* <SectionTitle>
            Milestones
            <AddButton type="button" onClick={addMilestone}>
              <Plus size={16} />
              Add Milestone
            </AddButton>
          </SectionTitle> */}

          {agreement.milestones.map((milestone, index) => (
            <ItemCard key={index}>
              {/* <DeleteButton type="button" onClick={() => removeMilestone(index)}>
                <Trash2 size={16} />
              </DeleteButton> */}
              
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  value={milestone.title}
                  onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={milestone.description}
                  onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={milestone.dueDate?.split('T')[0]}
                  onChange={(e) => handleMilestoneChange(index, 'dueDate', e.target.value)}
                  required
                />
              </FormGroup>
            </ItemCard>
          ))}
        </Section>

        <Section>
          {/* <SectionTitle>
            Obligations
            <AddButton type="button" onClick={addObligation}>
              <Plus size={16} />
              Add Obligation
            </AddButton>
          </SectionTitle> */}

          {agreement.obligations.map((obligation, index) => (
            <ItemCard key={index}>
              {/* <DeleteButton type="button" onClick={() => removeObligation(index)}>
                <Trash2 size={16} />
              </DeleteButton> */}

              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={obligation.description}
                  onChange={(e) => handleObligationChange(index, 'description', e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={obligation.dueDate?.split('T')[0]}
                  onChange={(e) => handleObligationChange(index, 'dueDate', e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Assigned To</Label>
                <Input
                  type="text"
                  value={obligation.assignedTo}
                  onChange={(e) => handleObligationChange(index, 'assignedTo', e.target.value)}
                  required
                />
              </FormGroup>
            </ItemCard>
          ))}
        </Section>

        <ActionButtons>
          <CancelButton type="button" onClick={() => navigate(`/agreement-detail/${id}`)}>
            <X size={16} />
            Cancel
          </CancelButton>
          <SaveButton type="submit" disabled={saving}>
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Changes'}
          </SaveButton>
        </ActionButtons>
      </Form>
    </Container>
  );
}

export default AgreementEdit;