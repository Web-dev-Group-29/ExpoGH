import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <h1>Whoops! Something went wrong.</h1>
          <p>We're sorry, but the application crashed. Please refresh the page.</p>
        </div>
      )
    }
    return this.props.children
  }
}
