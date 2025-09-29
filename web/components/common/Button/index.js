import Link from 'next/link';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'px-6 py-3 inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'xl:px-8 xl:py-[15px] lg:px-4 lg:py-[12px] md:px-4 md:py-[12px] sm:px-5 sm:py-3 py-2.5 px-4 text-base font-semibold glow-effect bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white   rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5',
    secondary: 'bg-[#060A1F] text-white  hover:border-[#060A1F] hover:text-white glow-effect transition-all duration-200 transform  duration-200 transform', 
    outline: 'border-2 border-[#0B8EE5] text-[#0B8EE5] hover:bg-[#0B8EE5] hover:text-white transition-all duration-200 transform hover:-translate-y-0.5',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    elevated: "sm:w-max w-full xl:px-8 xl:py-[15px] lg:px-4 lg:py-[12px] md:px-4 md:py-[12px] sm:px-5 sm:py-3 py-2.5 px-4  relative before:absolute befote:inset-0 bg-white px-4 py-2 rounded-md font-semibold overflow-hidden inline-block hover:opacity-90 transition  gradient-text-button transition-all duration-200 transform hover:-translate-y-0.5",
    light: "!ring-0 cursor-pointer focus:!border-none focus:!border-transparent  focus:!shadow-none focus:!ring-0  shadow-none  visible:!ring-0 focus:!ring-0 focus:!outline-none focus:ring-offset-0 focus:shadow-none text-gray-800  xl:px-8 xl:py-[15px] lg:px-4 lg:py-[12px] md:px-4 md:py-[12px] sm:px-5 sm:py-3 py-2.5 px-4  relative bg-white px-4 py-2 rounded-md font-semibold overflow-hidden  transition transition-all duration-200 transform hover:-translate-y-0.5",
    gray: "cursor-pointer text-gray-800  xl:px-8 xl:py-[15px] lg:px-4 lg:py-[12px] md:px-4 md:py-[12px] sm:px-5 sm:py-3 py-2.5 px-4  relative bg-gray-100 px-4 py-2 rounded-md font-semibold overflow-hidden  transition transition-all duration-200 transform hover:-translate-y-0.5",
  };
   
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} data-label={props.label} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button 
    key={props.key}
      data-label={props.label}
      className={classes} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;