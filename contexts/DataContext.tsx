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
  // Donation Actions
  addDonation: (record: Omit<DonationRecord, 'id' | 'date'>) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(INITIAL_VOLUNTEERS);
  const [donations, setDonations] = useState<DonationRecord[]>(INITIAL_DONATIONS);
  
  // Load from LocalStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('app_projects');
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    
    const savedVolunteers = localStorage.getItem('app_volunteers');
    if (savedVolunteers) setVolunteers(JSON.parse(savedVolunteers));

    const savedDonations = localStorage.getItem('app_donations');
    if (savedDonations) setDonations(JSON.parse(savedDonations));
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('app_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('app_volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem('app_donations', JSON.stringify(donations));
  }, [donations]);

  // --- Project Actions ---
  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // --- Volunteer Actions ---
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

  // --- Donation Actions ---
  const addDonation = (record: Omit<DonationRecord, 'id' | 'date'>) => {
    const newDonation: DonationRecord = {
      ...record,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };

    // 1. Add to donation list
    setDonations(prev => [newDonation, ...prev]);

    // 2. Automatically update the corresponding project's raised amount
    setProjects(prevProjects => prevProjects.map(p => {
      if (p.title === record.projectTitle) {
        return {
          ...p,
          raised: p.raised + record.amount,
          donors: p.donors + 1
        };
      }
      return p;
    }));
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
      updateVolunteerStatus,
      addDonation
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