import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FolderOpen, Loader2 } from 'lucide-react';
import type { Category } from '../types/blog';

interface CategoryModalProps {
  isOpen: boolean;
  editingCategory: Category | null;
  formData: {
    name: string;
    description: string;
    color: string;
  };
  submitting: boolean;
  onClose: () => void;
  onSave: () => void;
  onFormDataChange: (field: string, value: string) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  editingCategory,
  formData,
  submitting,
  onClose,
  onSave,
  onFormDataChange
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="fixed inset-0 bg-neutral-900/50" onClick={onClose} />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-white rounded-lg shadow-xl w-full max-w-md"
        >
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-secondary-500">
              {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onSave(); }}>
            <div>
              <label className="block text-sm font-medium text-secondary-500 mb-2">
                Nome da Categoria
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => onFormDataChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Digite o nome da categoria..."
                required
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-500 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => onFormDataChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Digite uma descrição..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-500 mb-2">
                Cor
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => onFormDataChange('color', e.target.value)}
                  className="w-12 h-10 border border-neutral-300 rounded-lg cursor-pointer"
                />
                <span className="text-sm text-neutral-600">
                  {formData.color}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitting || !formData.name.trim()}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FolderOpen className="h-4 w-4" />
                )}
                {editingCategory ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryModal;
