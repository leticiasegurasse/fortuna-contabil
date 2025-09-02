import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import type { Tag } from '../types/blog';

interface TagCardProps {
  tag: Tag;
  isSelected: boolean;
  onSelect: (tagId: number) => void;
  onEdit: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
  isDeleting: boolean;
}

const TagCard: React.FC<TagCardProps> = ({
  tag,
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
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(tag.id)}
            className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: tag.color }}
          />
        </div>
        
        <div className="relative">
          <button className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-secondary-500 mb-2">
          {tag.name}
        </h3>
        <p className="text-sm text-neutral-600 mb-3">
          {tag.description || 'Sem descrição'}
        </p>
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>Slug: {tag.slug}</span>
          <span>{tag.postsCount} posts</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500">
          Criada em {new Date(tag.createdAt).toLocaleDateString('pt-BR')}
        </span>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(tag)}
            className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            disabled={isDeleting}
          >
            <Edit className="h-4 w-4" />
          </button>
                     <button
             onClick={() => onDelete(tag)}
             className={`p-2 rounded-lg transition-colors ${
               tag.postsCount > 0
                 ? 'text-neutral-300 cursor-not-allowed bg-neutral-50'
                 : 'text-neutral-400 hover:text-red-600 hover:bg-red-50'
             }`}
             disabled={isDeleting || tag.postsCount > 0}
             title={
               tag.postsCount > 0
                 ? `Não é possível excluir esta tag pois ela possui ${tag.postsCount} post(s) associado(s)`
                 : 'Excluir tag'
             }
           >
             <Trash2 className="h-4 w-4" />
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TagCard;
