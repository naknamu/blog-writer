import MDEditor from "@uiw/react-md-editor";

const MarkdownPreview = ({ markdown }) => {
  return (
    <div data-color-mode="dark">
      <div className="wmde-markdown-var"> </div>
      <MDEditor.Markdown source={markdown} style={{ padding: "1rem" }} />
    </div>
  );
};

export default MarkdownPreview;
