"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/ui/dialog"
import { Button } from "@/ui/button"

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  showFooter?: boolean
  children?: React.ReactNode
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  showFooter = true,
  children,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children && <div className="py-2">{children}</div>}

        {showFooter && (
          <DialogFooter className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel || (() => onOpenChange(false))}>
              {cancelText}
            </Button>
            <Button onClick={onConfirm || (() => onOpenChange(false))}>{confirmText}</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
