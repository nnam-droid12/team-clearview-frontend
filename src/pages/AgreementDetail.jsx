// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import {
//   ArrowLeft,
//   Calendar,
//   CheckCircle2,
//   AlertCircle,
//   Clock,
//   User,
//   Trash2,
//   Edit2,
// } from "lucide-react";

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 2rem auto;
//   padding: 0 1rem;
// `;

// const LoadingContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 400px;
// `;

// const ErrorContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 400px;
//   color: #e53e3e;
// `;

// const BackLink = styled(Link)`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   color: #4a5568;
//   text-decoration: none;
//   margin-bottom: 2rem;

//   &:hover {
//     color: #2d3748;
//   }
// `;

// const Header = styled.div`
//   background: white;
//   padding: 2rem;
//   border-radius: 8px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// `;

// const Title = styled.h1`
//   font-size: 1.875rem;
//   color: #2d3748;
//   margin-bottom: 1rem;
// `;

// const MetaData = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 2rem;
//   margin-bottom: 1.5rem;
// `;

// const MetaItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   color: #4a5568;
// `;

// // just added

// const Section = styled.div`
//   background: white;
//   padding: 2rem;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   margin-bottom: 2rem;
// `;

// const SectionTitle = styled.h2`
//   font-size: 1.5rem;
//   color: #2d3748;
//   margin-bottom: 1.5rem;
//   padding-bottom: 0.5rem;
//   border-bottom: 2px solid #e2e8f0;
// `;

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 1.5rem;
// `;

// const Card = styled.div`
//   background: #f7fafc;
//   padding: 1.5rem;
//   border-radius: 6px;
//   border: 1px solid #e2e8f0;
// `;

// const CardTitle = styled.h3`
//   font-size: 1.25rem;
//   color: #2d3748;
//   margin-bottom: 1rem;
// `;

// const CardContent = styled.div`
//   color: #4a5568;
//   margin-bottom: 1rem;
// `;

// const Status = styled.span`
//   padding: 0.25rem 0.75rem;
//   border-radius: 9999px;
//   font-size: 0.875rem;
//   font-weight: 500;

//   ${({ status }) =>
//     status === "completed"
//       ? `
//     background: #C6F6D5;
//     color: #2F855A;
//   `
//       : `
//     background: #FEEBC8;
//     color: #C05621;
//   `}
// `;

// const ActionButtons = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 1rem;
// `;

// const Button = styled.button`
//   padding: 0.5rem 1rem;
//   border-radius: 6px;
//   font-weight: 500;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   transition: all 0.2s;

//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// const StatusButton = styled(Button)`
//   background: #ebf4ff;
//   color: #2b6cb0;
//   border: 1px solid #bee3f8;

//   &:hover:not(:disabled) {
//     background: #bee3f8;
//   }
// `;

// const EditButton = styled(Button)`
//   background: #e9d8fd;
//   color: #6b46c1;
//   border: 1px solid #d6bcfa;

//   &:hover:not(:disabled) {
//     background: #d6bcfa;
//   }
// `;

// const DeleteButton = styled(Button)`
//   background: #fed7d7;
//   color: #c53030;
//   border: 1px solid #feb2b2;

//   &:hover:not(:disabled) {
//     background: #feb2b2;
//   }
// `;

// const Modal = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalContent = styled.div`
//   background: white;
//   padding: 2rem;
//   border-radius: 8px;
//   max-width: 400px;
//   width: 90%;
// `;

// const ModalButtons = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 1rem;
//   margin-top: 1.5rem;
// `;

// function AgreementDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [agreement, setAgreement] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     fetchAgreement();
//   }, []);

//   const fetchAgreement = async () => {
//     try {
//       const token = localStorage.getItem("userInfo");
//       const parsedToken = JSON.parse(token);
//       console.log(parsedToken.accessToken);
//       const response = await fetch(
//         `/api/v1/agreements/get-agreementById/${id}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${parsedToken.accessToken}`, // Add authorization header
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch agreement details");
//       }
//       const data = await response.json();
//       setAgreement(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChangeStatus = async () => {
//     setIsUpdating(true);
//     try {
//         const token = localStorage.getItem("userInfo");
//       const parsedToken = JSON.parse(token);
//       console.log(parsedToken.accessToken);
//     //   console.log();
//       const response = await fetch(
//         `/api/v1/agreements/update-status/${id}/status`,
//         {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${parsedToken.accessToken}`, // Add authorization header
//           },
//           body: "hello"
//         }
//       );

//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.log('Error response:', errorText);
//         throw new Error(`Failed to update status: ${errorText}`);
//     }

//     //   setAgreement((prev) => ({ ...prev, status: newStatus }));
//     } catch (err) {
//         console.log(err);
//       setError(err.message);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const deleteAgreement = async () => {
//     setIsDeleting(true);
//     try {
//         const token = localStorage.getItem("userInfo");
//       const parsedToken = JSON.parse(token);
//       console.log(parsedToken.accessToken);
//       const response = await fetch(
//         `/api/v1/agreements/delete-agreement/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             'Authorization': `Bearer ${parsedToken.accessToken}`, // Add authorization header
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete agreement");
//       }

