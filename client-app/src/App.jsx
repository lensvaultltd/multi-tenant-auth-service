import React, { useState } from 'react';
import { Briefcase, Lock } from 'lucide-react';

export default function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Tenant-ID': 'tenant-alpha' // Hardcoded for CRM demo
            },
            body: JSON.stringify({ email: 'admin@alpha.com', password: 'password123' })
        });
        
        if (res.ok) {
            const data = await res.json();
            setToken(data.token);
        } else {
            setError('Authentication Failed');
        }
    } catch (err) {
        console.error(err);
        setError('Network Error');
    }
  };

  if (token) {
      return (
          <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
              <Briefcase className="w-16 h-16 text-indigo-600 mb-4" />
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Alpha CRM Dashboard</h1>
              <p className="text-emerald-600 font-bold mb-8">Successfully Authenticated via Core IDP</p>
              <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
                  <h2 className="text-sm font-bold text-slate-500 mb-2">Decoded JWT Token:</h2>
                  <pre className="bg-slate-900 text-emerald-400 p-4 rounded text-xs overflow-x-auto">
                      {token}
                  </pre>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <Briefcase className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Log in to Alpha CRM</h1>
        
        {error && <div className="mb-4 text-red-500 text-sm font-bold">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" value="admin@alpha.com" readOnly className="w-full border p-3 rounded bg-slate-100 text-slate-500" />
            <input type="password" value="********" readOnly className="w-full border p-3 rounded bg-slate-100 text-slate-500" />
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-3 rounded flex justify-center items-center gap-2">
                <Lock className="w-4 h-4"/> Sign In via Central IDP
            </button>
        </form>
      </div>
    </div>
  );
}
