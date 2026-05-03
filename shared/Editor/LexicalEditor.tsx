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
import { 
  $getSelection, 
  $isRangeSelection, 
  FORMAT_TEXT_COMMAND, 
  SELECTION_CHANGE_COMMAND,
  $createParagraphNode,
  UNDO_COMMAND,
  REDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  ElementFormatType
} from "lexical";


import { $setBlocksType } from "@lexical/selection";
import { 
  $createHeadingNode, 
  $createQuoteNode, 
  $isHeadingNode 
} from "@lexical/rich-text";
import { 
  INSERT_ORDERED_LIST_COMMAND, 
  INSERT_UNORDERED_LIST_COMMAND, 
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
  ListItemNode
} from "@lexical/list";
import { mergeRegister } from "@lexical/utils";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeNode, $createCodeNode } from "@lexical/code";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { HorizontalRuleNode, INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { 
  FiBold, 
  FiItalic, 
  FiUnderline, 
  FiList, 
  FiHash, 
  FiMessageSquare, 
  FiCode,
  FiTerminal,
  FiRotateCcw,
  FiRotateCw,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiMinus,
  FiType
} from "react-icons/fi";

import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import "./LexicalEditor.css";

const theme = {
  paragraph: "editor-paragraph",
  heading: {
    h1: "editor-h1",
    h2: "editor-h2",
    h3: "editor-h3",
  },
  list: {
    ul: "editor-ul",
    ol: "editor-ol",
    listitem: "editor-listitem",
  },
  quote: "editor-quote",
  code: "editor-code",
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
  const [isCode, setIsCode] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsCode(selection.hasFormat("code"));

      const anchorNode = selection.anchor.getNode();
      const element = anchorNode.getKey() === "root" 
        ? anchorNode 
        : anchorNode.getTopLevelElementOrThrow();
      
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = element.getParent();
          const type = $isListNode(parentList) ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          setBlockType(type);
        }
      }
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
      ),
      editor.registerCommand(
        'CAN_UNDO_COMMAND' as any,
        (payload: boolean) => {
          setCanUndo(payload);
          return false;
        },
        1
      ),
      editor.registerCommand(
        'CAN_REDO_COMMAND' as any,
        (payload: boolean) => {
          setCanRedo(payload);
          return false;
        },
        1
      )
    );
  }, [editor]);

  const formatHeading = (headingSize: 'h1' | 'h2' | 'h3') => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    } else {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    } else {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createCodeNode());
        }
      });
    } else {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatElement = (format: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
  };

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button
          type="button"
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          className="toolbar-item"
          title="Undo"
        >
          <FiRotateCcw size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          className="toolbar-item"
          title="Redo"
        >
          <FiRotateCw size={18} />
        </button>
      </div>

      <div className="divider" />

      <div className="toolbar-group">
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
        <button
          type="button"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
          className={`toolbar-item ${isCode ? "active" : ""}`}
          title="Inline Code"
        >
          <FiCode size={18} />
        </button>
      </div>

      <div className="divider" />

      <div className="toolbar-group">
        <button
          type="button"
          onClick={() => {
            editor.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createParagraphNode());
              }
            });
          }}
          className={`toolbar-item ${blockType === 'paragraph' ? "active" : ""}`}
          title="Normal Text"
        >
          <span className="font-medium text-xs">Paragraph</span>
        </button>
        <button
          type="button"
          onClick={() => formatHeading('h1')}
          className={`toolbar-item ${blockType === 'h1' ? "active" : ""}`}
          title="H1"
        >

          <span className="font-bold">H1</span>
        </button>
        <button
          type="button"
          onClick={() => formatHeading('h2')}
          className={`toolbar-item ${blockType === 'h2' ? "active" : ""}`}
          title="H2"
        >
          <span className="font-bold">H2</span>
        </button>
        <button
          type="button"
          onClick={formatQuote}
          className={`toolbar-item ${blockType === 'quote' ? "active" : ""}`}
          title="Quote"
        >
          <FiMessageSquare size={18} />
        </button>
        <button
          type="button"
          onClick={formatCode}
          className={`toolbar-item ${blockType === 'code' ? "active" : ""}`}
          title="Code Block"
        >
          <FiTerminal size={18} />
        </button>
      </div>

      <div className="divider" />

      <div className="toolbar-group">
        <button
          type="button"
          onClick={formatBulletList}
          className={`toolbar-item ${blockType === 'ul' ? "active" : ""}`}
          title="Bullets"
        >
          <FiList size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)}
          className="toolbar-item"
          title="Divider"
        >
          <FiMinus size={18} />
        </button>
      </div>

      <div className="divider" />

      <div className="toolbar-group">
        <button type="button" onClick={() => formatElement('left')} className="toolbar-item" title="Left Align">
          <FiAlignLeft size={18} />
        </button>
        <button type="button" onClick={() => formatElement('center')} className="toolbar-item" title="Center Align">
          <FiAlignCenter size={18} />
        </button>
        <button type="button" onClick={() => formatElement('right')} className="toolbar-item" title="Right Align">
          <FiAlignRight size={18} />
        </button>
        <button
          type="button"
          onClick={() => {
            editor.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createParagraphNode());
                selection.getNodes().forEach((node: any) => {
                  if (node.setFormat) node.setFormat(0);
                });
              }
            });
          }}
          className="toolbar-item"
          title="Clear Format"
        >
          <FiType size={18} />
        </button>
      </div>

    </div>
  );
}

interface LexicalEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const URL_MATCHER = /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const MATCHERS = [
  (text: string) => {
    const match = URL_MATCHER.exec(text);
    if (match === null) {
      return null;
    }
    const fullMatch = match[0];
    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch.startsWith("http") ? fullMatch : `https://${fullMatch}`,
    };
  },
];

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
          <LinkPlugin />
          <AutoLinkPlugin matchers={MATCHERS} />
          <TabIndentationPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin
            onChange={(editorState) => {
              editorState.read(() => {
                const markdown = $convertToMarkdownString(TRANSFORMERS);
                onChange(markdown);
              });
            }}
          />
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
