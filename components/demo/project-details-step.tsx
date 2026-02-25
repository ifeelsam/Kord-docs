'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

const GENRES = ['Electronic', 'Hip-Hop', 'Pop', 'Rock', 'Jazz', 'R&B', 'Classical', 'Indie', 'Folk', 'Country']

interface ProjectDetailsStepProps {
  formData: any
  onChange: (data: any) => void
  onNext: () => void
}

export function ProjectDetailsStep({ formData, onChange, onNext }: ProjectDetailsStepProps) {
  const [albumArtPreview, setAlbumArtPreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    onChange({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  const handleFileChange = (field: string, file: File) => {
    if (field === 'albumArt') {
      if (file.size > 10 * 1024 * 1024) {
        setErrors({ ...errors, albumArt: 'Max 10MB JPG/PNG' })
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        setAlbumArtPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
    onChange({ ...formData, [field]: file })
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.projectTitle || formData.projectTitle.length < 3) newErrors.projectTitle = 'Min 3 characters'
    if (!formData.artistHandle) newErrors.artistHandle = 'Required'
    if (!formData.genre) newErrors.genre = 'Required'
    if (!formData.description || formData.description.length < 50) newErrors.description = 'Min 50 characters'
    if (!formData.albumArt) newErrors.albumArt = 'Required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <div className="space-y-8 py-8">
      <Card className="p-6 border border-border">
        <div className="space-y-6">
          {/* Project Title */}
          <div>
            <label className="block text-sm font-mono font-bold mb-2">
              Project Title <span className="text-accent">*</span>
            </label>
            <Input
              placeholder="Echoes - My Electronic Album"
              value={formData.projectTitle}
              onChange={(e) => handleInputChange('projectTitle', e.target.value)}
              className={`font-mono ${errors.projectTitle ? 'border-destructive' : ''}`}
              aria-invalid={!!errors.projectTitle}
            />
            {errors.projectTitle && <p className="text-xs text-destructive mt-1">{errors.projectTitle}</p>}
          </div>

          {/* Artist Handle & Genre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono font-bold mb-2">
                Artist Handle <span className="text-accent">*</span>
              </label>
              <Input
                placeholder="@yourhandle"
                value={formData.artistHandle}
                onChange={(e) => handleInputChange('artistHandle', e.target.value)}
                className={`font-mono ${errors.artistHandle ? 'border-destructive' : ''}`}
                aria-invalid={!!errors.artistHandle}
              />
              {errors.artistHandle && <p className="text-xs text-destructive mt-1">{errors.artistHandle}</p>}
            </div>

            <div>
              <label className="block text-sm font-mono font-bold mb-2">
                Genre <span className="text-accent">*</span>
              </label>
              <select
                value={formData.genre}
                onChange={(e) => handleInputChange('genre', e.target.value)}
                className={`w-full px-3 py-2 rounded-md border bg-background font-mono text-sm outline-none transition-colors ${
                  errors.genre ? 'border-destructive' : 'border-border hover:border-muted-foreground'
                }`}
              >
                <option value="">Select Genre</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.genre && <p className="text-xs text-destructive mt-1">{errors.genre}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-mono font-bold mb-2">
              Project Description <span className="text-accent">*</span>
            </label>
            <textarea
              placeholder="Describe your album/tour/project..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={6}
              className={`w-full px-3 py-2 rounded-md border bg-background font-mono text-sm resize-none outline-none transition-colors ${
                errors.description ? 'border-destructive' : 'border-border hover:border-muted-foreground focus:border-ring'
              }`}
              aria-invalid={!!errors.description}
            />
            <div className="flex justify-between items-center mt-2">
              <p className={`text-xs font-mono ${formData.description.length < 50 ? 'text-destructive' : 'text-accent'}`}>
                {formData.description.length} characters
              </p>
              {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
            </div>
          </div>

          {/* Album Art & Video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono font-bold mb-2">
                Album Art <span className="text-accent">*</span>
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={(e) => e.target.files?.[0] && handleFileChange('albumArt', e.target.files[0])}
                  className="hidden"
                  id="album-art"
                  aria-invalid={!!errors.albumArt}
                />
                <label htmlFor="album-art" className="cursor-pointer block">
                  {albumArtPreview ? (
                    <img
                      src={albumArtPreview}
                      alt="Album art preview"
                      className="w-full h-48 object-cover rounded"
                    />
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm font-mono text-accent">Click to upload</p>
                      <p className="text-xs text-muted-foreground">1600x1600 JPG/PNG</p>
                    </div>
                  )}
                </label>
              </div>
              {errors.albumArt && <p className="text-xs text-destructive mt-1">{errors.albumArt}</p>}
            </div>

            <div>
              <label className="block text-sm font-mono font-bold mb-2">Video Demo (Optional)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={(e) => e.target.files?.[0] && handleFileChange('videoDemo', e.target.files[0])}
                  className="hidden"
                  id="video-demo"
                />
                <label htmlFor="video-demo" className="cursor-pointer block">
                  <div className="space-y-2">
                    <p className="text-sm font-mono text-accent">Click to upload</p>
                    <p className="text-xs text-muted-foreground">MP4 video</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end gap-4">
        <Button
          onClick={() => validate() && onNext()}
          className="font-mono"
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}
