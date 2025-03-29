// Simple standalone theme switcher
(function() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSwitcher);
  } else {
    initThemeSwitcher();
  }

  function initThemeSwitcher() {
    // Theme colors
    const themes = [
      { name: 'Default', color: '#000000' },
      { name: 'Blue', color: '#0070f3' },
      { name: 'Green', color: '#10b981' },
      { name: 'Purple', color: '#8b5cf6' },
      { name: 'Orange', color: '#f97316' },
      { name: 'Pink', color: '#ec4899' },
      { name: 'Teal', color: '#14b8a6' }
    ];

    // Create theme switcher container
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.left = '20px';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.flexDirection = 'row';
    container.style.gap = '8px';
    container.style.background = 'rgba(0, 0, 0, 0.1)';
    container.style.backdropFilter = 'blur(10px)';
    container.style.padding = '10px';
    container.style.borderRadius = '30px';
    container.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';

    // Create theme buttons
    themes.forEach(theme => {
      const button = document.createElement('button');
      button.style.width = '24px';
      button.style.height = '24px';
      button.style.borderRadius = '50%';
      button.style.border = 'none';
      button.style.background = theme.color;
      button.style.cursor = 'pointer';
      button.style.transition = 'transform 0.2s ease';
      button.title = theme.name;
      
      // Hover effect
      button.onmouseover = () => {
        button.style.transform = 'scale(1.2)';
      };
      button.onmouseout = () => {
        button.style.transform = 'scale(1)';
      };
      
      // Click handler
      button.onclick = () => {
        applyThemeColor(theme.color);
        
        // Save to localStorage
        localStorage.setItem('app-theme-color', theme.color);
        
        // Update active state
        document.querySelectorAll('.theme-button-active').forEach(el => {
          el.classList.remove('theme-button-active');
          el.style.outline = 'none';
        });
        button.classList.add('theme-button-active');
        button.style.outline = '2px solid white';
      };
      
      // Add to container
      container.appendChild(button);
      
      // Set active state if this is the saved theme
      const savedTheme = localStorage.getItem('app-theme-color');
      if (savedTheme === theme.color) {
        button.classList.add('theme-button-active');
        button.style.outline = '2px solid white';
        applyThemeColor(theme.color);
      }
    });
    
    // Add to document
    document.body.appendChild(container);
    
    // Apply theme from localStorage on load
    const savedTheme = localStorage.getItem('app-theme-color');
    if (savedTheme) {
      applyThemeColor(savedTheme);
    }
  }
  
  function applyThemeColor(color) {
    // Create or update style element
    let styleEl = document.getElementById('theme-color-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'theme-color-style';
      document.head.appendChild(styleEl);
    }
    
    // Apply CSS variables
    styleEl.textContent = `
      :root {
        --theme-color: ${color};
        --theme-color-light: ${color}22;
      }
      
      /* Apply theme color to elements */
      a, button, .btn {
        color: var(--theme-color);
      }
      
      button:hover, .btn:hover {
        background-color: var(--theme-color-light);
      }
      
      .ring, .focus-ring:focus {
        box-shadow: 0 0 0 2px var(--theme-color-light);
      }
    `;
  }
})();