//       navigate("/all-agreements");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsDeleting(false);
//       setShowDeleteModal(false);
//     }
//   };

//   if (loading) {
//     return (
//       <LoadingContainer>
//         <div className="animate-spin">Loading...</div>
//       </LoadingContainer>
//     );
//   }

//   if (error) {
//     return (
//       <ErrorContainer>
//         <p>Error: {error}</p>
//       </ErrorContainer>
//     );
//   }

//   if (!agreement) {
//     return (
//       <ErrorContainer>
//         <p>Agreement not found</p>
//       </ErrorContainer>
//     );
//   }

//   return (
//     <Container>
//       <BackLink to="/all-agreements">
//         <ArrowLeft size={20} />
//         Back to Agreements
//       </BackLink>

//       <Header>
//         <Title>{agreement.title}</Title>
//         <MetaData>
//           <MetaItem>
//             <Calendar size={16} />
//             Signed: {new Date(agreement.signedDate).toLocaleDateString()}
//           </MetaItem>
//           <MetaItem>
//             <CheckCircle2 size={16} />
//             Status:{" "}
//             <Status status={agreement.status}>{agreement.status}</Status>
//           </MetaItem>
//           <MetaItem>
//             <AlertCircle size={16} />
//             DocuSign ID: {agreement.docuSignEnvelopeId}
//           </MetaItem>
//         </MetaData>

//         <Section>
//         <SectionTitle>Milestones</SectionTitle>
//         <Grid>
//           {agreement.milestones.map((milestone) => (
//             <Card key={milestone.milestoneId}>
//               <CardTitle>{milestone.title}</CardTitle>
//               <CardContent>{milestone.description}</CardContent>
//               <MetaData>
//                 <MetaItem>
//                   <Clock size={16} />
//                   Due: {new Date(milestone.dueDate).toLocaleDateString()}
//                 </MetaItem>
//                 <MetaItem>
//                   <Status status={milestone.status}>{milestone.status}</Status>
//                 </MetaItem>
//               </MetaData>
//             </Card>
//           ))}
//         </Grid>
//       </Section>

//       <Section>
//         <SectionTitle>Obligations</SectionTitle>
//         <Grid>
//           {agreement.obligations.map((obligation) => (
//             <Card key={obligation.obligationId}>
//               <CardContent>{obligation.description}</CardContent>
//               <MetaData>
//                 <MetaItem>
//                   <Clock size={16} />
//                   Due: {new Date(obligation.dueDate).toLocaleDateString()}
//                 </MetaItem>
//                 <MetaItem>
//                   <User size={16} />
//                   Assigned to: {obligation.assignedTo}
//                 </MetaItem>
//                 <MetaItem>
//                   <Status status={obligation.status}>{obligation.status}</Status>
//                 </MetaItem>
//               </MetaData>
//             </Card>
//           ))}
//         </Grid>
//       </Section>

//         <ActionButtons>
//           <StatusButton
//             onClick={handleChangeStatus}
//             disabled={isUpdating}
//           >
//             <CheckCircle2 size={16} />
//             {isUpdating
//               ? "Updating..."
//               : `Mark as ${
//                   agreement.status === "pending" ? "Completed" : "Pending"
//                 }`}
//           </StatusButton>
//           <EditButton onClick={() => navigate(`/edit-document/${id}`)}>
//             <Edit2 size={16} />
//             Edit Agreement
//           </EditButton>
//           <DeleteButton
//             onClick={() => setShowDeleteModal(true)}
//             disabled={isDeleting}
//           >
//             <Trash2 size={16} />
//             Delete Agreement
//           </DeleteButton>
//         </ActionButtons>
//       </Header>

//       {showDeleteModal && (
//         <Modal>
//           <ModalContent>
//             <h2 style={{ marginBottom: "1rem", color: "#2D3748" }}>
//               Confirm Delete
//             </h2>
//             <p style={{ color: "#4A5568" }}>
//               Are you sure you want to delete this agreement? This action cannot
//               be undone.
//             </p>
//             <ModalButtons>
//               <Button
//                 onClick={() => setShowDeleteModal(false)}
//                 style={{
//                   background: "#E2E8F0",
//                   border: "1px solid #CBD5E0",
//                   color: "#4A5568",
//                 }}
//               >
//                 Cancel
//               </Button>
//               <DeleteButton onClick={deleteAgreement} disabled={isDeleting}>
//                 {isDeleting ? "Deleting..." : "Delete"}
//               </DeleteButton>
//             </ModalButtons>
//           </ModalContent>
//         </Modal>
//       )}
//     </Container>
//   );
// }

// export default AgreementDetail;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Calendar, CheckCircle2, AlertCircle, Clock, User, Edit2, Trash2 } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  text-decoration: none;
  margin-bottom: 2rem;
  
  &:hover {
    color: #2b6cb0;
  }
`;

const Header = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1a365d;
  margin-bottom: 1rem;
`;

