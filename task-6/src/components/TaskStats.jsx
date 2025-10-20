import React, { Component } from "react";

// Class component demonstrating lifecycle methods
class TaskStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {
        total: 0,
        completed: 0,
        active: 0,
        completionRate: 0,
      },
    };
  }

  // Lifecycle method - componentDidMount
  componentDidMount() {
    this.calculateStats();
  }

  // Lifecycle method - componentDidUpdate
  componentDidUpdate(prevProps) {
    if (prevProps.tasks !== this.props.tasks) {
      this.calculateStats();
    }
  }

  calculateStats = () => {
    const { tasks } = this.props;
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const active = total - completed;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    this.setState({
      stats: { total, completed, active, completionRate },
    });
  };

  render() {
    const { stats } = this.state;

    return (
      <div className="task-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{stats.total}</h3>
              <p>Total Tasks</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>{stats.completed}</h3>
              <p>Completed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>{stats.active}</h3>
              <p>Active</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>{stats.completionRate}%</h3>
              <p>Progress</p>
            </div>
          </div>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${stats.completionRate}%` }}
          ></div>
        </div>
      </div>
    );
  }
}

export default TaskStats;

