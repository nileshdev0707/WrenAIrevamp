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
    <div className="mx-auto lg:mt-45 md:mt-30 sm:mt-20  mt-5 max-w-6xl w-full grid lg:grid-cols-2 gap-12">
      {/* Left Section - Promotional Content */}
      <div className="space-y-8">
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-blue-600">{content.title?.split(' ')[0] || 'Partner'}</span>
            <span className="text-gray-900"> {content.title?.split(' ').slice(1).join(' ') || 'with Wren AI'}</span>
          </h1>
          <p className="text-xl text-gray-700 mt-4">
            {content.subtitle}
          </p>
        </div>
        
        <div className="space-y-6">
          {content.benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 mt-1">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Section - Contact Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            className={`w-full text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl ${
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
  )
}

export default partnerWrenAis