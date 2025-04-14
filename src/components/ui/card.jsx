export function Button({ children, onClick }) {
    return (
      <button
        onClick={onClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
      >
        {children}
      </button>
    );
  }

  export function Card({ children }) {
    return <div style={{
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '16px',
      margin: '10px 0'
    }}>{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div>{children}</div>;
  }