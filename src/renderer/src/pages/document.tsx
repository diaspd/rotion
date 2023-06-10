import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Editor, OnContentUpdatedParams } from '../components/Editor'
import { ToC } from '../components/ToC'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Document as IPCDocument } from '@/shared/types/ipc'

export function Document() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery(['document', id], async () => {
    const response = await window.api.fetchDocument({ id: id! })

    return response.data
  })

  const { mutateAsync: saveDocument } = useMutation(
    async ({ title, subtitle, content }: OnContentUpdatedParams) => {
      await window.api.SaveDocument({
        id: id!,
        title,
        subtitle,
        content,
      })
    },
    {
      onSuccess: (_, { title, content }) => {
        queryClient.setQueryData<IPCDocument[]>(['documents'], (documents) => {
          return documents?.map((document) => {
            if (document.id === id) {
              return { ...document, title }
            } else {
              return document
            }
          })
        })
      },
    },
  )

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1><h2>${data.subtitle}</h2>${
        data.content ?? '<p></p>'
      }`
    }

    return ''
  }, [data])

  const formattedTitle = data?.title.replace(/<[^>]+>/g, '')
  const formattedSubtitle = data?.subtitle?.replace(/<[^>]+>/g, '')

  function handleEditorContentUpdated({
    title,
    subtitle,
    content,
  }: OnContentUpdatedParams) {
    saveDocument({ title, subtitle, content })
  }

  return (
    <main className="flex-1 flex py-8 px-10 gap-8 overflow-y-scroll scrollbar-thin scrollbar-thumb-rotion-600 scrollbar-track-rotion-800">
      <aside className="hidden lg:block top-0 w-24 sticky">
        <span className="text-rotion-300 font-semibold text-xs">
          TABELA DE CONTEÚDOS
        </span>

        <ToC.Root>
          <ToC.Link>{formattedTitle}</ToC.Link>
          <ToC.Section>{formattedSubtitle}</ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data && (
          <Editor
            onContentUpdated={handleEditorContentUpdated}
            content={initialContent}
          />
        )}
      </section>
    </main>
  )
}
