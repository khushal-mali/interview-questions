import "./App.css";
import NestedComments from "./components/nested-comments";
import CommentsData from "./data/comment.json";

function App() {
  return (
    <div>
      <h1>Nested Comment System</h1>
      <NestedComments
        comments={CommentsData}
        onSubmit={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        // onUpvote={() => {}}
        // onDownvote={() => {}}
      />
    </div>
  );
}

export default App;
