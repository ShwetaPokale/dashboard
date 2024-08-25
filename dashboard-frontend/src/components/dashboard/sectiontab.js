import React from 'react';
import './dashboard.css';

const SectionTabs = ({ sections, onSelectSection, activeSection }) => {
  return (
    <div className="section-tabs">
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => onSelectSection(section)}
          className={activeSection?.id === section.id ? 'active' : ''}
        >
          {section.name}
        </button>
      ))}
    </div>
  );
};

export default SectionTabs;
