import MDEditor from "@uiw/react-md-editor";

const MarkdownEditor = ({ markdown, handleChange }) => {
  return (
    <div data-color-mode="light">
      <div className="wmde-markdown-var"> </div>
      <MDEditor value={markdown} onChange={handleChange} height={500} />
    </div>
  );
};

export default MarkdownEditor;
