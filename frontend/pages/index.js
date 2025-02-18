import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts`)
            .then(response => setContracts(response.data))
            .catch(error => console.error('Error fetching contracts', error));
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {contracts.map(contract => (
                    <li key={contract.id}>{contract.name} - {contract.status}</li>
                ))}
            </ul>
        </div>
    );
}
