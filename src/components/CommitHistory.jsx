import { formatDate } from "../utils/fotmatDate";
import useCommitHistory from "../hooks/useCommitHistory";
import "./CommitHistory.css";

const CommitHistory = () => {
  const commits = useCommitHistory();
  return (
    <div className="commit-history">
      <h1 className="commit-history__title">Git Commit History</h1>
      <ul className="commit-history__list">
        {commits.map((commit) => (
          <li key={commit.sha} className="commit-history__item">
            <div className="commit-history__author">
              <strong>{commit.author}</strong>
            </div>
            <div className="commit-history__message">{commit.message}</div>
            <div className="commit-history__date">
              Committed on {formatDate(commit.date)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommitHistory;
