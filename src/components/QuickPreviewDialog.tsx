import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RotateCw, Sparkles, X } from 'lucide-react'
import { getTemplateById } from '../data/catalog'
import { GreetingCardPreview } from './GreetingCardPreview'

interface QuickPreviewDialogProps {
  templateId: string | null
  onClose: () => void
}

export function QuickPreviewDialog({ templateId, onClose }: QuickPreviewDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [side, setSide] = useState<'front' | 'inside'>('front')
  const navigate = useNavigate()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (templateId) {
      if (!dialog.open) dialog.showModal()
    } else if (dialog.open) {
      dialog.close()
    }
  }, [templateId])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleClose = () => {
      setSide('front')
      onClose()
    }
    dialog.addEventListener('close', handleClose)

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      let pressedOutside = false
      const outside = (e: PointerEvent) => {
        const r = dialog.getBoundingClientRect()
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom
      }
      const onDown = (e: PointerEvent) => {
        pressedOutside = outside(e)
      }
      const onUp = (e: PointerEvent) => {
        if (pressedOutside && outside(e)) dialog.close()
      }
      dialog.addEventListener('pointerdown', onDown)
      dialog.addEventListener('pointerup', onUp)
      return () => {
        dialog.removeEventListener('close', handleClose)
        dialog.removeEventListener('pointerdown', onDown)
        dialog.removeEventListener('pointerup', onUp)
      }
    }

    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  const template = templateId ? getTemplateById(templateId) : null

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="quick-preview-title"
      {...({ closedby: 'any' } as Record<string, string>)}
      className="w-[min(94vw,46rem)] rounded-3xl p-0"
    >
      {template && (
        <div className="p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <span
                className="inline-block rounded-full px-3 py-0.5 text-xs font-semibold"
                style={{ backgroundColor: 'var(--bg-blush)', color: 'var(--text-primary)' }}
              >
                {template.occasion}
              </span>
              <h2 id="quick-preview-title" className="mt-1.5 text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {template.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border cursor-pointer"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              aria-label="Close card preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <GreetingCardPreview templateId={template.id} side={side} />
            </div>

            <div className="md:col-span-5 space-y-5">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {template.shortDescription}
              </p>

              <button
                type="button"
                onClick={() => setSide((s) => (s === 'front' ? 'inside' : 'front'))}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer"
                style={{
                  borderColor: 'var(--border-strong)',
                  backgroundColor: 'var(--bg-canvas)',
                  color: 'var(--text-primary)',
                }}
              >
                <RotateCw className="h-4 w-4" aria-hidden="true" />
                <span>{side === 'front' ? 'Peek Inside Message' : 'View Front Cover'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  dialogRef.current?.close()
                  navigate(`/create/${template.id}`)
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-[#FFF9F3] shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #472C42 0%, #633B5C 100%)' }}
              >
                <Sparkles className="h-4 w-4 text-[#D9B77E]" aria-hidden="true" />
                <span>Personalize This Card</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
