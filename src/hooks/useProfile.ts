import { useState, useEffect } from 'react';
import { api } from '../services/api';

interface Profile {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  insurance: string;
  insuranceNumber: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await api.profile.get();
      setProfile(data);
    } catch (err) {
      setError('Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Profile) => {
    try {
      const updatedProfile = await api.profile.update(profileData);
      setProfile(updatedProfile);
      return true;
    } catch (err) {
      setError('Erro ao atualizar perfil');
      return false;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile
  };
}