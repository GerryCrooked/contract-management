import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import StatCard from '../components/StatCard';
import { FileText, Clock, TrendingUp, AlertTriangle, CheckCircle2, ChevronRight, MoreHorizontal } from 'lucide-react';

export default function Dashboard() {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        <div className="min-h-screen bg-slate-50 flex font-sans">
            <Sidebar />

            <div className="flex-1 ml-64 flex flex-col">
                <TopBar />

                <main className="flex-1 p-8 lg:p-10 max-w-7xl mx-auto w-full">
                    <header className="mb-10 flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Executive Dashboard</h1>
                            <p className="text-slate-500 mt-2 text-sm font-medium">Real-time overview of contract portfolio and operational metrics.</p>
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition font-semibold text-sm shadow-sm">
                                Export Report
                            </button>
                            <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-semibold text-sm shadow-sm shadow-indigo-200 flex items-center space-x-2">
                                <span>Initiate Contract</span>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </header>

                    {/* High-Level KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <StatCard
                            title="Total Portfolio Value"
                            value={`$${totalValue.toLocaleString()}`}
                            icon={TrendingUp}
                            trend="vs last quarter"
                            trendValue="+8.4%"
                            isPositive={true}
                        />
                        <StatCard
                            title="Active Agreements"
                            value={activeContracts}
                            icon={CheckCircle2}
                            trend="vs last month"
                            trendValue="+12"
                            isPositive={true}
                        />
                        <StatCard
                            title="Pending Approvals"
                            value={pendingContracts}
                            icon={Clock}
                            trend="Needs attention"
                            trendValue="-3"
                            isPositive={false}
                        />
                        <StatCard
                            title="Total Contracts"
                            value={contracts.length}
                            icon={FileText}
                            trend="vs last year"
                            trendValue="+24%"
                            isPositive={true}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Table Area */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                                    <h2 className="text-lg font-bold text-slate-900">Recent Contract Activity</h2>
                                    <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">View All</button>
                                </div>
                                <div className="overflow-x-auto flex-1">
                                    {loading ? (
                                        <div className="p-12 flex justify-center items-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                        </div>
                                    ) : (
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50/50">
                                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Contract</th>
                                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Value</th>
                                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Status</th>
                                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Effective Date</th>
                                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 bg-white">
                                                {contracts.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="5" className="p-8 text-center text-slate-500">No active contracts found in the system.</td>
                                                    </tr>
                                                ) : (
                                                    contracts.map(contract => (
                                                        <tr key={contract.id} className="hover:bg-slate-50/50 transition-colors group">
                                                            <td className="px-6 py-4">
                                                                <p className="font-bold text-slate-900 text-sm">{contract.name}</p>
                                                                <p className="text-xs text-slate-500 mt-0.5">ID: CT-{1000 + contract.id}</p>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <p className="font-semibold text-slate-700 text-sm">${parseFloat(contract.cost).toLocaleString()}</p>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold capitalize
                                                                    ${contract.contract_status === 'active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' :
                                                                    contract.contract_status === 'pending_approval' ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20' :
                                                                    'bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-600/20'}`}>
                                                                    {contract.contract_status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>}
                                                                    {contract.contract_status === 'pending_approval' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>}
                                                                    {contract.contract_status?.replace('_', ' ')}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                                                {new Date(contract.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                                                    <MoreHorizontal size={18} />
                                                                </button>
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

                        {/* Action Panel */}
                        <div className="lg:col-span-1 flex flex-col space-y-6">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                                    <AlertTriangle className="text-rose-500 mr-2" size={20} />
                                    Requires Attention
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100">
                                        <p className="text-sm font-bold text-slate-900">Acme Corp Renewal</p>
                                        <p className="text-xs text-slate-600 mt-1">Contract expires in 14 days. Review required by legal team.</p>
                                        <button className="mt-3 text-xs font-bold text-rose-600 hover:text-rose-700">Review Terms &rarr;</button>
                                    </div>
                                    <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
                                        <p className="text-sm font-bold text-slate-900">Pending Signature: TechLogix</p>
                                        <p className="text-xs text-slate-600 mt-1">Awaiting CFO countersignature on final SLA addendum.</p>
                                        <button className="mt-3 text-xs font-bold text-amber-600 hover:text-amber-700">Sign Document &rarr;</button>
                                    </div>
                                </div>
                            </div>

                            {/* Distribution chart placeholder */}
                            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl shadow-sm p-6 flex-1 flex flex-col justify-between text-white relative overflow-hidden">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Portfolio Risk Profile</h3>
                                    <p className="text-indigo-200 text-sm">Automated risk assessment</p>
                                </div>
                                <div className="my-6 space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1 font-medium text-slate-300"><span>Low Risk</span><span>65%</span></div>
                                        <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-emerald-400 h-1.5 rounded-full" style={{width: '65%'}}></div></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1 font-medium text-slate-300"><span>Medium Risk</span><span>25%</span></div>
                                        <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-amber-400 h-1.5 rounded-full" style={{width: '25%'}}></div></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1 font-medium text-slate-300"><span>High Risk</span><span>10%</span></div>
                                        <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-rose-400 h-1.5 rounded-full" style={{width: '10%'}}></div></div>
                                    </div>
                                </div>
                                <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-bold border border-white/10 backdrop-blur-sm">
                                    View Risk Analysis
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
