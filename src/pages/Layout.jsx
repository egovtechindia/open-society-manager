import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { supabase } from '../supabaseClient';
export default function Layout({ session, userRole }) {
const activeLinkStyle = { color: 'white', backgroundColor: '#4F46E5' };
// Define navigation links based on user role
const ownerLinks = [
{ to: "/", label: "Dashboard" },
{ to: "/complaints", label: "Complaints" },
];
const adminLinks = [
{ to: "/", label: "Admin Dashboard" },
{ to: "/complaints", label: "View Complaints" },
];
const navLinks = userRole === 'admin' ? adminLinks : ownerLinks;
return (
<div className="flex min-h-screen bg-gray-100">
<aside className="w-64 bg-white shadow-lg flex flex-col">
<div className="p-6 border-b">
<h1 className="text-xl font-bold text-indigo-700">Polaris Elina</h1>
<p className="text-sm text-gray-500 truncate" title={session.user.email}>{session.user.email}</p>
</div>
<nav className="flex-1 flex flex-col p-4 space-y-2">
{navLinks.map(link => (
<NavLink key={link.to} to={link.to} end className="py-2.5 px-4 rounded-lg font-medium text-gray-700 transition duration-200 hover:bg-indigo-50 hover:text-indigo-700" style={({isActive}) => isActive ? activeLinkStyle : undefined}>
{link.label}
</NavLink>
))}
<button onClick={() => supabase.auth.signOut()} className="mt-auto text-left w-full py-2.5 px-4 rounded-lg font-medium text-red-600 transition duration-200 hover:bg-red-50">
Sign Out
</button>
</nav>
</aside>
<main className="flex-1 p-8">
<Outlet />
</main>
</div>
);
}