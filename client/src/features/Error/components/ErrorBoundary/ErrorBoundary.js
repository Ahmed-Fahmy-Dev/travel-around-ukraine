/* eslint-disable react/prop-types */
import React, { memo } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

export default memo(ErrorBoundary);
