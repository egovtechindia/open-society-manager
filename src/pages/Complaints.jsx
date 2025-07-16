import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';
import ComplaintForm from '../components/ComplaintForm';
import ComplaintList from '../components/ComplaintList';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // We use useCallback to prevent this function from being recreated on every render
  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .eq('submitted_by', user.id) // Fetch only complaints by the current user
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching complaints:', error);
      } else {
        setComplaints(data);
      }
    }
    setLoading(false);
  }, []);

  // useEffect runs once on component mount to fetch initial data
  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  return (
    <div>
      <h2>📩 Complaints</h2>
      {/* We pass fetchComplaints to the form so it can trigger a refresh */}
      <ComplaintForm onNewComplaint={fetchComplaints} />
      <ComplaintList complaints={complaints} loading={loading} />
    </div>
  );
}