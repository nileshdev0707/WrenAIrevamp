import React, { useState } from 'react'
import FrequentlyQuestions from './frequentlyQuestions'

const ElitePartner = () => {
  const [activeTab, setActiveTab] = useState('elite')

  const elitePerks = [
    {
      icon: "/svg/user.svg",
      title: "Exclusive Lead Sharing",
      description: "As an Elite Partner, you'll receive qualified leads directly from the Wren AI team. These are businesses actively exploring GenBI solutions, giving you a warm starting point to accelerate your outreach and close deals faster. No cold calling—just real opportunities."
    },
    {
      icon: "/svg/bigger.svg", 
      title: "Bigger Revenue Opportunities",
      description: "Elite Partners gain access to enhanced commission structures, performance-based bonuses, and exclusive upsell opportunities. The more you grow with us, the more you earn—because we believe in rewarding high impact."
    },
    {
      icon: "/svg/megaphone-fill.svg",
      title: "Co-Marketing & Brand Visibility", 
      description: "Build your reputation and grow your audience through joint marketing efforts. From social media features and newsletter spotlights to co-hosted webinars and blog collaborations, we amplify your presence while you promote Wren AI."
    },
    {
      icon: "/svg/bookmarked.svg",
      title: "Training & Resources",
      description: "You'll have access to tailored training sessions, detailed product walkthroughs, and a rich library of partner enablement materials. Whether you're onboarding new team members or refining your pitch, we've got you covered every step of the way."
    },
    {
      icon: "/svg/weekly.svg",
      title: "Weekly Partner Syncs",
      description: "Stay connected and in the know with our weekly Elite Partner sync meetings. Get updates on product roadmap, sales strategies, and market insights, plus the chance to share feedback and collaborate with the Wren AI team directly."
    },
    {
      icon: "/svg/feature.svg",
      title: "Early Feature Access",
      description: "Be among the first to test-drive our latest innovations in Generative BI. Elite Partners get priority access to new features and tools before they launch publicly, giving you a competitive edge in the market."
    }
  ]

  const affiliatePerks = [
    {
      icon: "/svg/signup.svg",
      title: "1. Sign Up",
      description: "Register with our program to obtain your unique referral link."
    },
    {
      icon: "/svg/megaphone-fill.svg", 
      title: "2. Spread the Word",
      description: "Share your unique link with friends, family, and colleagues."
    },
    {
      icon: "/svg/bigger.svg",
      title: "3. Earn Commission", 
      description: "Enjoy a 20% commission from every successful referral made."
    },
  ]

  const frequentlyAskedQuestions = [
    {
      id: 407,
      title: 'What is the minimum payout?',
      detail: 'The minimum payout is $100.',
    },
    {
      id: 408,
      title: 'When are payouts?',
      detail:
        'Payouts are sent out on the first Monday of every month, at least 30 days after the total commissions amount to the minimum of $100 (to account for refunds).',
    },
    {
      id: 409,
      title: 'How are payouts received?',
      detail:
        'Payouts are distributed via PayPal. You can connect your PayPal account after signing up to the program.',
    },
    {
      id: 410,
      title: 'Who can be an affiliate?',
      detail: "Anyone! Just signup and you'll get a personal link you can share for referrals.",
    },
    {
      id: 411,
      title: 'How much can I earn as an affiliate?',
      detail:
        "You'll earn 20% commission for every successful referral that leads to a sale. The more customers you refer, the more you earn – it's as simple as that.",
    },
    {
      id: 412,
      title: 'Can I run my own ads with my affiliate link?',
      detail:
        "No, you can't run search engine ads (especially on branded terms or domain names), Facebook ads, or other ads that would compete with our own marketing and cause potential confusion for customers.",
    },
    {
      id: 413,
      title: 'Are self-referrals allowed?',
      detail:
        'No, self-referrals are not allowed. If you want to purchase a product from Wren AI, please do so without using your affiliate link.',
    },
    {
      id: 414,
      title: 'What are the terms and conditions of the program?',
      detail: 'Please refer to our Terms and Conditions for the full details.',
    },
    {
      id: 415,
      title: 'Are there any other rules I should know about?',
      detail:
        'Abuse, gaming, or attempting to mislead (i.e., posting fake discounts to coupon-sharing websites) will result in your account being permanently banned. This includes pretending to be acting on our behalf (i.e., as an employee). We also reserve the right to change the terms of the program at any time. Check the full Wren AI Cloud Affiliate Program Terms And Conditions.',
    },
  ]

  const eliteFrequentlyAskedQuestions = [
    {
      id: 416,
      title: 'Who can be an Elite Partner?',
      detail: 'Wren AI Elite Partners are forward-thinking consultants, agencies, data experts, and business professionals who are passionate about bringing AI-driven analytics to the world. If you have a strong network, a track record in SaaS or data tools, and the drive to grow with us—this program is for you.',
    },
    {
      id: 417,
      title: 'How to join the Elite Partner Program?',
      detail: 'Please contact us and our team will reach back to you.',
    },
    
  ]
  const currentPerks = activeTab === 'elite' ? elitePerks : affiliatePerks

  return (
    <div className="bg-white md:py-16 py-10 px-4 sm:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Tab Buttons */}
        <div className="flex justify-center md:mb-12 mb-6">
          <div className="flex border-gray-100 border rounded-lg md:p-2 p-1 gap-2">
            <button
              onClick={() => setActiveTab('elite')}
              className={`md:px-6 sm:px-3 px-2 py-3  font-regular transition-all duration-200 ${
                activeTab === 'elite'
                  ? 'bg-blue-600 text-white rounded-lg shadow-lg text-normal'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Cloud Elite Partners
            </button>
            <button
              onClick={() => setActiveTab('affiliate')}
              className={`md:px-6 sm:px-3 px-2 py-3 rounded-lg font-regular transition-all duration-200 text-normal ${
                activeTab === 'affiliate'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Cloud Affiliate Program
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-gray-900">
            {activeTab === 'elite' ? (
              <>Elite Partner <span className="text-blue-600">Perks</span></>
            ) : (
              <>Earn   
              <span className="text-blue-600"> 20% commission</span> as an affiliate</>
            )}
          </h1>
        </div>

        {/* Perks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPerks.map((perk, index) => (
            <PerkCard key={index} perk={perk} />
          ))}
        </div>
        {activeTab === 'affiliate' && (
          <>
            <div className="flex justify-center gap-4 md:my-15 sm:my-10 my-5">
              <button
                onClick={() => window.open('https://partners.getwren.ai/signup', '_blank')}
                className="bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] hover:-translate-y-0.5 transition-all text-white font-semibold md:py-4 py-3 md:px-8 px-4 rounded-lg lg:text-lg md:text-md text-sm duration-200 shadow-lg hover:shadow-xl"
              >
                Register Now
              </button>
              <button
                onClick={() => window.open('https://partners.getwren.ai/', '_blank')}
                className="bg-[#F5F5F5] text-black hover:-translate-y-0.5 transition-all font-semibold md:py-4 py-3 md:px-8 px-4 rounded-lg lg:text-lg md:text-md text-sm duration-200 shadow-lg hover:shadow-xl"
              >
                Affiliate Dashboard
              </button>
            </div>
            <FrequentlyQuestions frequentlyAskedQuestions={frequentlyAskedQuestions} />
          </>
        )}
        {activeTab === 'elite' && (
         <div>
          <FrequentlyQuestions frequentlyAskedQuestions={eliteFrequentlyAskedQuestions} />
         </div>
        )}
      </div>
    </div>
  )
}

const PerkCard = ({ perk }) => {

  return (
    <div className="bg-white transition-shadow duration-300">
      {/* Icon */}
      <div className="md:w-12 md:h-12 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center sm:mb-8.5 mb-4">
        <img src={perk.icon} alt={perk.title} className="w-6 h-6 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-[#1E1E1E] md:mb-4 mb-2">
        {perk.title}
      </h3>

      {/* Description */}
      <p className="text-[#757575] leading-relaxed">
        {perk.description}
      </p>
    </div>
  )
}

export default ElitePartner
