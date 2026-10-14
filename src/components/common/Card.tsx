import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
  headerBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  action,
  headerBorder = true
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden ${className}`}
    >
      {(title || subtitle || action) && (
        <div
          className={`px-5 py-4 flex flex-wrap items-center justify-between gap-3 ${
            headerBorder ? 'border-b border-slate-100' : ''
          }`}
        >
          <div>
            {typeof title === 'string' ? (
              <h3 className="text-base font-semibold text-slate-800">{title}</h3>
            ) : (
              title
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};
