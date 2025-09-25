import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  sparkline_in_7d: {
    price: number[];
  };
}

const MarketOverview = () => {
  const [marketData, setMarketData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMarketData = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'
      );
      setMarketData(response.data);
    } catch (error) {
      console.error("Error fetching market data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 90000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Live Market Overview
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">
            Explore real-time cryptocurrency prices and market data.
          </p>
        </div>
        <div className="overflow-x-auto">
          {loading && marketData.length === 0 ? (
            <div className="text-center text-gray-400 py-10">Loading Data...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-900/50">
                <tr>
                  <th scope="col" className="py-4 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">#</th>
                  <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-white">Name</th>
                  <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-white">Price</th>
                  <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-white">24h %</th>
                  <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-white hidden md:table-cell">Market Cap</th>
                  <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-white hidden lg:table-cell">Last 7 Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {marketData.map((coin, index) => {
                  const chartData = coin.sparkline_in_7d.price.map((price) => ({ price }));
                  const priceChange = coin.price_change_percentage_24h;
                  const chartColor = priceChange >= 0 ? '#22c55e' : '#ef4444';

                  return (
                    <tr key={coin.id} className="hover:bg-gray-900/50 transition-colors">
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm text-gray-400 sm:pl-6">{index + 1}</td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        <div className="flex items-center gap-3">
                          <img src={coin.image} alt={coin.name} className="h-8 w-8 rounded-full" />
                          <div>
                            <div className="font-medium text-white">{coin.name}</div>
                            <div className="text-gray-500">{coin.symbol.toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-white">${coin.current_price.toLocaleString()}</td>
                      <td className={`whitespace-nowrap px-3 py-5 text-sm font-medium ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <div className="flex items-center gap-1">
                          {priceChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                          {Math.abs(priceChange).toFixed(2)}%
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-300 hidden md:table-cell">${coin.market_cap.toLocaleString()}</td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-400 hidden lg:table-cell" style={{ width: '150px' }}>
                        <ResponsiveContainer width="100%" height={40}>
                          <LineChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                            <YAxis domain={['dataMin', 'dataMax']} hide />
                            <Line type="monotone" dataKey="price" stroke={chartColor} strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;