const containerStyle = {
  width: '80%',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  marginTop: '20px',
}

const Container = ({ children }) => {
  return <div style={containerStyle}>{children}</div>;
};

export default Container;