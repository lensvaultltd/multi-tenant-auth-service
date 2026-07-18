import React from 'react';
import { Users, Settings, ShieldCheck, Activity } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10 text-blue-500 font-bold text-xl">
            <ShieldCheck className="w-8 h-8"/> IDP Admin
        </div>
        <nav className="space-y-4">
            <a href="#" className="flex items-center gap-3 text-emerald-400 font-bold bg-slate-900 p-3 rounded"><Users className="w-5 h-5"/> Users</a>
            <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white p-3"><Settings className="w-5 h-5"/> SSO / SAML</a>
            <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white p-3"><Activity className="w-5 h-5"/> Audit Logs</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-2">Tenant Administration</h1>
        <p className="text-slate-400 mb-8 font-mono">Current Context: tenant-alpha</p>

        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900">
                <h2 className="font-bold">Active Users</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold text-sm">Invite User</button>
            </div>
            <table className="w-full text-left">
                <thead className="bg-slate-800 border-b border-slate-700">
                    <tr>
                        <th className="p-4 text-slate-400">Email</th>
                        <th className="p-4 text-slate-400">Status</th>
                        <th className="p-4 text-slate-400">Last Login</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-slate-700/50">
                        <td className="p-4 font-mono">admin@alpha.com</td>
                        <td className="p-4"><span className="px-2 py-1 bg-emerald-900/30 text-emerald-500 text-xs font-bold rounded">ACTIVE</span></td>
                        <td className="p-4 text-slate-400 text-sm">2 mins ago</td>
                    </tr>
                    <tr className="border-b border-slate-700/50">
                        <td className="p-4 font-mono">user@alpha.com</td>
                        <td className="p-4"><span className="px-2 py-1 bg-emerald-900/30 text-emerald-500 text-xs font-bold rounded">ACTIVE</span></td>
                        <td className="p-4 text-slate-400 text-sm">1 day ago</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
