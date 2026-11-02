import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, width = 'max-w-xl' }) {
  if (!open) return null
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
    <div className={`max-h-[90vh] w-full ${width} overflow-y-auto rounded-2xl bg-white shadow-2xl`}>
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5"><h2 className="text-lg font-bold text-slate-900">{title}</h2><button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={20}/></button></div>
      {children}
    </div>
  </div>
}
