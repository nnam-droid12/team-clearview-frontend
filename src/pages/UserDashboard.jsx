// import React from 'react';
// import styled from 'styled-components';
// import {
//   FileSignature,
//   Menu,
//   X,
//   Home,
//   FileText,
//   History,
//   Settings,
//   Users,
//   Bell,
//   Search,
// } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// const Container = styled.div`
//   min-height: 100vh;
//   background-color: #f8fafc;
// `;

// const Sidebar = styled.aside`
//   position: fixed;
//   left: 0;
//   top: 0;
//   bottom: 0;
//   width: 280px;
//   background: white;
//   border-right: 1px solid #e2e8f0;
//   transform: translateX(${props => props.isOpen ? '0' : '-100%'});
//   transition: transform 0.3s ease;
//   z-index: 50;
  
//   @media (max-width: 1024px) {
//     width: 100%;
//   }
// `;

// const Overlay = styled.div`
//   position: fixed;
//   inset: 0;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 40;
//   opacity: ${props => props.isOpen ? 1 : 0};
//   visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
//   transition: all 0.3s ease;
  
//   @media (min-width: 1024px) {
//     display: none;
//   }
// `;

// const SidebarHeader = styled.div`
//   padding: 1.5rem;
//   border-bottom: 1px solid #e2e8f0;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const Logo = styled(Link)`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   text-decoration: none;
  
//   span {
//     font-size: 1.25rem;
//     font-weight: bold;
//     background: linear-gradient(135deg, #2563eb, #1d4ed8);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//   }
// `;

// const CloseButton = styled.button`
//   @media (min-width: 1024px) {
//     display: none;
//   }
  
//   background: none;
//   border: none;
//   color: #64748b;
//   cursor: pointer;
//   padding: 0.5rem;
  
//   &:hover {
//     color: #1e293b;
//   }
// `;

// const Nav = styled.nav`
//   padding: 1.5rem;
// `;

// const NavSection = styled.div`
//   margin-bottom: 2rem;
  
//   h2 {
//     color: #64748b;
//     font-size: 0.875rem;
//     font-weight: 500;
//     margin-bottom: 0.75rem;
//     padding-left: 1rem;
//   }
// `;

// const NavItem = styled(Link)`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   padding: 0.75rem 1rem;
//   color: ${props => props.$active ? '#2563eb' : '#64748b'};
//   background: ${props => props.$active ? '#eff6ff' : 'transparent'};
//   border-radius: 0.75rem;
//   cursor: pointer;
//   transition: all 0.2s ease;
//   text-decoration: none;
  
//   &:hover {
//     background: ${props => props.$active ? '#eff6ff' : '#f8fafc'};
//     color: ${props => props.$active ? '#2563eb' : '#1e293b'};
//   }
// `;

// const MainContent = styled.main`
//   padding-left: ${props => props.isSidebarOpen ? '280px' : '0'};
//   transition: padding-left 0.3s ease;
  
//   @media (max-width: 1024px) {
//     padding-left: 0;
//   }
// `;

// const TopBar = styled.header`
//   background: white;
//   border-bottom: 1px solid #e2e8f0;
//   padding: 1rem 1.5rem;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   position: sticky;
//   top: 0;
//   z-index: 40;
// `;

// const MenuButton = styled.button`
//   display: none;
//   @media (max-width: 1024px) {
//     display: block;
//   }
  
//   background: none;
//   border: none;
//   color: #64748b;
//   cursor: pointer;
//   padding: 0.5rem;
  
//   &:hover {
//     color: #1e293b;
//   }
// `;

// const SearchBar = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   background: #f8fafc;
//   border-radius: 0.75rem;
//   padding: 0.5rem 1rem;
//   width: 100%;
//   max-width: 400px;
//   margin: 0 1rem;
  
//   input {
//     border: none;
//     background: none;
//     outline: none;
//     width: 100%;
//     color: #1e293b;
    
//     &::placeholder {
//       color: #94a3b8;
//     }
//   }
// `;

// const TopBarActions = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// `;

// const IconButton = styled.button`
//   background: none;
//   border: none;
//   color: #64748b;
//   cursor: pointer;
//   padding: 0.5rem;
//   position: relative;
  
//   &:hover {
//     color: #1e293b;
//   }
// `;

// const NotificationBadge = styled.span`
//   position: absolute;
//   top: 0;
//   right: 0;
//   background: #ef4444;
//   width: 8px;
//   height: 8px;
//   border-radius: 50%;
//   border: 2px solid white;
// `;

// function Dashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
//   const location = useLocation();

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setIsSidebarOpen(true);
//       } else {
//         setIsSidebarOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Close sidebar on mobile when route changes
//   useEffect(() => {
//     if (window.innerWidth < 1024) {
//       setIsSidebarOpen(false);
//     }
//   }, [location]);

//   return (
//     <Container>
//       <Overlay isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
//       <Sidebar isOpen={isSidebarOpen}>
//         <SidebarHeader>
//           <Logo to="/">
//             <FileSignature size={28} color="#2563eb" />
//             <span>DocSign</span>
//           </Logo>
//           <CloseButton onClick={() => setIsSidebarOpen(false)}>
//             <X size={24} />
//           </CloseButton>
//         </SidebarHeader>
        
//         <Nav>
//           <NavSection>
//             <h2>MAIN MENU</h2>
//             <NavItem to="/dashboard" $active={location.pathname === '/'}>
//               <Home size={20} />
//               Upload Documents
//             </NavItem>
//             <NavItem to="/documents" $active={location.pathname === '/documents'}>
//               <FileText size={20} />
//               Documents
//             </NavItem>
//             <NavItem to="/history" $active={location.pathname === '/history'}>
//               <History size={20} />
//               History
//             </NavItem>
//           </NavSection>
          
