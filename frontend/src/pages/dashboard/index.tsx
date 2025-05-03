// pages/index.tsx
import React from "react";
import Header from '../../components/Header'
import BotProfiles from '../../components/BotProfiles'
import ChartPreview from '../../components/ChartPreview'
import DispatchLogCard from '../../components/DispatchLogCard'

export default function Home() {
  return (
    <div className="bg-black text-white font-sans min-h-screen overflow-x-hidden">
      <Header />

      <main className="px-4 md:px-10 py-10 max-w-7xl mx-auto space-y-12">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <BotProfiles />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartPreview />
          <DispatchLogCard />
        </section>
      </main>
    </div>
  )
}
