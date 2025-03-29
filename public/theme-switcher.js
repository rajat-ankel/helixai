// Simple theme switcher script
document.addEventListener('DOMContentLoaded', function() {
  // Get saved theme from localStorage or use default
  const savedTheme = localStorage.getItem('site-theme') || '';
  
  // Apply saved theme if it exists
  if (savedTheme) {
    document.body.className = document.body.className
      .split(' ')
      .filter(cls => !cls.startsWith('theme-'))
      .join(' ');
    
    if (savedTheme !== 'default') {
      document.body.classList.add(`theme-${savedTheme}`);
    }
  }
  
  // Create theme switcher
  const themes = [
    { name: 'Default', value: 'default' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Purple', value: 'purple' },
    { name: 'Orange', value: 'orange' },
    { name: 'Pink', value: 'pink' },
    { name: 'Teal', value: 'teal' }
  ];
  
  // Create theme switcher container
  const themeSwitcher = document.createElement('div');
  themeSwitcher.className = 'theme-switcher';
  themeSwitcher.style.position = 'fixed';
  themeSwitcher.style.top = '70px';
  themeSwitcher.style.right = '20px';
  themeSwitcher.style.zIndex = '1000';
  themeSwitcher.style.display = 'flex';
  themeSwitcher.style.flexDirection = 'column';
  themeSwitcher.style.gap = '8px';
  themeSwitcher.style.background = 'rgba(255, 255, 255, 0.1)';
  themeSwitcher.style.backdropFilter = 'blur(10px)';
  themeSwitcher.style.padding = '10px';
  themeSwitcher.style.borderRadius = '8px';
  themeSwitcher.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  
  // Add theme options
  themes.forEach(theme => {
    const themeButton = document.createElement('button');
    themeButton.innerText = theme.name;
    themeButton.style.padding = '8px 12px';
    themeButton.style.border = 'none';
    themeButton.style.borderRadius = '4px';
    themeButton.style.cursor = 'pointer';
    themeButton.style.display = 'flex';
    themeButton.style.alignItems = 'center';
    themeButton.style.justifyContent = 'space-between';
    themeButton.style.width = '100%';
    themeButton.style.background = theme.value === 'default' ? '#000' : `var(--${theme.value}-color, #${getColorHex(theme.value)})`;
    themeButton.style.color = '#fff';
    
    // Add color indicator
    const colorIndicator = document.createElement('span');
    colorIndicator.style.width = '16px';
    colorIndicator.style.height = '16px';
    colorIndicator.style.borderRadius = '50%';
    colorIndicator.style.background = theme.value === 'default' ? '#000' : `var(--${theme.value}-color, #${getColorHex(theme.value)})`;
    colorIndicator.style.display = 'inline-block';
    colorIndicator.style.marginLeft = '8px';
    
    themeButton.appendChild(colorIndicator);
    
    // Add click event
    themeButton.addEventListener('click', function() {
      // Remove all theme classes
      document.body.className = document.body.className
        .split(' ')
        .filter(cls => !cls.startsWith('theme-'))
        .join(' ');
      
      // Add new theme class if not default
      if (theme.value !== 'default') {
        document.body.classList.add(`theme-${theme.value}`);
      }
      
      // Save to localStorage
      localStorage.setItem('site-theme', theme.value);
    });
    
    themeSwitcher.appendChild(themeButton);
  });
  
  // Add to document
  document.body.appendChild(themeSwitcher);
  
  // Helper function to get color hex codes
  function getColorHex(color) {
    const colors = {
      blue: '0070f3',
      green: '10b981',
      purple: '8b5cf6',
      orange: 'f97316',
      pink: 'ec4899',
      teal: '14b8a6'
    };
    return colors[color] || '000000';
  }
});