const MetaData = styled.div`
  display: flex;
  gap: 2rem;
  color: #4a5568;
  font-size: 0.875rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Section = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  color: #4a5568;
  margin-bottom: 1rem;
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

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #3182ce;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f56565;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #e53e3e;
  }
  
  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

function AgreementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchAgreement();
  }, []);

  const fetchAgreement = async () => {
    try {
      const token = localStorage.getItem("userInfo");
      const parsedToken = JSON.parse(token);
      const response = await fetch(
        `/api/v1/agreements/get-agreementById/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${parsedToken.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch agreement details");
      }
      const data = await response.json();
      setAgreement(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (type, itemId, newStatus) => {
    setAgreement(prev => {
      if (type === 'agreement') {
        return { ...prev, status: newStatus };
      }
      if (type === 'milestone') {
        return {
          ...prev,
          milestones: prev.milestones.map(m =>
            m.milestoneId === itemId ? { ...m, status: newStatus } : m
          )
        };
      }
      if (type === 'obligation') {
        return {
          ...prev,
          obligations: prev.obligations.map(o =>
            o.obligationId === itemId ? { ...o, status: newStatus } : o
          )
        };
      }
      return prev;
    });
  };

  const deleteAgreement = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("userInfo");
      const parsedToken = JSON.parse(token);
      const response = await fetch(
        `/api/v1/agreements/delete-agreement/${id}`,
        {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${parsedToken.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete agreement");
      }

      navigate("/all-agreements");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <div className="animate-spin">Loading...</div>
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

  if (!agreement) {
    return (
      <ErrorContainer>
        <p>Agreement not found</p>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <BackLink to="/all-agreements">
        <ArrowLeft size={20} />
        Back to Agreements
      </BackLink>

      <Header>
        <Title>{agreement.title}</Title>
        <MetaData>
          <MetaItem>
            <Calendar size={16} />
            Signed: {new Date(agreement.signedDate).toLocaleDateString()}
          </MetaItem>
          <MetaItem>
            <CheckCircle2 size={16} />
            Status:{" "}
            <StatusBadge
              status={agreement.status}
              id={id}
              type="agreement"
              onStatusChange={(newStatus) => handleStatusChange('agreement', id, newStatus)}
            />
          </MetaItem>
          <MetaItem>
            <AlertCircle size={16} />
            DocuSign ID: {agreement.docuSignEnvelopeId}
          </MetaItem>
        </MetaData>

        <Section>
          <SectionTitle>Milestones</SectionTitle>
          <Grid>
            {agreement.milestones.map((milestone) => (
              <Card key={milestone.milestoneId}>
                <CardTitle>{milestone.title}</CardTitle>
                <CardContent>{milestone.description}</CardContent>
                <MetaData>
                  <MetaItem>
                    <Clock size={16} />
                    Due: {new Date(milestone.dueDate).toLocaleDateString()}
                  </MetaItem>
                  <MetaItem>
                    <StatusBadge
                      status={milestone.status}
                      id={milestone.milestoneId}
                      type="milestone"
                      onStatusChange={(newStatus) => 
                        handleStatusChange('milestone', milestone.milestoneId, newStatus)
                      }
                    />
                  </MetaItem>
                </MetaData>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Obligations</SectionTitle>
          <Grid>
            {agreement.obligations.map((obligation) => (
              <Card key={obligation.obligationId}>
                <CardContent>{obligation.description}</CardContent>
                <MetaData>
                  <MetaItem>
                    <Clock size={16} />
                    Due: {new Date(obligation.dueDate).toLocaleDateString()}
                  </MetaItem>
                  <MetaItem>
                    <User size={16} />
                    Assigned to: {obligation.assignedTo}
                  </MetaItem>
                  <MetaItem>
                    <StatusBadge
                      status={obligation.status}
                      id={obligation.obligationId}
                      type="obligation"
                      onStatusChange={(newStatus) =>
                        handleStatusChange('obligation', obligation.obligationId, newStatus)
                      }
                    />
                  </MetaItem>
                </MetaData>
              </Card>
            ))}
          </Grid>
        </Section>

        <ActionButtons>
          <EditButton onClick={() => navigate(`/edit-document/${id}`)}>
            <Edit2 size={16} />
            Edit Agreement
          </EditButton>
          <DeleteButton
            onClick={() => setShowDeleteModal(true)}
            disabled={isDeleting}
          >
            <Trash2 size={16} />
            Delete Agreement
          </DeleteButton>
        </ActionButtons>
      </Header>

      {showDeleteModal && (
        <Modal>
          <ModalContent>
            <h2 style={{ marginBottom: "1rem", color: "#2D3748" }}>
              Confirm Delete
            </h2>
            <p style={{ color: "#4A5568" }}>
              Are you sure you want to delete this agreement? This action cannot
              be undone.
            </p>
            <ModalButtons>
              <Button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  background: "#E2E8F0",
                  border: "1px solid #CBD5E0",
                  color: "#4A5568",
                }}
              >
                Cancel
              </Button>
              <DeleteButton onClick={deleteAgreement} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </DeleteButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

export default AgreementDetail;
