import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Layout from './Layout';
import OwnerDashboard from '../components/OwnerDashboard';
import ComplaintsPage from './ComplaintsPage';
import AdminDashboard from '../components/AdminDashboard';

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        const { data: userProfile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
        setProfile(userProfile);
      }
      setLoading(false);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setProfile(null);
      if (session) {
        const getUserProfile = async () => {
          const { data: userProfile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
          setProfile(userProfile);
        }
        getUserProfile();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading application...</div>;
  if (!session) return <Login />;

  const userRole = profile?.role;

  return (
    <Routes>
      <Route path="/" element={<Layout session={session} userRole={userRole}/>}>
        {userRole === 'owner' && (
          <>
            <Route index element={<OwnerDashboard user={session.user} />} />
            <Route path="complaints" element={<ComplaintsPage user={session.user} />} />
          </>
        )}
        {userRole === 'admin' && (
          <>
            <Route index element={<AdminDashboard user={session.user} />} />
            <Route path="complaints" element={<ComplaintsPage user={session.user} role="admin" />} />
          </>
        )}
      </Route>
    </Routes>
  );
}