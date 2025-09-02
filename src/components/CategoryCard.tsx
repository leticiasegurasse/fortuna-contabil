import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import type { Category } from '../types/blog';

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onSelect: (categoryId: number) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  isDeleting: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  isDeleting
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow"
      style={{ borderTop: `2px solid ${category.color}` }}
    >

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-secondary-500 mb-2">
          {category.name}
        </h3>
        <p className="text-sm text-neutral-600 mb-3">
          {category.description || 'Sem descrição'}
        </p>
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>Slug: {category.slug}</span>
          <span>{category.postsCount} posts</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          Criada em {new Date(category.createdAt).toLocaleDateString('pt-BR')}
        </span>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(category)}
            className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            disabled={isDeleting}
          >
            <Edit className="h-4 w-4" />
          </button>
                     <button
             onClick={() => onDelete(category)}
             className={`p-2 rounded-lg transition-colors ${
               category.postsCount > 0
                 ? 'text-neutral-300 cursor-not-allowed bg-neutral-50'
                 : 'text-neutral-400 hover:text-red-600 hover:bg-red-50'
             }`}
             disabled={isDeleting || category.postsCount > 0}
             title={
               category.postsCount > 0
                 ? `Não é possível excluir esta categoria pois ela possui ${category.postsCount} post(s) associado(s)`
                 : 'Excluir categoria'
             }
           >
             <Trash2 className="h-4 w-4" />
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
