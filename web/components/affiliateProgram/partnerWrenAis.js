import React, { useState } from 'react'

const partnerWrenAis = ({ data }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Add your form submission logic here
      console.log('Form submitted:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        message: ''
      })
      
      alert('Thank you for your interest! We\'ll be in touch soon.')
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error submitting the form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get content from props or use fallback
  const content = data || {
    title: "Partner with Wren AI",
    subtitle: "Let's unlock new opportunities, together.",
    benefits: [
      {
        title: "Expand Opportunities",
        description: "Access new markets and revenue streams through joint solutions."
      },
      {
        title: "Accelerate Innovation", 
        description: "Leverage Wren AI's open-source Generative BI to deliver cutting-edge value faster."
      },
      {
        title: "Strengthen Customer Impact",
        description: "Enhance client outcomes with secure, data-driven insights."
      }
    ]
  }

  return (
    <div className="bg-[url('/image/ellipse.png')] bg-no-repeat bg-right" style={{backgroundPosition:'right 10px center',backgroundSize:'65%'}}>
      <div  className="mx-auto lg:pb-30 md:pb-20 sm:pb-10 pb-5 lg:pt-40 md:pt-30 sm:pt-20 pt-10   max-w-6xl w-full grid lg:grid-cols-2 md:gap-12 sm:gap-5 gap-3 px-3">
        {/* Left Section - Promotional Content */}
        <div className="md:space-y-8 sm:space-y-5 space-y-3">
          <div>
            <h1 className="md:text-5xl sm:text-3xl text-2xl lg:text-6xl font-bold leading-tight">
              <div className="text-blue-600">{content.title?.split(' ')[0] || 'Partner'}</div>
              <div className="text-gray-900"> {content.title?.split(' ').slice(1).join(' ') || 'with Wren AI'}</div>
            </h1>
            <p className="md:text-xl sm:text-lg text-base text-gray-700 sm:mt-4 mt-2">
              {content.subtitle}
            </p>
          </div>
          
          <div>
            {content.benefits?.map((benefit, index) => (
            
              <>
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.4571 7.45711L9 13.9142L4.79289 9.7071L6.20711 8.2929L9 11.0858L14.0429 6.04289L15.4571 7.45711Z" fill="#2F54EB"/>
                      </svg>
                    </div>
                    <h3 className="md:text-lg mb-2 sm:text-base text-sm font-semibold text-gray-900">{benefit.title}</h3>
                  <div>
                </div>
              </div>
                  <p className="text-gray-600 mt-1">{benefit.description}</p>
                <hr className="md:my-4 sm:my-3 my-2 border-[#D9D9D9]"/>
              </>
            ))}
          </div>
        </div>
        
        {/* Right Section - Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl md:p-6 sm:p-4 p-3">
          <form onSubmit={handleSubmit} className="md:space-y-6 sm:space-y-5 space-y-3">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            
            <div>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Work Email"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message"
                rows={4}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white font-semibold md:py-4 sm:py-3 py-2 md:px-8 sm:px-6 px-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Become a Partner'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default partnerWrenAis