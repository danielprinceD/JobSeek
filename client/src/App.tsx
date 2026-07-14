import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CompanyDetailsPage from './components/company/CompanyDetailPage'
import './css/index.css'
import Companies from './components/company/Companies'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import { DepartmentJobDetailsPage } from './components/departments/DepartmentJobDetailsPage'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/companies" element={<Companies setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/companies/:companyId" element={<CompanyDetailsPage />} />
            <Route path="/departments/:departmentId/jobs" element={<DepartmentJobDetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
