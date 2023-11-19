import { cn } from '@/utils/utils'

type TagType = {
  title: string
}

export function Tag({ title }: TagType) {
  console.log(title)

  // Mapeia as opções para classes CSS correspondentes em inglês
  const colorClasses: Record<string, string> = {
    low: 'bg-blue-100 text-blue-800',
    average: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  }

  // Constante para o valor padrão da classe CSS
  const DEFAULT_CLASS = 'bg-gray-100 text-gray-800'

  // Tradução das opções para português
  const translatedTitle: Record<string, string> = {
    low: 'baixa',
    average: 'média',
    high: 'alta',
    urgent: 'urgente',
  }

  // Verifica se a opção está mapeada, se não, use o valor padrão
  const classToUse = colorClasses[title] ?? DEFAULT_CLASS
  const translatedTitleText = translatedTitle[title] || title

  return (
    <div className="m-1">
      <span
        className={cn(
          `${classToUse} text-sm font-medium mr-2 px-2.5 py-0.5 rounded`,
        )}
      >
        {translatedTitleText}
      </span>
    </div>
  )
}
