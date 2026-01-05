import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Volunteer, DonationRecord, NewsItem, Fund } from '../types';
import { PROJECTS as INITIAL_PROJECTS, VOLUNTEERS as INITIAL_VOLUNTEERS, DONATIONS as INITIAL_DONATIONS, NEWS, FUNDS } from '../services/mockData';

interface DataContextType {
  projects: Project[];
  volunteers: Volunteer[];
  donations: DonationRecord[];
  news: NewsItem[];
  funds: Fund[];
  // Project Actions
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  // Volunteer Actions
  addVolunteer: (volunteer: Omit<Volunteer, 'id' | 'status' | 'date'>) => void;
  updateVolunteerStatus: (id: number, status: 'pending' | 'approved' | 'rejected') => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from mockData
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(INITIAL_VOLUNTEERS);
  const [donations] = useState<DonationRecord[]>(INITIAL_DONATIONS); // Read-only for now
  
  // Persistence (Optional for demo - keeps data on refresh)
  useEffect(() => {
    const savedProjects = localStorage.getItem('app_projects');
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    
    const savedVolunteers = localStorage.getItem('app_volunteers');
    if (savedVolunteers) setVolunteers(JSON.parse(savedVolunteers));
  }, []);

  useEffect(() => {
    localStorage.setItem('app_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('app_volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  // Project Actions
  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Volunteer Actions
  const addVolunteer = (data: Omit<Volunteer, 'id' | 'status' | 'date'>) => {
    const newVolunteer: Volunteer = {
      ...data,
      id: Date.now(),
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    setVolunteers(prev => [newVolunteer, ...prev]);
  };

  const updateVolunteerStatus = (id: number, status: 'pending' | 'approved' | 'rejected') => {
    setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  return (
    <DataContext.Provider value={{
      projects,
      volunteers,
      donations,
      news: NEWS,
      funds: FUNDS,
      addProject,
      updateProject,
      deleteProject,
      addVolunteer,
      updateVolunteerStatus
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};