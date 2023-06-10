import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export interface OnContentUpdatedParams {
  title: string
  subtitle: string
  content: string
}

interface EditorProps {
  content: string
  onContentUpdated: (params: OnContentUpdatedParams) => void
}

export function Editor({ content, onContentUpdated }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: 'Untitled',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none',
      }),
      Document.extend({
        content: 'heading block*',
      }),
      Highlight,
      Typography,
    ],
    onUpdate: ({ editor }) => {
      const contentRegex =
        /(<h1>(?<title>.+)<\/h1>)(<h2>(?<subtitle>.+)<\/h2>)?(?<content>.+)?/
      const parsedContent = editor.getHTML().match(contentRegex)?.groups

      const title = parsedContent?.title ?? 'Untitled'
      const subtitle = parsedContent?.subtitle ?? ''
      const content = parsedContent?.content ?? ''

      onContentUpdated({
        title,
        subtitle,
        content,
      })
    },
    content,
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-invert prose-headings:mt-0',
      },
    },
  })

  return <EditorContent className="w-[65ch]" editor={editor} />
}
