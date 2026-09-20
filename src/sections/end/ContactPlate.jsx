import React, { useState } from 'react'
import { Mail, Phone, MapPin, FileDown, Check, Copy } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../../components/SocialIcons'
import creditsData from '../../content/credits.json'

export default function ContactPlate() {
  const { channels, title, subtitle } = creditsData.distribution
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(channels.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-16 max-w-4xl mx-auto px-4">
      <div className="bg-zinc-950 border border-zinc-700/80 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Subtle accent header line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400" />

        <div className="text-center mb-8">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-amber-400 font-bold block mb-1">
            Official Production Inquiries
          </span>
          <h3 className="text-2xl sm:text-4xl font-serif font-black text-white uppercase tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mt-2">
            {subtitle}
          </p>
        </div>

        {/* High-Contrast Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          
          {/* Email Card */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between group hover:border-amber-400/50 transition-all">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-bold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Email
              </span>
              <button 
                onClick={copyEmail} 
                className="text-zinc-500 hover:text-white p-1"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <a 
              href={`mailto:${channels.email}`} 
              className="text-xs sm:text-sm font-mono text-zinc-200 hover:text-amber-300 transition-colors break-all"
            >
              {channels.email}
            </a>
          </div>

          {/* Phone Card */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between group hover:border-amber-400/50 transition-all">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-bold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                Telephone
              </span>
            </div>
            <a 
              href={`tel:${channels.phone}`} 
              className="text-xs sm:text-sm font-mono text-zinc-200 hover:text-amber-300 transition-colors"
            >
              {channels.phone}
            </a>
          </div>

          {/* Location Card */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between group sm:col-span-2 lg:col-span-1 hover:border-amber-400/50 transition-all">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Location
              </span>
            </div>
            <span className="text-xs sm:text-sm font-mono text-zinc-200">
              {channels.location}
            </span>
          </div>

        </div>

        {/* Social & Resume Action Deck */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-center sm:justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <a
              href={channels.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 text-xs font-mono uppercase tracking-wider transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={channels.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-blue-500/50 text-xs font-mono uppercase tracking-wider transition-all"
            >
              <LinkedinIcon className="w-4 h-4 text-blue-400" />
              <span>LinkedIn</span>
            </a>
          </div>

          <a
            href={channels.resumeUrl}
            download="Shravan_Kumawat_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono uppercase tracking-widest shadow-lg shadow-amber-400/20 hover:scale-105 active:scale-95 transition-all"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Official Resume</span>
          </a>

        </div>

      </div>
    </div>
  )
}
