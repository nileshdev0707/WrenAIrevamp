import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';

const CodeBlockRenderer = ({ children, ...props }) => {
  const child = children.props;

  // Extract the language from the class name (e.g., 'language-javascript')
  const match = /language-(\w+)/.exec(child.className || '');
  const language = match ? match[1] : 'python'; // Default to 'text' if no language specified

  // 2. If it's a code block (non-inline), use SyntaxHighlighter
  return (
    <div className="my-6 rounded-lg shadow-xl overflow-hidden">
      <div className="flex justify-between items-center bg-gray-700 text-gray-400 px-4 py-2">
        <span className="font-mono text-xs">{language.toUpperCase()}</span>
        <button 
          onClick={() => navigator.clipboard.writeText(String(child.children))} 
          className="text-xs hover:text-white transition-colors"
        >
          Copy
        </button>
      </div>
      
      <SyntaxHighlighter
        style={dracula}
        language={language}
        useInlineStyles={true}
        PreTag="div"
        customStyle={{
          padding: '1rem',
          margin: 0,
          borderRadius: '0 0 0.5rem 0.5rem',
          overflowX: 'auto',
        }}
        {...props}
      >
        {String(child.children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlockRenderer;