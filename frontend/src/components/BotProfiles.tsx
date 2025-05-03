import { Link } from 'react-router-dom'

const bots = [
  {
    name: 'ULTRA+',
    color: 'text-red-500',
    description: 'Breakout sniper with filter intelligence.',
    route: '/bots/ultra',
  },
  {
    name: 'PRO+',
    color: 'text-purple-400',
    description: 'AI-tuned with macro + regime control.',
    route: '/bots/pro',
  },
  {
    name: 'SCALPTR',
    color: 'text-blue-400',
    description: 'Micro-timeframe execution beast.',
    route: '/bots/scalptr',
  },
  {
    name: 'SNYPER',
    color: 'text-gray-300',
    description: 'One-shot kill logic. No noise.',
    route: '/bots/snpyer',
  },
]

export default function BotProfiles() {
  return (
    <>
      {bots.map((bot) => (
        <Link
          to={bot.route}
          key={bot.name}
          className="bg-gray-900 border border-gray-700 rounded-lg p-5 hover:shadow-lg hover:border-teal-400 transition block"
        >
          <h3 className={`text-2xl font-bold ${bot.color} mb-2`}>{bot.name}</h3>
          <p className="text-sm text-gray-400 mb-3">{bot.description}</p>
          <span className="text-teal-400 hover:underline">View Strategy →</span>
        </Link>
      ))}
    </>
  )
}
