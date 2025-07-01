import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error if needed
    // console.error(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
          <button onClick={this.handleReload} className="px-4 py-2 bg-blue-600 text-white rounded">Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 