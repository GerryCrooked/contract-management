import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import { FileText, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function Dashboard() {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch from localhost since we're running it locally during dev
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts`)
            .then(response => {
                setContracts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching contracts', error);
                setLoading(false);
            });
    }, []);

    const activeContracts = contracts.filter(c => c.contract_status === 'active').length;
    const pendingContracts = contracts.filter(c => c.contract_status === 'pending_approval').length;

    // Calculate total value
    const totalValue = contracts.reduce((sum, contract) => sum + parseFloat(contract.cost || 0), 0);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            <div className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-2">Manage your contracts and monitor their status.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Contracts"
                        value={contracts.length}
                        icon={FileText}
                        colorClass="bg-blue-500"
                        trend="+12%"
                    />
                    <StatCard
                        title="Active Contracts"
                        value={activeContracts}
                        icon={CheckCircle}
                        colorClass="bg-green-500"
                    />
                    <StatCard
                        title="Pending Approval"
                        value={pendingContracts}
                        icon={Clock}
                        colorClass="bg-yellow-500"
                    />
                    <StatCard
                        title="Total Value"
                        value={`$${totalValue.toLocaleString()}`}
                        icon={AlertCircle}
                        colorClass="bg-purple-500"
                    />
                </div>

                {/* Contracts Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Recent Contracts</h2>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
                            New Contract
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Loading data...</div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 text-sm">
                                        <th className="p-4 font-medium border-b border-gray-200">Contract Name</th>
                                        <th className="p-4 font-medium border-b border-gray-200">Start Date</th>
                                        <th className="p-4 font-medium border-b border-gray-200">Duration</th>
                                        <th className="p-4 font-medium border-b border-gray-200">Cost</th>
                                        <th className="p-4 font-medium border-b border-gray-200">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contracts.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="p-4 text-center text-gray-500">No contracts found.</td>
                                        </tr>
                                    ) : (
                                        contracts.map(contract => (
                                            <tr key={contract.id} className="hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors">
                                                <td className="p-4 font-medium text-gray-900">{contract.name}</td>
                                                <td className="p-4 text-gray-600">{new Date(contract.start_date).toLocaleDateString()}</td>
                                                <td className="p-4 text-gray-600">{contract.duration} months</td>
                                                <td className="p-4 text-gray-900 font-medium">${parseFloat(contract.cost).toLocaleString()}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                                                        contract.contract_status === 'active' ? 'bg-green-100 text-green-700' :
                                                        contract.contract_status === 'pending_approval' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {contract.contract_status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
