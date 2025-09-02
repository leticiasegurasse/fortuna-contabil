import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Trash2, Loader2 } from 'lucide-react';
import type { Category } from '../types/blog';

interface CategoryDeleteModalProps {
  category: Category | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CategoryDeleteModal: React.FC<CategoryDeleteModalProps> = ({
  category,
  isDeleting,
  onClose,
  onConfirm
}) => {
  if (!category) return null;

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
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary-500">
                  Excluir Categoria
                </h3>
                <p className="text-sm text-neutral-600">
                  Esta ação não pode ser desfeita.
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-700 mb-6">
              Tem certeza que deseja excluir a categoria <strong>"{category.name}"</strong>? 
              {category.postsCount > 0 && (
                <span className="block mt-2 text-red-600">
                  ⚠️ Esta categoria possui {category.postsCount} post(s) associado(s).
                </span>
              )}
            </p>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting || category.postsCount > 0}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  category.postsCount > 0
                    ? 'bg-neutral-400 text-white cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50'
                }`}
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                {category.postsCount > 0 ? 'Não pode excluir' : 'Excluir'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryDeleteModal;
