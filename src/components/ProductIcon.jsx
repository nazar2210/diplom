import React from 'react'

const ProductIcon = ({ category, className = "w-16 h-16" }) => {
  const getIconSVG = (category) => {
    switch (category) {
      case 'medical':
        return (
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="30" y="20" width="60" height="75" rx="8" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2"/>
            <rect x="35" y="15" width="50" height="15" rx="8" fill="#60A5FA" stroke="#1E40AF" strokeWidth="2"/>
            <circle cx="60" cy="22" r="4" fill="#1E40AF"/>
            <rect x="58" y="18" width="4" height="8" fill="#1E40AF"/>
            <rect x="35" y="35" width="50" height="3" fill="#1E40AF" opacity="0.3"/>
            <rect x="35" y="45" width="50" height="3" fill="#1E40AF" opacity="0.3"/>
            <rect x="35" y="55" width="50" height="3" fill="#1E40AF" opacity="0.3"/>
            <rect x="35" y="65" width="50" height="3" fill="#1E40AF" opacity="0.3"/>
            <g transform="translate(75, 30)">
              <circle cx="0" cy="0" r="6" fill="#10B981"/>
              <circle cx="15" cy="0" r="6" fill="#10B981"/>
              <line x1="6" y1="0" x2="9" y2="0" stroke="#10B981" strokeWidth="2"/>
            </g>
            <g transform="translate(60, 50)">
              <rect x="-8" y="-2" width="16" height="4" fill="#EF4444"/>
              <rect x="-2" y="-8" width="4" height="16" fill="#EF4444"/>
            </g>
            <rect x="20" y="95" width="80" height="8" rx="4" fill="#6B7280"/>
            <ellipse cx="60" cy="110" rx="45" ry="8" fill="#000000" opacity="0.1"/>
            <rect x="40" y="75" width="40" height="12" rx="2" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1"/>
            <text x="60" y="84" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#374151">MEDICAL</text>
          </svg>
        )
      case 'industrial':
        return (
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="25" y="15" width="70" height="85" rx="10" fill="#059669" stroke="#047857" strokeWidth="2"/>
            <rect x="30" y="10" width="60" height="18" rx="10" fill="#10B981" stroke="#047857" strokeWidth="2"/>
            <circle cx="60" cy="19" r="5" fill="#047857"/>
            <rect x="57" y="14" width="6" height="10" fill="#047857"/>
            <rect x="30" y="35" width="60" height="4" fill="#047857" opacity="0.3"/>
            <rect x="30" y="48" width="60" height="4" fill="#047857" opacity="0.3"/>
            <rect x="30" y="61" width="60" height="4" fill="#047857" opacity="0.3"/>
            <rect x="30" y="74" width="60" height="4" fill="#047857" opacity="0.3"/>
            <g transform="translate(80, 25)">
              <circle cx="0" cy="0" r="7" fill="#F59E0B"/>
              <circle cx="18" cy="0" r="7" fill="#F59E0B"/>
              <line x1="7" y1="0" x2="11" y2="0" stroke="#F59E0B" strokeWidth="3"/>
            </g>
            <g transform="translate(60, 50)">
              <circle cx="0" cy="0" r="12" fill="#6B7280" stroke="#374151" strokeWidth="2"/>
              <circle cx="0" cy="0" r="6" fill="#9CA3AF"/>
              <rect x="-1" y="-15" width="2" height="6" fill="#6B7280"/>
              <rect x="-1" y="9" width="2" height="6" fill="#6B7280"/>
              <rect x="-15" y="-1" width="6" height="2" fill="#6B7280"/>
              <rect x="9" y="-1" width="6" height="2" fill="#6B7280"/>
              <rect x="-10" y="-10" width="3" height="3" fill="#6B7280"/>
              <rect x="7" y="-10" width="3" height="3" fill="#6B7280"/>
              <rect x="-10" y="7" width="3" height="3" fill="#6B7280"/>
              <rect x="7" y="7" width="3" height="3" fill="#6B7280"/>
            </g>
            <rect x="15" y="100" width="90" height="10" rx="5" fill="#4B5563"/>
            <ellipse cx="60" cy="115" rx="50" ry="10" fill="#000000" opacity="0.1"/>
            <rect x="35" y="85" width="50" height="12" rx="2" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1"/>
            <text x="60" y="94" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#374151">INDUSTRIAL</text>
          </svg>
        )
      case 'portable':
        return (
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="40" y="25" width="40" height="60" rx="6" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
            <rect x="42" y="20" width="36" height="12" rx="6" fill="#A78BFA" stroke="#7C3AED" strokeWidth="2"/>
            <circle cx="60" cy="26" r="3" fill="#7C3AED"/>
            <rect x="58" y="23" width="4" height="6" fill="#7C3AED"/>
            <rect x="42" y="40" width="36" height="2" fill="#7C3AED" opacity="0.3"/>
            <rect x="42" y="50" width="36" height="2" fill="#7C3AED" opacity="0.3"/>
            <rect x="42" y="60" width="36" height="2" fill="#7C3AED" opacity="0.3"/>
            <g transform="translate(85, 30)">
              <circle cx="0" cy="0" r="5" fill="#EC4899"/>
              <circle cx="12" cy="0" r="5" fill="#EC4899"/>
              <line x1="5" y1="0" x2="7" y2="0" stroke="#EC4899" strokeWidth="2"/>
            </g>
            <rect x="55" y="15" width="10" height="8" rx="2" fill="#6B7280"/>
            <rect x="58" y="12" width="4" height="3" fill="#6B7280"/>
            <path d="M 30 50 Q 60 45 90 50" stroke="#9CA3AF" strokeWidth="3" fill="none"/>
            <path d="M 30 55 Q 60 50 90 55" stroke="#9CA3AF" strokeWidth="3" fill="none"/>
            <rect x="35" y="85" width="50" height="6" rx="3" fill="#6B7280"/>
            <ellipse cx="60" cy="95" rx="30" ry="6" fill="#000000" opacity="0.1"/>
            <rect x="45" y="70" width="30" height="10" rx="2" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1"/>
            <text x="60" y="78" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="bold" fill="#374151">PORTABLE</text>
            <g transform="translate(25, 35)">
              <rect x="0" y="0" width="8" height="12" rx="2" fill="#10B981"/>
              <rect x="1" y="2" width="6" height="8" fill="#34D399"/>
              <circle cx="4" cy="6" r="1" fill="#10B981"/>
            </g>
          </svg>
        )
      case 'equipment':
        return (
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="35" y="40" width="50" height="40" rx="8" fill="#374151" stroke="#1F2937" strokeWidth="2"/>
            <rect x="40" y="35" width="40" height="15" rx="8" fill="#4B5563" stroke="#1F2937" strokeWidth="2"/>
            <circle cx="60" cy="60" r="20" fill="#1F2937" stroke="#374151" strokeWidth="2"/>
            <circle cx="60" cy="60" r="15" fill="#111827"/>
            <line x1="60" y1="60" x2="60" y2="45" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="60" cy="60" r="3" fill="#EF4444"/>
            <g stroke="#6B7280" strokeWidth="1">
              <line x1="60" y1="40" x2="60" y2="35"/>
              <line x1="70" y1="50" x2="75" y2="50"/>
              <line x1="60" y1="80" x2="60" y2="85"/>
              <line x1="50" y1="50" x2="45" y2="50"/>
            </g>
            <text x="60" y="32" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fill="#9CA3AF">0</text>
            <text x="80" y="55" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fill="#9CA3AF">3</text>
            <text x="60" y="90" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fill="#9CA3AF">6</text>
            <text x="40" y="55" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fill="#9CA3AF">9</text>
            <rect x="20" y="55" width="15" height="10" rx="2" fill="#6B7280"/>
            <rect x="18" y="57" width="4" height="6" fill="#4B5563"/>
            <rect x="85" y="55" width="15" height="10" rx="2" fill="#6B7280"/>
            <rect x="98" y="57" width="4" height="6" fill="#4B5563"/>
            <rect x="55" y="25" width="10" height="8" rx="2" fill="#9CA3AF"/>
            <rect x="58" y="22" width="4" height="3" fill="#6B7280"/>
            <circle cx="60" cy="90" r="8" fill="#1F2937" stroke="#374151" strokeWidth="1"/>
            <circle cx="60" cy="90" r="6" fill="#111827"/>
            <line x1="60" y1="90" x2="60" y2="84" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
            <rect x="30" y="100" width="60" height="8" rx="4" fill="#6B7280"/>
            <ellipse cx="60" cy="110" rx="35" ry="6" fill="#000000" opacity="0.1"/>
            <rect x="40" y="85" width="40" height="12" rx="2" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1"/>
            <text x="60" y="94" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#374151">REGULATOR</text>
            <g stroke="#6B7280" strokeWidth="1" opacity="0.5">
              <line x1="45" y1="45" x2="55" y2="45"/>
              <line x1="65" y1="45" x2="75" y2="45"/>
              <line x1="45" y1="75" x2="55" y2="75"/>
              <line x1="65" y1="75" x2="75" y2="75"/>
            </g>
          </svg>
        )
      default:
        return (
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="30" y="20" width="60" height="75" rx="8" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2"/>
            <rect x="35" y="15" width="50" height="15" rx="8" fill="#60A5FA" stroke="#1E40AF" strokeWidth="2"/>
            <circle cx="60" cy="22" r="4" fill="#1E40AF"/>
            <rect x="58" y="18" width="4" height="8" fill="#1E40AF"/>
            <rect x="35" y="35" width="50" height="3" fill="#1E40AF" opacity="0.3"/>
            <rect x="35" y="45" width="50" height="3" fill="#1E40AF" opacity="0.3"/>
            <rect x="35" y="55" width="50" height="3" fill="#1E40AF" opacity="0.3"/>
            <rect x="35" y="65" width="50" height="3" fill="#1E40AF" opacity="0.3"/>
            <g transform="translate(75, 30)">
              <circle cx="0" cy="0" r="6" fill="#10B981"/>
              <circle cx="15" cy="0" r="6" fill="#10B981"/>
              <line x1="6" y1="0" x2="9" y2="0" stroke="#10B981" strokeWidth="2"/>
            </g>
            <rect x="20" y="95" width="80" height="8" rx="4" fill="#6B7280"/>
            <ellipse cx="60" cy="110" rx="45" ry="8" fill="#000000" opacity="0.1"/>
            <rect x="40" y="75" width="40" height="12" rx="2" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1"/>
            <text x="60" y="84" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#374151">O₂</text>
            <g transform="translate(20, 40)" opacity="0.3">
              <circle cx="0" cy="0" r="3" fill="#10B981"/>
              <circle cx="8" cy="0" r="3" fill="#10B981"/>
              <line x1="3" y1="0" x2="5" y2="0" stroke="#10B981" strokeWidth="1"/>
            </g>
            <g transform="translate(90, 60)" opacity="0.3">
              <circle cx="0" cy="0" r="3" fill="#10B981"/>
              <circle cx="8" cy="0" r="3" fill="#10B981"/>
              <line x1="3" y1="0" x2="5" y2="0" stroke="#10B981" strokeWidth="1"/>
            </g>
          </svg>
        )
    }
  }

  return getIconSVG(category)
}

export default ProductIcon