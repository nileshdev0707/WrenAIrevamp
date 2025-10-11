import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  showDot = false,
  dotColor = 'gradient',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center gap-2 rounded-full border font-medium';
  
  const variants = {
    default: 'border-gray-200 bg-white text-gray-700',
    primary: 'border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-white text-blue-700 ',
    gradient: 'border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white',
    primaryGradient: 'bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white border-[#0B8EE5]',
    success: 'border-green-200 bg-green-50 text-green-700',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-700',
    error: 'border-red-200 bg-red-50 text-red-700',
  };

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-3',
    
  };

  const dotColors = {
    gradient: 'bg-gradient-to-r from-[#0B8EE5] to-[#0022CB]',
    primary: 'bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] rounded-full',
    primaryGradient: 'bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white border-transparent rounded-full',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  return (
    <div className={classes} {...props} >
      {showDot && (
        <div className={`${dotSizes[size]} ${dotColors[dotColor]} rounded-full`}></div>
      )}
      <span className={`${variant === 'primaryGradient' ? 'text-white' : 'text-black'} leading-[20px]`}>{children}</span>
    </div>
  );
};

export default Badge;
