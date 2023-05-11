import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";

const MarkdownWrapper = styled.div`
  background: #fff;
  padding: 1rem;
`;

const Markdown = ({ markdown }) => {
  return (
    <MarkdownWrapper>
        <ReactMarkdown
            children={markdown}
            components={{
                code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                    <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, "")}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    />
                ) : (
                    <code {...props} className={className}>
                    {children}
                    </code>
                );
                },
            }}
        />
    </MarkdownWrapper>
  );
};

export default Markdown;