//           <NavSection>
//             <h2>SETTINGS</h2>
//             <NavItem to="/team" $active={location.pathname === '/team'}>
//               <Users size={20} />
//               Team
//             </NavItem>
//             <NavItem to="/settings" $active={location.pathname === '/settings'}>
//               <Settings size={20} />
//               Settings
//             </NavItem>
//           </NavSection>
//         </Nav>
//       </Sidebar>

//       <MainContent isSidebarOpen={isSidebarOpen}>
//         <TopBar>
//           <MenuButton onClick={() => setIsSidebarOpen(true)}>
//             <Menu size={24} />
//           </MenuButton>
          
//           <SearchBar>
//             <Search size={20} color="#94a3b8" />
//             <input placeholder="Search documents..." />
//           </SearchBar>
          
//           <TopBarActions>
//             <IconButton>
//               <Bell size={20} />
//               <NotificationBadge />
//             </IconButton>
//           </TopBarActions>
//         </TopBar>

      
//       </MainContent>
//     </Container>
//   );
// }

// export default Dashboard;

// import styled from 'styled-components';
// import { FileText, History, Users, Upload, ChevronRight } from 'lucide-react';

// const Content = styled.div`
//   padding: 2rem;
// `;

// const DashboardGrid = styled.div`
//   display: grid;
//   gap: 1.5rem;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
// `;

// const Card = styled.div`
//   background: white;
//   border-radius: 1rem;
//   padding: 1.5rem;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
//   h3 {
//     font-size: 1.25rem;
//     font-weight: 600;
//     color: #1e293b;
//     margin-bottom: 1rem;
//   }
// `;

// const UploadCard = styled(Card)`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 300px;
//   border: 2px dashed #e2e8f0;
//   background: #f8fafc;
//   cursor: pointer;
//   transition: all 0.2s ease;
  
//   &:hover {
//     border-color: #2563eb;
//     background: #eff6ff;
//   }
// `;

// const RecentDocuments = styled(Card)`
//   min-height: 300px;
// `;

// const DocumentList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const DocumentItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   padding: 1rem;
//   background: #f8fafc;
//   border-radius: 0.75rem;
//   transition: all 0.2s ease;
//   cursor: pointer;
  
//   &:hover {
//     background: #eff6ff;
//   }
  
//   .icon {
//     color: #2563eb;
//   }
  
//   .info {
//     flex: 1;
    
//     h4 {
//       font-weight: 500;
//       color: #1e293b;
//       margin-bottom: 0.25rem;
//     }
    
//     p {
//       font-size: 0.875rem;
//       color: #64748b;
//     }
//   }
// `;

// const StatsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 1rem;
//   margin-bottom: 2rem;
// `;

// const StatCard = styled(Card)`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
  
//   .stat-icon {
//     background: #eff6ff;
//     color: #2563eb;
//     padding: 0.75rem;
//     border-radius: 0.75rem;
//   }
  
//   .stat-info {
//     h4 {
//       font-size: 0.875rem;
//       color: #64748b;
//       margin-bottom: 0.25rem;
//     }
    
//     p {
//       font-size: 1.5rem;
//       font-weight: 600;
//       color: #1e293b;
//     }
//   }
// `;

// function Dashboard() {
//   return (
//     <Content>
//       <StatsGrid>
//         <StatCard>
//           <div className="stat-icon">
//             <FileText size={24} />
//           </div>
//           <div className="stat-info">
//             <h4>Total Documents</h4>
//             <p>128</p>
//           </div>
//         </StatCard>
//         <StatCard>
//           <div className="stat-icon">
//             <History size={24} />
//           </div>
//           <div className="stat-info">
//             <h4>Pending Signs</h4>
//             <p>12</p>
//           </div>
//         </StatCard>
//         <StatCard>
//           <div className="stat-icon">
//             <Users size={24} />
//           </div>
//           <div className="stat-info">
//             <h4>Team Members</h4>
//             <p>8</p>
//           </div>
//         </StatCard>
//       </StatsGrid>

//       <DashboardGrid>
//         <UploadCard>
//           <Upload size={48} color="#2563eb" />
//           <h3>Upload Document</h3>
//           <p style={{ color: '#64748b', textAlign: 'center', marginTop: '0.5rem' }}>
//             Drag and drop your files here or click to browse
//           </p>
//         </UploadCard>

//         <RecentDocuments>
//           <h3>Recent Documents</h3>
//           <DocumentList>
//             <DocumentItem>
//               <FileText size={24} className="icon" />
//               <div className="info">
//                 <h4>Contract Agreement.pdf</h4>
//                 <p>Uploaded 2 hours ago</p>
//               </div>
//               <ChevronRight size={20} color="#94a3b8" />
//             </DocumentItem>
//             <DocumentItem>
//               <FileText size={24} className="icon" />
//               <div className="info">
//                 <h4>Business Proposal.pdf</h4>
//                 <p>Uploaded yesterday</p>
//               </div>
//               <ChevronRight size={20} color="#94a3b8" />
//             </DocumentItem>
//             <DocumentItem>
//               <FileText size={24} className="icon" />
//               <div className="info">
//                 <h4>NDA Document.pdf</h4>
//                 <p>Uploaded 3 days ago</p>
//               </div>
//               <ChevronRight size={20} color="#94a3b8" />
//             </DocumentItem>
//           </DocumentList>
//         </RecentDocuments>
//       </DashboardGrid>
//     </Content>
//   );
// }

// export default Dashboard;