import { useState } from 'react';
import './App.css';
import 'tailwindcss/tailwind.css';

function App() {
  const [btcPrice, setBtcPrice] = useState(500000);
  const [dogePrice, setDogePrice] = useState(1.5);
  const [ltcPrice, setLtcPrice] = useState(200);
  const [machineQuantities, setMachineQuantities] = useState({});

  const miners = [
    {
      name: 'Antminer L7 9050 MH/s',
      algorithm: 'Scrypt',
      coins: 'LTC, DOGE',
      hashPower: '9050 MH/s',
      powerConsumption: '3260 W',
      price: 6500,
      monthlyLTC: 0.9,
      monthlyDOGE: 2452,
    },
    {
      name: 'Antminer S21 XP',
      algorithm: 'SHA-256',
      coins: 'BTC',
      hashPower: '270 TH/s',
      powerConsumption: '3645 W',
      price: 6000,
      monthlyBTC: 0.00682674,
    },
    {
      name: 'Antminer L9 16 GH/s',
      algorithm: 'Scrypt',
      coins: 'LTC, DOGE',
      hashPower: '16 GH/s',
      powerConsumption: '3300 W',
      price: 9500,
      monthlyLTC: 1.6,
      monthlyDOGE: 4338,
    },
  ];

  return (
    <div className="App p-4 sm:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Comparatif des Revenus des Mineurs ASIC
      </h1>

      <div className="input-section flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <label className="flex flex-col items-center">
          <span className="font-semibold">Prix du BTC ($):</span>
          <input
            type="number"
            value={btcPrice}
            onChange={(e) => setBtcPrice(Number(e.target.value))}
            className="mt-1 p-2 border rounded w-full sm:w-28 text-center"
          />
        </label>
        <label className="flex flex-col items-center">
          <span className="font-semibold">Prix du DOGE ($):</span>
          <input
            type="number"
            value={dogePrice}
            onChange={(e) => setDogePrice(Number(e.target.value))}
            className="mt-1 p-2 border rounded w-full sm:w-28 text-center"
          />
        </label>
        <label className="flex flex-col items-center">
          <span className="font-semibold">Prix du LTC ($):</span>
          <input
            type="number"
            value={ltcPrice}
            onChange={(e) => setLtcPrice(Number(e.target.value))}
            className="mt-1 p-2 border rounded w-full sm:w-28 text-center"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="miner-table w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3">Modèle</th>
              <th className="p-3 sm:table-cell hidden">Algorithme</th>
              <th className="p-3 sm:table-cell hidden">Cryptomonnaies Minées</th>
              <th className="p-3">Puissance de Calcul</th>
              <th className="p-3 sm:table-cell hidden">Consommation Électrique</th>
              <th className="p-3">Prix ($)</th>
              <th className="p-3">Quantité</th>
              <th className="p-3">Revenu Mensuel ($)</th>
              <th className="p-3">Revenu sur 9 mois ($)</th>
            </tr>
          </thead>
          <tbody>
            {miners.map((miner) => {
              const quantity = machineQuantities[miner.name] || 1;
              const monthlyIncome =
                (miner.monthlyBTC
                  ? miner.monthlyBTC * btcPrice
                  : miner.monthlyLTC * ltcPrice + miner.monthlyDOGE * dogePrice) * quantity;
              const income9Months = monthlyIncome * 9;

              return (
                <tr
                  key={miner.name}
                  className="even:bg-gray-100 odd:bg-gray-50 dark:even:bg-gray-700 dark:odd:bg-gray-600"
                >
                  <td className="p-3">{miner.name}</td>
                  <td className="sm:table-cell hidden">{miner.algorithm}</td>
                  <td className="sm:table-cell hidden">{miner.coins}</td>
                  <td className="p-3">{miner.hashPower}</td>
                  <td className="p-3 sm:table-cell hidden">{miner.powerConsumption}</td>
                  <td className="p-3 whitespace-nowrap">{miner.price}&nbsp;$</td>
                  <td>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setMachineQuantities({
                          ...machineQuantities,
                          [miner.name]: Number(e.target.value),
                        })
                      }
                      className="w-16 p-1 border rounded text-center"
                      min="1"
                    />
                  </td>
                  <td className="p-3 whitespace-nowrap">{monthlyIncome.toFixed(2)}&nbsp;$</td>
                  <td className="p-3 whitespace-nowrap">{income9Months.toFixed(2)}&nbsp;$</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
