import Layout from "../pages/layout";

/**
 * Reusable loading spinner component
 * @param {Object} props
 * @param {boolean} props.fullPage - Whether to show full page loading (default: true)
 * @param {string} props.size - Size of the spinner: 'sm', 'md', 'lg' (default: 'lg')
 * @param {string} props.color - Color of the spinner border (default: 'border-blue-500')
 */
export default function LoadingSpinner({ 
  fullPage = true, 
  size = 'lg', 
  color = 'border-blue-500' 
}) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16', 
    lg: 'h-32 w-32'
  };

  const spinner = (
    <div className="flex items-center justify-center min-h-screen">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 ${color}`}></div>
    </div>
  );

  if (fullPage) {
    return <Layout>{spinner}</Layout>;
  }

  return spinner;
}
