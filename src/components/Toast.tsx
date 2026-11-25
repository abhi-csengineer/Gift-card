import { AlertCircle, CheckCircle2, X } from 'lucide-react'

export interface ToastNotice {
  type: 'success' | 'error'
  message: string
}

interface ToastProps {
  notice: ToastNotice | null
  onDismiss: () => void
}

export function Toast({ notice, onDismiss }: ToastProps) {
  if (!notice) return null

  const isError = notice.type === 'error'

  return (
    <div
      role={isError ? 'alert' : 'status'}
      className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3 text-sm shadow-lg"
      style={{
        backgroundColor: isError ? '#4F1D2B' : '#2A1726',
        borderColor: isError ? 'rgba(248, 113, 113, 0.5)' : 'rgba(217, 183, 126, 0.45)',
        color: '#FFF9F3',
      }}
    >
      {isError ? (
        <AlertCircle className="h-4 w-4 shrink-0 text-rose-300" aria-hidden="true" />
      ) : (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D9B77E]" aria-hidden="true" />
      )}
      <span className="flex-1 text-xs font-medium leading-snug">{notice.message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}
