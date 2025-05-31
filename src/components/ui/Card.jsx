export const Card = ({ children }) => {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white">
      {children}
    </div>
  );
};