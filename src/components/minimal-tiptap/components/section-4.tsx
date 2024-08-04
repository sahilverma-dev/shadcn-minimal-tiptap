import * as React from 'react'
import type { Editor } from '@tiptap/core'
import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CaretDownIcon, CodeIcon, DividerHorizontalIcon, PlusIcon, QuoteIcon } from '@radix-ui/react-icons'
import { ToolbarButton } from './toolbar-button'
import { activeItemClass, DropdownMenuItemClass } from '../utils'
import { ShortcutKey } from './shortcut-key'
import { LinkEditPopover } from './link/link-edit-popover'
import { ImageEditDialog } from './image/image-edit-dialog'

interface InsertElement {
  label: string
  icon: React.ReactNode
  action: (editor: Editor) => void
  isActive?: (editor: Editor) => boolean
  shortcut?: string[]
}

const insertElements: InsertElement[] = [
  {
    label: 'Code block',
    icon: <CodeIcon className="mr-2 size-4" />,
    action: editor => editor.chain().focus().toggleCodeBlock().run(),
    isActive: editor => editor.isActive('codeBlock'),
    shortcut: ['```']
  },
  {
    label: 'Blockquote',
    icon: <QuoteIcon className="mr-2 size-4" />,
    action: editor => editor.chain().focus().toggleBlockquote().run(),
    isActive: editor => editor.isActive('blockquote'),
    shortcut: ['>']
  },
  {
    label: 'Divider',
    icon: <DividerHorizontalIcon className="mr-2 size-4" />,
    action: editor => editor.chain().focus().setHorizontalRule().run()
  }
]

export const SectionFour = ({ editor }: { editor: Editor }) => {
  const isAnyElementActive = insertElements.some(element => element.isActive?.(editor))

  return (
    <>
      <LinkEditPopover editor={editor} />
      <ImageEditDialog editor={editor} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ToolbarButton
            isActive={isAnyElementActive}
            tooltip="Insert elements"
            aria-label="Insert elements"
            className="w-12"
          >
            <PlusIcon className="size-5" />
            <CaretDownIcon className="size-5" />
          </ToolbarButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full" onCloseAutoFocus={event => event.preventDefault()}>
          {insertElements.map(element => (
            <DropdownMenuItem
              key={element.label}
              onClick={() => element.action(editor)}
              className={cn(DropdownMenuItemClass, {
                [activeItemClass]: element.isActive?.(editor)
              })}
            >
              <span className="flex grow items-center">
                {element.icon}
                {element.label}
              </span>
              {element.shortcut && <ShortcutKey keys={element.shortcut} withBg />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default SectionFour