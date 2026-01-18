'use client';
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container text-center mt-5">
          <div className="alert alert-danger">
            <h4>เกิดข้อผิดพลาดในแอปพลิเคชัน</h4>
            <p>โปรดลองรีเฟรชหน้าเว็บใหม่อีกครั้ง</p>
            <button 
              className="btn btn-primary" 
              onClick={() => window.location.reload()}
            >
              รีเฟรชหน้าเว็บ
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
