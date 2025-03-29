// Simple script to handle theme colors without React state
(function() {
  // Get the saved theme from localStorage or use default
  const savedTheme = localStorage.getItem('color-theme') || 'default';
  
  // Apply the theme to the document
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Function to set a new theme
  window.setColorTheme = function(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('color-theme', theme);
  };
})();
