"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { $convertFromMarkdownString, $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND } from "lexical";
import { mergeRegister } from "@lexical/utils";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeNode } from "@lexical/code";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { FiBold, FiItalic, FiUnderline, FiList, FiType } from "react-icons/fi";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import "./LexicalEditor.css";

const theme = {
  paragraph: "editor-paragraph",
  heading: {
    h1: "editor-h1",
    h2: "editor-h2",
  },
  list: {
    ul: "editor-ul",
    ol: "editor-ol",
  },
  text: {
    bold: "editor-bold",
    italic: "editor-italic",
    underline: "editor-underline",
    code: "editor-code",
  },
};

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        1
      )
    );
  }, [editor]);

  return (
    <div className="toolbar">
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={`toolbar-item ${isBold ? "active" : ""}`}
        title="Bold"
      >
        <FiBold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={`toolbar-item ${isItalic ? "active" : ""}`}
        title="Italic"
      >
        <FiItalic size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={`toolbar-item ${isUnderline ? "active" : ""}`}
        title="Underline"
      >
        <FiUnderline size={18} />
      </button>
      <div className="divider" />
      <button
        type="button"
        className="toolbar-item"
        title="Heading"
        onClick={() => {
          // Simplified for now, can be expanded
          console.log('Heading click');
        }}
      >
        <FiType size={18} />
      </button>
      <button
        type="button"
        className="toolbar-item"
        title="List"
        onClick={() => {
           console.log('List click');
        }}
      >
        <FiList size={18} />
      </button>
    </div>
  );
}

interface LexicalEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function LexicalEditor({ value, onChange, placeholder }: LexicalEditorProps) {
  const initialConfig = {
    namespace: "ArticleEditor",
    theme,
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [
      HeadingNode, 
      ListNode, 
      ListItemNode, 
      QuoteNode, 
      CodeNode, 
      LinkNode, 
      AutoLinkNode, 
      TableNode, 
      TableCellNode, 
      TableRowNode,
      HorizontalRuleNode
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<div className="editor-placeholder">{placeholder || "Start writing..."}</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin
            onChange={(editorState) => {
              editorState.read(() => {
                const markdown = $convertToMarkdownString(TRANSFORMERS);
                onChange(markdown);
              });
            }}
          />
          {/* Initial value setup */}
          <InitialValuePlugin value={value} />
        </div>
      </div>
    </LexicalComposer>
  );
}

function InitialValuePlugin({ value }: { value: string }) {
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender && value) {
      editor.update(() => {
        $convertFromMarkdownString(value, TRANSFORMERS);
      });
      setIsFirstRender(false);
    }
  }, [editor, value, isFirstRender]);

  return null;
}
